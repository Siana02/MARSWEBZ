import dumaSuitesImg from './Duma-suites-website-preview-marswebz.png'
import azureHavenImg from './Azure Haven Luxury Getaway Newsletter.png'
import crescentImg from './cresent-landing-page-view.png'

// Mars Estate preview: picked up automatically once the image is added to src/
const marsEstateImgs = import.meta.glob('./Mars Estate Manager Workspace Dashboard.png', { eager: true, import: 'default' })
const marsEstateImg = Object.values(marsEstateImgs)[0]

export const PROJECTS = [
  {
    id: 'duma-suites',
    tag: 'LUXURY HOSPITALITY WEBSITE',
    title: 'Duma Suites',
    description: 'A premium website experience showcasing luxury suites and penthouses in Watamu, located in the luxurious Ghepard Towers.',
    image: dumaSuitesImg,
    badges: ['Luxury Hospitality', 'Web Experience', 'Property Showcase'],
    accentColor: '#f4b25f',
    accentGlow: 'rgba(244,178,95,0.35)',
    status: 'Live',
    liveUrl: 'https://www.dumasuites.com',
  },
  {
    id: 'crescent',
    tag: 'CYCLE & PREGNANCY TRACKING APP',
    title: 'Crescent',
    description: 'A privacy-first cycle, pregnancy and postpartum companion with daily check-ins, smart reminders and push notifications, optional astrology insights, and consent-based partner sharing so couples can stay connected and supported.',
    image: crescentImg,
    badges: ['Health Tech', 'Progressive Web App', 'Partner Sharing'],
    accentColor: '#c79bf2',
    accentGlow: 'rgba(199,155,242,0.35)',
    status: 'Live',
    liveUrl: 'https://crescent-k6nj.onrender.com/',
  },
  {
    id: 'mars-estate',
    tag: 'PROPERTY MANAGEMENT SYSTEM',
    title: 'Mars Estate',
    description: 'A real estate management workspace giving property managers one dashboard to oversee properties, units, tenants and day-to-day operations. Currently in development — live demo coming soon.',
    image: marsEstateImg,
    badges: ['Real Estate', 'Management Dashboard', 'Web Application'],
    accentColor: '#f26b5b',
    accentGlow: 'rgba(242,107,91,0.35)',
    status: 'In Development',
  },
]

export const SERVICES = [
  {
    id: 'email-marketing',
    tag: 'EMAIL MARKETING DESIGN',
    title: 'Email Marketing',
    description: 'We design and customize email templates — newsletters, promotions, announcements and campaigns — crafted with UI/UX principles and tied closely to your brand’s theme, so every message looks polished, reads clearly and drives action across devices and inboxes.',
    image: azureHavenImg,
    badges: ['Newsletter Design', 'Brand-Matched Templates', 'UI/UX for Email'],
    accentColor: '#d4a94f',
    accentGlow: 'rgba(212,169,79,0.35)',
    alt: 'Azure Haven luxury getaway newsletter email design by MARSWEBZ',
  },
]
