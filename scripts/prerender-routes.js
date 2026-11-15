import fs from 'node:fs'
import path from 'node:path'

const DIST_DIR = path.resolve('dist')
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html')
const BASE_URL = 'https://marswebz.com'

const routes = [
  {
    path: '/websites-apps',
    title: 'Websites & Apps — MARSWEBZ',
    description: 'High-performance websites and web applications engineered for usability, conversion, and growth — built by MARSWEBZ for businesses worldwide.',
  },
  {
    path: '/brand-management',
    title: 'Brand Management — MARSWEBZ',
    description: 'We craft brands that communicate clearly, resonate deeply, and stand out in competitive markets — brand strategy, visual identity, voice, and positioning for businesses worldwide.',
  },
  {
    path: '/automation-ai',
    title: 'AI & Automation — MARSWEBZ',
    description: 'Intelligent systems that automate workflows, reduce manual work, and scale effortlessly. AI-driven automation solutions built by MARSWEBZ.',
  },
  {
    path: '/projects',
    title: 'Projects — MARSWEBZ',
    description: 'Explore websites, applications and digital systems built by MARSWEBZ, including Duma Suites, Crescent and MARS ESTATE.',
  },
  {
    path: '/about',
    title: 'About MARSWEBZ — Digital Systems Studio',
    description: 'More than an agency. MARSWEBZ is a global digital systems studio — a team of strategists, designers, engineers, and thinkers building the future of digital.',
  },
  {
    path: '/explore',
    title: 'Services — MARSWEBZ | Digital Systems, Brand & AI',
    description: 'Explore our four integrated service disciplines: Information Systems, Brand Identity, Digital Products, and AI & Automation — built for scale and clarity.',
  },
  {
    path: '/blog',
    title: 'Insights — MARSWEBZ',
    description: 'Long-form thinking on digital systems, brand strategy, AI automation, and the shifts that separate businesses that thrive from those that merely exist.',
  },
  {
    path: '/blog-1',
    title: 'The Architecture of Everything — MARSWEBZ Insights',
    description: 'Before the first sale is made, there is a system. A deep dive into information architecture and how it shapes every successful digital business.',
  },
  {
    path: '/blog-2',
    title: 'Dead on Arrival — MARSWEBZ Insights',
    description: "A forensic breakdown of why most business websites don't convert — and the engineering principles that fix it for good.",
  },
  {
    path: '/blog-3',
    title: 'The Rise of Intelligent Businesses — MARSWEBZ Insights',
    description: "The businesses pulling ahead aren't working harder — they're working smarter through AI and automation. A field report from the frontier.",
  },
  {
    path: '/blog-4',
    title: "Your Brand Isn't Just a Logo — MARSWEBZ Insights",
    description: 'The companies people actually remember built something structural — a brand system built on authenticity, uniqueness, and memorability.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy — MARSWEBZ',
    description: "Read MARSWEBZ's privacy policy — how we collect, use, and protect your personal data with transparency and respect.",
    indexable: false,
  },
  {
    path: '/terms',
    title: 'Terms of Service — MARSWEBZ',
    description: "Read MARSWEBZ's terms of service governing the use of our website and professional services.",
    indexable: false,
  },
]

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function replaceTag(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`Could not find the existing ${label} tag in dist/index.html`)
  }
  return html.replace(pattern, replacement)
}

function renderRoute(template, route) {
  const canonical = `${BASE_URL}${route.path}`
  const title = escapeHtml(route.title)
  const description = escapeHtml(route.description)
  let html = template

  html = replaceTag(html, /<title>[^<]*<\/title>/i, `<title>${title}</title>`, 'title')
  html = replaceTag(html, /<meta\s+name="description"\s+content="[^"]*"\s*\/>/i, `<meta name="description" content="${description}" />`, 'description')
  html = replaceTag(html, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${canonical}" />`, 'canonical')
  html = replaceTag(html, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${title}" />`, 'Open Graph title')
  html = replaceTag(html, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${description}" />`, 'Open Graph description')
  html = replaceTag(html, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${canonical}" />`, 'Open Graph URL')
  html = replaceTag(html, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/i, `<meta name="twitter:title" content="${title}" />`, 'Twitter title')
  html = replaceTag(html, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/i, `<meta name="twitter:description" content="${description}" />`, 'Twitter description')

  if (route.indexable === false) {
    html = replaceTag(html, /<meta\s+name="robots"\s+content="[^"]*"\s*\/>/i, '<meta name="robots" content="noindex, follow" />', 'robots')
  }

  return html
}

if (!fs.existsSync(TEMPLATE_PATH)) {
  throw new Error('Vite output dist/index.html was not found. Run this script after vite build.')
}

const template = fs.readFileSync(TEMPLATE_PATH, 'utf8')
const homeDir = path.join(DIST_DIR, 'index.html')
let generated = 0

for (const route of routes) {
  const routeDir = path.join(DIST_DIR, route.path.slice(1))
  fs.mkdirSync(routeDir, { recursive: true })
  fs.writeFileSync(path.join(routeDir, 'index.html'), renderRoute(template, route))
  generated += 1
}

console.log(`Generated ${generated} route-specific HTML documents in dist/.`)
