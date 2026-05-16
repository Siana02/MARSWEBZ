import neuraImg     from './demo_neura-finance.jpeg'
import vitalCareImg from './demo_vital-care-ai.jpeg'
import dumaSuitesImg from './Duma-suites-website-preview-marswebz.png'
import sasaSafarisImg from './sasa-safaris-africa-marswebz-preview-image.png'

export const PROJECTS = [
  {
    id: 'neura-finance',
    tag: 'FINTECH SYSTEM PROTOTYPE',
    title: 'Neura Finance',
    description: 'An intelligent financial dashboard engineered to streamline portfolio management, automate reporting, and surface real-time market insights — built for the next generation of digital finance.',
    image: neuraImg,
    badges: ['Dashboard Design', 'Data Visualization', 'Fintech UI'],
    accentColor: '#3dd6f5',
    accentGlow: 'rgba(61,214,245,0.35)',
    status: 'Concept',
  },
  {
    id: 'vital-care',
    tag: 'HEALTHCARE AI PLATFORM',
    title: 'Vital Care AI',
    description: 'A patient-centric health intelligence platform leveraging AI to assist medical teams in tracking vitals, predicting risk, and delivering faster, more precise care decisions.',
    image: vitalCareImg,
    badges: ['Health Tech', 'AI Interface', 'Medical UX'],
    accentColor: '#06d6a0',
    accentGlow: 'rgba(6,214,160,0.35)',
    status: 'Concept',
  },
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
    id: 'sasa-safaris-africa',
    tag: 'LUXURY SAFARI WEBSITE',
    title: 'Sasa Safaris Africa',
    description: 'A high-end safari website built to present bespoke African safari experiences with a refined, premium digital presence.',
    image: sasaSafarisImg,
    badges: ['Luxury Travel', 'Safari Brand', 'High-End Web'],
    accentColor: '#7ed6b2',
    accentGlow: 'rgba(126,214,178,0.35)',
    status: 'Live',
    liveUrl: 'https://www.sasasafaris.com/',
  },
]
