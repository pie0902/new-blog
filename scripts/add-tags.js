import fs from 'fs'
import path from 'path'

const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'posts')

/** Infer tags from filename/title/content using simple heuristics */
function inferTags({ slug, title = '', body = '' }) {
  const subject = `${slug} ${title}`.toLowerCase()
  const hay = `${subject} ${body.toLowerCase()}`
  const tags = new Set()

  const add = (t) => tags.add(t)

  // Content domains
  if (hay.includes('java')) add('Java')
  if (hay.includes('spring-data-jpa') || hay.includes('jpa')) add('JPA')
  if (hay.includes('spring')) add('Spring')
  if (hay.includes('spring security') || hay.includes('spring-security') || hay.includes('security')) add('Spring Security')
  if (hay.includes('jwt')) add('JWT')

  if (hay.includes('mysql')) add('MySQL')
  if (hay.includes('sql')) add('SQL')
  if (hay.includes('redis')) add('Redis')

  // Network: only from slug/title to avoid URL noise in body
  if (subject.includes('http-https')) { add('HTTP'); add('HTTPS') }
  if (subject.includes('https')) add('HTTPS')
  if (subject.includes('http')) add('HTTP')
  if (subject.includes('osi')) { add('OSI 7계층'); add('네트워크') }
  if (subject.includes('internet') || subject.includes('ip')) { add('IP'); add('네트워크') }
  if (hay.includes('네트워크')) add('네트워크')

  if (hay.includes('uml')) add('UML')
  if (hay.includes('diagram')) add('다이어그램')

  if (subject.includes('nas')) add('NAS')
  if (subject.includes('raspberry')) add('라즈베리 파이')

  if (subject.includes('amazon') && subject.includes('ses')) { add('AWS'); add('SES') }
  if (subject.includes('aws')) add('AWS')

  if (subject.includes('creww')) { add('프로젝트'); add('Creww') }
  if (subject.includes('roomroombnb') || (/\broom\b/.test(subject) && subject.includes('bnb'))) { add('프로젝트'); add('RoomRoomBnB') }

  if (subject.includes('memory') && subject.includes('fragment')) add('메모리')

  if (subject.includes('api')) add('API')

  // TIL / Today I Learned posts
  if (subject.includes('today') || /\btil\b/.test(subject)) add('TIL')

  // Cleanups: ensure some grouping
  if (tags.has('HTTPS') || tags.has('HTTP') || tags.has('OSI 7계층') || tags.has('IP')) add('네트워크')

  return Array.from(tags)
}

/** Read front matter and body */
function readFrontMatter(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  if (!raw.startsWith('---')) return { front: '', body: raw, meta: {}, raw }
  const end = raw.indexOf('\n---', 3)
  if (end === -1) return { front: '', body: raw, meta: {}, raw }
  const front = raw.slice(0, end + 4)
  const body = raw.slice(end + 4)
  const meta = {}
  // naive parse: key: value per line
  front.split('\n').slice(1, -1).forEach((line) => {
    const m = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/)
    if (m) meta[m[1]] = m[2]
  })
  return { front, body, meta, raw }
}

function serializeTags(tagsArr) {
  if (!tagsArr || tagsArr.length === 0) return '[]'
  return `[${tagsArr.map((t) => `'${t}'`).join(', ')}]`
}

function updateTagsInFront(front, newTags) {
  if (!front) return front
  const lines = front.split('\n')
  const idx = lines.findIndex((l) => l.trim().startsWith('tags:'))
  if (idx !== -1) {
    lines[idx] = `tags: ${serializeTags(newTags)}`
    return lines.join('\n')
  }
  // if no tags line, insert before closing ---
  const endIdx = lines.lastIndexOf('---')
  const insertAt = endIdx > 0 ? endIdx : lines.length
  lines.splice(insertAt, 0, `tags: ${serializeTags(newTags)}`)
  return lines.join('\n')
}

function main() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'))
  let updated = 0
  const summary = []

  files.forEach((file) => {
    const filePath = path.join(POSTS_DIR, file)
    const { front, body, meta, raw } = readFrontMatter(filePath)
    const slug = path.basename(file, '.md')

    // Keep the latest curated post as-is
    if (slug === '20250822-c-pointer-advanced') return

    const title = (meta.title || '').replace(/^"|"$/g, '')
    const inferred = inferTags({ slug, title, body: body.slice(0, 500) })

    const newFront = updateTagsInFront(front, inferred)
    const nextRaw = `${newFront}${body}`
    if (nextRaw !== raw) {
      fs.writeFileSync(filePath, nextRaw, 'utf-8')
      updated++
      summary.push({ file, tags: inferred })
    }
  })

  console.log(`Updated ${updated} files with inferred tags.`)
  summary.forEach(({ file, tags }) => console.log(` - ${file}: ${tags.join(', ')}`))
}

main()
