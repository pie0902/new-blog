#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

// Minimal arg parser
function parseArgs(argv) {
  const args = { _: [] }
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith('--')) {
      const key = a.slice(2)
      const next = argv[i + 1]
      if (!next || next.startsWith('--')) {
        args[key] = true
      } else {
        args[key] = next
        i++
      }
    } else {
      args._.push(a)
    }
  }
  return args
}

function slugify(input) {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9가-힣\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
}

function toISODate(dateStr) {
  if (!dateStr) return new Date().toISOString()
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) {
    console.error(`Invalid --date value: ${dateStr}`)
    process.exit(1)
  }
  return d.toISOString()
}

function yyyymmdd(d = new Date()) {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}${mm}${dd}`
}

const args = parseArgs(process.argv)
const title = args.title || args._.join(' ')
if (!title) {
  console.error('Usage: npm run new -- "제목" --tags "태그1,태그2" --series "시리즈" --desc "설명" --date 2025-08-21 --slug custom-slug --draft')
  process.exit(1)
}

const desc = args.desc || ''
const series = args.series || undefined
const draft = args.draft ? true : false
const tags = (args.tags || '')
  .split(',')
  .map((t) => t.trim())
  .filter(Boolean)
const publishedIso = toISODate(args.date)

const slug = args.slug ? String(args.slug) : slugify(title)
const dateForFile = yyyymmdd(new Date(publishedIso))
const filename = `${dateForFile}-${slug}.md`
const postsDir = path.join(process.cwd(), 'src', 'content', 'posts')
const filePath = path.join(postsDir, filename)

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true })
}
if (fs.existsSync(filePath)) {
  console.error(`File already exists: ${path.relative(process.cwd(), filePath)}`)
  process.exit(1)
}

const frontmatterLines = []
frontmatterLines.push('---')
frontmatterLines.push(`title: "${title.replace(/"/g, '\\"')}"`)
if (desc) frontmatterLines.push(`description: "${desc.replace(/"/g, '\\"')}"`)
frontmatterLines.push(`published: "${publishedIso}"`)
if (draft) frontmatterLines.push('draft: true')
frontmatterLines.push(`tags: [${tags.map((t) => `"${t}"`).join(', ')}]`)
if (series) frontmatterLines.push(`series: "${series.replace(/"/g, '\\"')}"`)
frontmatterLines.push('---')
frontmatterLines.push('')
frontmatterLines.push('# ' + title)
frontmatterLines.push('')
frontmatterLines.push('여기에 본문을 작성하세요.')

fs.writeFileSync(filePath, frontmatterLines.join('\n'), 'utf-8')
console.log(`Created ${path.relative(process.cwd(), filePath)}`)

