import neuraImg     from './demo_neura-finance.jpeg'
import vitalCareImg from './demo_vital-care-ai.jpeg'

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
]
