// convert.js
import fs from 'fs'
import path from 'path'
import TurndownService from 'turndown'

const JSON_PATH = './articles.json'

// 1) JSON 로드
const raw = fs.readFileSync(JSON_PATH, 'utf-8')
let data
try {
  data = JSON.parse(raw)
} catch (e) {
  console.error('❌ JSON 파싱 실패: 파일이 JSON 형식이 맞는지 확인')
  process.exit(1)
}

// 2) 재귀로 글 배열 찾기
function findArticles(node, acc = []) {
  if (!node) return acc
  if (Array.isArray(node)) {
    const looksLikeArticles =
      node.length > 0 &&
      node.every(
        (it) =>
          it &&
          typeof it === 'object' &&
          ('contentMarkdown' in it || 'content' in it) &&
          ('title' in it || 'slug' in it),
      )
    if (looksLikeArticles) acc.push(node)
    node.forEach((v) => findArticles(v, acc))
  } else if (typeof node === 'object') {
    Object.values(node).forEach((v) => findArticles(v, acc))
  }
  return acc
}

const candidates = findArticles(data)
if (candidates.length === 0) {
  console.error('❌ 글 배열을 못 찾음. head -n 40 articles.json 으로 구조 확인해봐')
  process.exit(1)
}

const articles = candidates.sort((a, b) => b.length - a.length)[0]
console.log(`🔎 감지된 글 개수: ${articles.length}`)

// 3) 출력 폴더 준비
const outDir = './src/content/posts'
fs.mkdirSync(outDir, { recursive: true })

// 4) 보조 함수
const sanitizeY = (s) =>
  (s ?? '')
    .replace(/[\x00-\x1F\x7F]/g, ' ') // 제어문자 제거
    .replace(/\s+/g, ' ')
    .replace(/"/g, '\\"')
    .trim()

const slugify = (title, fallback = 'post') => {
  const base = (title || fallback)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-_.~\p{L}\p{N}]/gu, '')
  return base || fallback
}
const seen = new Map()

const fixDate = (raw) => {
  const d = new Date(raw)
  if (isNaN(d.getTime())) return new Date().toISOString()
  return d.toISOString()
}

// HTML → Markdown 변환기
const td = new TurndownService()

// 5) 변환 루프
articles.forEach((article, idx) => {
  const title = article.title || article.slug || `글-${idx + 1}`
  let slug = (article.slug && String(article.slug)) || slugify(title, `post-${idx + 1}`)

  const n = (seen.get(slug) || 0) + 1
  seen.set(slug, n)
  if (n > 1) slug = `${slug}-${n}`

  // contentMarkdown 있으면 우선 사용, 없으면 content(HTML) → Markdown 변환
  const md = article.contentMarkdown
    ? article.contentMarkdown
    : article.content
      ? td.turndown(article.content)
      : ''

  const pubDate = fixDate(
    article.dateAdded ||
      article.createdAt ||
      article.dateUpdated ||
      new Date().toISOString(),
  )

  // 👉 태그는 전부 버림
  const yamlTags = '[]'

  const description = article.brief
    ? sanitizeY(article.brief)
    : sanitizeY(
        md
          .replace(/```[\s\S]*?```/g, '') // 코드블록 제거
          .replace(/<[^>]+>/g, ''), // HTML 제거
      ).slice(0, 140)

  // frontmatter
  const frontmatter = `---
title: "${sanitizeY(title)}"
description: "${description}"
published: "${pubDate}"
tags: ${yamlTags}
series: "과거 Hashnode"
---

`

  const filePath = path.join(outDir, `${slug}.md`)
  fs.writeFileSync(filePath, frontmatter + md, 'utf-8')
  console.log('✅', filePath)
})

console.log('✨ 변환 완료!')
