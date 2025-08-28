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
    description: 'A collection of Counter-Strike tradeup calculators',
    link: '/floats/',
    image: 'https://placehold.co/600x400/0ea5e9/ffffff?text=Floats',
    tags: ['Physics Engine', 'JavaScript'],
    color: 'sky'
  },
  {
    id: 'wordle',
    title: 'Wordle',
    description: 'A recreation with a twist.',
    link: '/wordle/',
    image: 'https://placehold.co/600x400/10b981/ffffff?text=Wordle',
    tags: ['Game Logic', 'CSS Grid'],
    color: 'emerald'
  },
  {
    id: 'catan',
    title: 'Catan',
    description: 'A Catan board generator that goes a bit further.',
    link: '/advantageo/',
    image: 'https://placehold.co/600x400/ef4444/ffffff?text=Catan',
    tags: ['Algorithm', 'SVG'],
    color: 'red'
  },
  {
    id: 'geometric',
    title: 'Geometric',
    description: 'Several proof of concepts for geometric phenomenon.',
    link: '/geometric/',
    image: 'https://placehold.co/600x400/6366f1/ffffff?text=Geometric',
    tags: ['Canvas API', 'Generative Art'],
    color: 'indigo'
  }
];