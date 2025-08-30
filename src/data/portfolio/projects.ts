export interface Project {
  id: string;
  link: string;
  placeholderText?: string;
  title: string;
  description: string;
  tags: string[];
  wip?: boolean;
  color?: 'sky' | 'emerald' | 'red' | 'indigo' | 'purple' | 'amber' | 'pink' | 
          'blue' | 'cyan' | 'teal' | 'green' | 'lime' | 'yellow' | 'orange' |
          'rose' | 'fuchsia' | 'violet' | 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' |
          'sky-400' | 'blue-400' | 'indigo-400' | 'purple-400' | 'pink-400' | 'rose-400' |
          'red-400' | 'orange-400' | 'amber-400' | 'yellow-400' | 'lime-400' | 'green-400' |
          'emerald-400' | 'teal-400' | 'cyan-400';
}

export interface Category {
  title: string;
  description: string;
  color: 'sky' | 'emerald' | 'red' | 'indigo' | 'purple' | 'amber' | 'pink' | 
         'blue' | 'cyan' | 'teal' | 'green' | 'lime' | 'yellow' | 'orange' |
         'rose' | 'fuchsia' | 'violet' | 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' |
         'sky-400' | 'blue-400' | 'indigo-400' | 'purple-400' | 'pink-400' | 'rose-400' |
         'red-400' | 'orange-400' | 'amber-400' | 'yellow-400' | 'lime-400' | 'green-400' |
         'emerald-400' | 'teal-400' | 'cyan-400';
  projects: Project[];
  placeholderText?: string;
}

