// Helper function to create placeholders.dev URLs with consistent font sizing
function createPlaceholderUrl(title: string, color: string): string {
  // 1. Updated colorMap with separate properties for bgColor and textColor
  const colorMap = {
    sky:     { bgColor: '#0ea5e9', textColor: '#ffffff' },
    emerald: { bgColor: '#10b981', textColor: '#ffffff' },
    red:     { bgColor: '#ef4444', textColor: '#ffffff' },
    indigo:  { bgColor: '#6366f1', textColor: '#ffffff' },
    purple:  { bgColor: '#a855f7', textColor: '#ffffff' },
    amber:   { bgColor: '#f59e0b', textColor: '#ffffff' },
    pink:    { bgColor: '#ec4899', textColor: '#ffffff' }
  };

  const defaultColors = { bgColor: '#1f2937', textColor: '#ffffff' };
  const selectedColors = colorMap[color as keyof typeof colorMap] || defaultColors;

  // 2. Build the URL using URLSearchParams for all options
  const params = new URLSearchParams({
    width: '600',
    height: '400',
    text: title,
    fontSize: '80',
    bgColor: selectedColors.bgColor,
    textColor: selectedColors.textColor,
  });
  
  // 3. Use the correct base URL with the "images" subdomain
  return `https://images.placeholders.dev/?${params.toString()}`;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  tags: string[];
  color: 'sky' | 'emerald' | 'red' | 'indigo' | 'purple' | 'amber' | 'pink';
}

export const projects: Project[] = [
  {
    id: 'floats',
    title: 'Floats',
    description: 'A collection of Counter-Strike tradeup calculators.',
    link: '/floats/',
    image: createPlaceholderUrl('Floats', 'sky'),
    tags: ['Physics Engine', 'JavaScript'],
    color: 'sky'
  },
  {
    id: 'wordle',
    title: 'Wordle',
    description: 'A recreation with a twist.',
    link: '/wordle/',
    image: createPlaceholderUrl('Wordle', 'emerald'),
    tags: ['Game Logic', 'CSS Grid'],
    color: 'emerald'
  },
  {
    id: 'catan',
    title: 'Catan',
    description: 'A Catan board generator that goes a bit further.',
    link: '/advantageo/',
    image: createPlaceholderUrl('Catan', 'red'),
    tags: ['Algorithm', 'SVG'],
    color: 'red'
  },
  {
    id: 'geometric',
    title: 'Geometric',
    description: 'Several proof of concepts for geometric phenomenon.',
    link: '/geometric/',
    image: createPlaceholderUrl('Geometric', 'indigo'),
    tags: ['Canvas API', 'Generative Art'],
    color: 'indigo'
  }
];