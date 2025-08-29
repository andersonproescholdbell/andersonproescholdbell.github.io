export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  color: 'sky' | 'emerald' | 'red' | 'indigo' | 'purple' | 'amber' | 'pink';
}

export const projects: Project[] = [
  {
    id: 'floats',
    title: 'Floats',
    description: 'A collection of Counter-Strike tradeup calculators.',
    link: '/floats/',
    tags: ['Physics Engine', 'JavaScript'],
    color: 'sky'
  },
  {
    id: 'wordle',
    title: 'Wordle',
    description: 'Versions of the game.',
    link: '/wordle/',
    tags: ['Game Logic', 'CSS Grid'],
    color: 'emerald'
  },
  {
    id: 'catan',
    title: 'Catan',
    description: 'A Catan board generator that goes a bit further.',
    link: '/advantageo/',
    tags: ['Algorithm', 'SVG'],
    color: 'red'
  },
  {
    id: 'geometric',
    title: 'Geometric',
    description: 'Several proof of concepts for geometric phenomenon.',
    link: '/geometric/',
    tags: ['Canvas API', 'Generative Art'],
    color: 'indigo'
  }
];