export const projectData: Record<string, Category> = {
  'counter-strike': {
    title: 'Counter-Strike',
    description: 'A collection of trade-up calculators and tools for CS.',
    color: 'sky',
    projects: [
      { id: 'floatsv1', link: '/counter-strike/floatsv1', placeholderText: 'FloatsV1', title: 'FloatsV1', description: 'Calculator V1', tags: ['Calculator'], wip: true, color: 'blue' },
      { id: 'floatsv2', link: '/counter-strike/floatsv2', placeholderText: 'FloatsV2', title: 'FloatsV2', description: 'Calculator V2', tags: ['Calculator'], wip: true, color: 'cyan' },
      { id: 'floatsv3', link: '/counter-strike/floatsv3', placeholderText: 'FloatsV3', title: 'FloatsV3', description: 'Calculator V3', tags: ['Calculator'], wip: true, color: 'sky-400' },
      { id: 'items-assistant', link: 'https://github.com/andersonproescholdbell/csgo-items-assistant', placeholderText: 'Assistant', title: 'Items Assistant', description: 'Tool for managing CS items.', tags: ['Tool', 'External'], color: 'blue-400' },
      { id: 'market-floats', link: 'https://github.com/andersonproescholdbell/market-float-searcher-csgo', placeholderText: 'Market Floats', title: 'Market Float Searcher', description: 'Find low-float items on the market.', tags: ['Tool', 'External'], color: 'cyan-400' },
      { id: 'market-bluegems', link: 'https://github.com/andersonproescholdbell/bluegem-finder', placeholderText: 'Market Gems', title: 'Market Bluegem Finder', description: 'Find case-hardened blue gems.', tags: ['Tool', 'External'], color: 'teal' },
    ],
  },
  games: {
    title: 'Games',
    description: 'Implementations and variations of popular games.',
    color: 'emerald',
    projects: [
      { id: 'catan-board-generator', link: '/games/catan-board-generator', placeholderText: 'Catan', title: 'Catan Board Generator', description: 'A Catan board generator that goes a bit further.', tags: ['Algorithm', 'SVG'], wip: true, color: 'green' },
      { id: 'wordle-basic', link: '/games/wordle-basic', placeholderText: 'Wordle', title: 'Wordle Basic', description: 'A simple version.', tags: ['Game Logic'], wip: false, color: 'teal' },
      { id: 'wordle-enhanced', link: '/games/wordle-enhanced', placeholderText: 'Wordle', title: 'Wordle Enhanced', description: 'An enhanced version.', tags: ['Game Logic', 'CSS'], wip: false, color: 'lime' },
      { id: 'circles-basic', link: '/games/circles-basic', placeholderText: 'Circles', title: 'Circles Basic', description: 'Similar to Agario.', tags: ['Game Logic'], wip: true, color: 'emerald-400' },
      { id: 'circles-enhanced', link: '/games/circles-enhanced', placeholderText: 'Circles', title: 'Circles Enhanced', description: 'More similar to Agario.', tags: ['Game Logic', 'Canvas'], wip: true, color: 'green-400' },
      { id: 'ai-or-real-human', link: '/games/ai-or-real-human', placeholderText: 'AI or Real', title: 'AI or Real Human', description: 'Guess if the image is AI-generated or real.', tags: ['AI', 'Game'], wip: true, color: 'teal-400' },
    ],
  },
  bots: {
    title: 'Bots',
    description: 'Automated scripts for Discord, YouTube, Reddit.',
    color: 'amber',
    projects: [
      { id: 'discord-music', link: 'https://github.com/andersonproescholdbell/discord-music-bot', placeholderText: 'Discord', title: 'Discord Music Bot', description: 'Plays music in a Discord voice channel.', tags: ['Discord.js', 'API'], color: 'orange' },
      { id: 'discord-random', link: 'https://github.com/andersonproescholdbell/Impractical-Discord-Bot', placeholderText: 'Discord', title: 'Impractical Discord Bot', description: 'A bot with various random commands.', tags: ['Discord.js'], color: 'yellow' },
      { id: 'reddit-alerts', link: 'https://github.com/andersonproescholdbell/reddit-alerts', placeholderText: 'Reddit', title: 'Reddit Alerts Bot', description: 'Sends alerts for keywords on Reddit.', tags: ['Python', 'PRAW'], color: 'amber-400' },
      { id: 'youtube-auto-comment', link: 'https://github.com/andersonproescholdbell/comment-and-like-on-upload', placeholderText: 'YouTube', title: 'YouTube Auto-Commenter', description: 'Likes and comments on new videos from specific channels.', tags: ['YouTube API', 'Automation'], color: 'yellow-400' },
      { id: 'stock-market-alert', link: 'https://github.com/andersonproescholdbell/stock-market-drastic-change', placeholderText: 'Stock Market', title: 'Stock Market Alert Bot', description: 'Alerts on significant stock market changes.', tags: ['Finance API', 'Python'], color: 'orange-400' },
    ],
  },
  computation: {
    title: 'Theory of Computation',
    description: 'Simulators for theoretical computer science concepts.',
    color: 'indigo',
    placeholderText: 'Computation', 
    projects: [
      { id: 'turing-interactive', link: '/computation/turing-machine-simulator-interactive', placeholderText: 'Turing', title: 'Turing Machine (Interactive)', description: 'An interactive Turing Machine simulator.', tags: ['Simulator', 'UI'], wip: true, color: 'violet' },
      { id: 'turing-cli', link: 'https://github.com/andersonproescholdbell/Turing-Machine-Simulator', placeholderText: 'Turing', title: 'Turing Machine (CLI)', description: 'A command-line Turing Machine simulator.', tags: ['CLI', 'Java'], color: 'purple' },
      { id: 'dfsm-sim', link: 'https://github.com/andersonproescholdbell/Deterministic-Finite-State-Machine-Simulator', placeholderText: 'State Machine', title: 'DFSM Simulator', description: 'A deterministic finite state machine simulator.', tags: ['FSM', 'Java'], color: 'indigo-400' },
      { id: 'nfsm-sim', link: 'https://github.com/andersonproescholdbell/Nondeterministic-Finite-State-Machine-Simulator', placeholderText: 'State Machine', title: 'NFSM Simulator', description: 'A non-deterministic finite state machine simulator.', tags: ['FSM', 'Java'], color: 'purple-400' },
    ],
  },
  geometric: {
    title: 'Geometric',
    description: 'Generative art proofs of concept for geometric phenomena.',
    color: 'cyan-400',
    projects: [
      { id: 'fractal-triangle', link: '/geometric/fractal-triangle', placeholderText: 'Triangle', title: 'Sierpinski\'s Triangle', description: 'Standard chaos game rules.', tags: ['Fractal', 'Canvas'], wip: true, color: 'cyan' },
      { id: 'fractal-square-1', link: '/geometric/fractal-square-1', placeholderText: 'Square 1', title: 'Square Fractal 1', description: 'Rule: Not the same vertex twice.', tags: ['Fractal', 'Canvas'], wip: true, color: 'sky' },
      { id: 'fractal-square-2', link: '/geometric/fractal-square-2', placeholderText: 'Square 2', title: 'Square Fractal 2', description: 'Rule: Not clockwise/counter-clockwise of previous.', tags: ['Fractal', 'Canvas'], wip: true, color: 'teal' },
      { id: 'fractal-square-3', link: '/geometric/fractal-square-3', placeholderText: 'Square 3', title: 'Square Fractal 3', description: 'Rule: Not vertex 2 away from previous.', tags: ['Fractal', 'Canvas'], wip: true, color: 'sky-400' },
      { id: 'fractal-square-4', link: '/geometric/fractal-square-4', placeholderText: 'Square 4', title: 'Square Fractal 4', description: 'Rule: If previous two are same, cannot be neighbors.', tags: ['Fractal', 'Canvas'], wip: true, color: 'teal-400' },
      { id: 'fractal-pentagon-1', link: '/geometric/fractal-pentagon-1', placeholderText: 'Pentagon 1', title: 'Pentagon Fractal 1', description: 'Rule: Not the same vertex twice.', tags: ['Fractal', 'Canvas'], wip: true, color: 'blue-400' },
      { id: 'fractal-pentagon-2', link: '/geometric/fractal-pentagon-2', placeholderText: 'Pentagon 2', title: 'Pentagon Fractal 2', description: 'Rule: If previous two are same, cannot be neighbors.', tags: ['Fractal', 'Canvas'], wip: true, color: 'blue' },
      { id: 'fractal-hexagon', link: '/geometric/fractal-hexagon', placeholderText: 'Hexagon', title: 'Hexagon Fractal 1', description: 'Rule: Not the same vertex twice.', tags: ['Fractal', 'Canvas'], wip: true, color: 'cyan-400' },
    ],
  },
};