import fs from 'fs'
import path from 'path'

const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'posts')

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'))

let changed = 0
for (const file of files) {
  const p = path.join(POSTS_DIR, file)
  const raw = fs.readFileSync(p, 'utf-8')

  // Only modify the body, keep frontmatter intact
  const fmEnd = raw.indexOf('\n---', 3)
  if (!raw.startsWith('---') || fmEnd === -1) continue
  const head = raw.slice(0, fmEnd + 4)
  let body = raw.slice(fmEnd + 4)

  let next = body

  // 1) Normalize Hashnode-style image attributes: remove align="center" or curly-quote variants within image parentheses
  //    Example: ![](URL align="center") -> ![](URL)
  next = next.replace(/!\[(.*?)\]\((https?:[^)\s]+)\s+align=(["“”'‘’])?center\1?\)/g, '![$1]($2)')

  // Fallback: strip any extra trailing attributes after a proper URL inside image parentheses
  next = next.replace(/!\[(.*?)\]\((https?:[^)\s]+)[^)]+\)/g, '![$1]($2)')

  // 2) Remove stray "Link to heading" text that may appear from heading anchors
  next = next.replace(/^\s*Link to heading\s*$/gm, '')

  if (next !== body) {
    fs.writeFileSync(p, head + next, 'utf-8')
    changed++
    console.log('fixed', file)
  }
}

console.log(`Done. Updated ${changed} files.`)

