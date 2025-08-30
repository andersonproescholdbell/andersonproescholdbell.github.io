export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  wip?: boolean;
  placeholderText?: string;
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
      { id: 'floatsv1', title: 'FloatsV1', description: 'Calculator V1', link: '/counter-strike/floatsv1', tags: ['Calculator'], wip: true, color: 'blue' },
      { id: 'floatsv2', title: 'FloatsV2', description: 'Calculator V2', link: '/counter-strike/floatsv2', tags: ['Calculator'], wip: true, color: 'cyan' },
      { id: 'floatsv3', title: 'FloatsV3', description: 'Calculator V3', link: '/counter-strike/floatsv3', tags: ['Calculator'], wip: true, color: 'sky-400' },
      { id: 'items-assistant', title: 'Items Assistant', placeholderText: 'Assistant', description: 'Tool for managing CS items.', link: 'https://github.com/andersonproescholdbell/csgo-items-assistant', tags: ['Tool', 'External'], color: 'blue-400' },
      { id: 'market-float-searcher', title: 'Market Float Searcher', placeholderText: 'Market Floats', description: 'Find low-float items on the market.', link: 'https://github.com/andersonproescholdbell/market-float-searcher-csgo', tags: ['Tool', 'External'], color: 'cyan-400' },
      { id: 'bluegem-finder', title: 'Market Bluegem Finder', placeholderText: 'Market Gems', description: 'Find case-hardened blue gems.', link: 'https://github.com/andersonproescholdbell/bluegem-finder', tags: ['Tool', 'External'], color: 'teal' },
    ],
  },
  games: {
    title: 'Games',
    description: 'Implementations and variations of popular games.',
    color: 'emerald',
    projects: [
      { id: 'catan-board-generator', title: 'Catan Board Generator', placeholderText: 'Catan', description: 'A Catan board generator that goes a bit further.', link: '/games/catan-board-generator', tags: ['Algorithm', 'SVG'], wip: true, color: 'green' },
      { id: 'wordle-basic', title: 'Wordle Basic', placeholderText: 'Wordle', description: 'A simple version.', link: '/games/wordle-basic', tags: ['Game Logic'], wip: false, color: 'teal' },
      { id: 'wordle-enhanced', title: 'Wordle Enhanced', placeholderText: 'Wordle', description: 'An enhanced version.', link: '/games/wordle-enhanced', tags: ['Game Logic', 'CSS'], wip: false, color: 'lime' },
      { id: 'circles-basic', title: 'Circles Basic', placeholderText: 'Circles', description: 'Similar to Agario.', link: '/games/circles-basic', tags: ['Game Logic'], wip: true, color: 'emerald-400' },
      { id: 'circles-enhanced', title: 'Circles Enhanced', placeholderText: 'Circles', description: 'More similar to Agario.', link: '/games/circles-enhanced', tags: ['Game Logic', 'Canvas'], wip: true, color: 'green-400' },
      { id: 'ai-or-real-human', title: 'AI or Real Human', placeholderText: 'AI or Real', description: 'Guess if the image is AI-generated or real.', link: '/games/ai-or-real-human', tags: ['AI', 'Game'], wip: true, color: 'teal-400' },
    ],
  },
  bots: {
    title: 'Bots',
    description: 'Automated scripts for Discord, YouTube, Reddit.',
    color: 'amber',
    projects: [
      { id: 'discord-music', title: 'Discord Music Bot', placeholderText: 'Discord', description: 'Plays music in a Discord voice channel.', link: 'https://github.com/andersonproescholdbell/discord-music-bot', tags: ['Discord.js', 'API'], color: 'orange' },
      { id: 'discord-random', title: 'Impractical Discord Bot', placeholderText: 'Discord', description: 'A bot with various random commands.', link: 'https://github.com/andersonproescholdbell/Impractical-Discord-Bot', tags: ['Discord.js'], color: 'yellow' },
      { id: 'reddit-alerts', title: 'Reddit Alerts Bot', placeholderText: 'Reddit', description: 'Sends alerts for keywords on Reddit.', link: 'https://github.com/andersonproescholdbell/reddit-alerts', tags: ['Python', 'PRAW'], color: 'amber-400' },
      { id: 'youtube-auto-comment', title: 'YouTube Auto-Commenter', placeholderText: 'YouTube', description: 'Likes and comments on new videos from specific channels.', link: 'https://github.com/andersonproescholdbell/comment-and-like-on-upload', tags: ['YouTube API', 'Automation'], color: 'yellow-400' },
      { id: 'stock-market-alert', title: 'Stock Market Alert Bot', placeholderText: 'Stock Market', description: 'Alerts on significant stock market changes.', link: 'https://github.com/andersonproescholdbell/stock-market-drastic-change', tags: ['Finance API', 'Python'], color: 'orange-400' },
    ],
  },
  computation: {
    title: 'Theory of Computation',
    description: 'Simulators for theoretical computer science concepts.',
    color: 'indigo',
    placeholderText: 'Computation', 
    projects: [
      { id: 'turing-interactive', title: 'Turing Machine (Interactive)', placeholderText: 'Turing', description: 'An interactive Turing Machine simulator.', link: '/computation/turing-machine-simulator-interactive', tags: ['Simulator', 'UI'], wip: true, color: 'violet' },
      { id: 'turing-cli', title: 'Turing Machine (CLI)', placeholderText: 'Turing', description: 'A command-line Turing Machine simulator.', link: 'https://github.com/andersonproescholdbell/Turing-Machine-Simulator', tags: ['CLI', 'Java'], color: 'purple' },
      { id: 'dfsm-sim', title: 'DFSM Simulator', placeholderText: 'State Machine', description: 'A deterministic finite state machine simulator.', link: 'https://github.com/andersonproescholdbell/Deterministic-Finite-State-Machine-Simulator', tags: ['FSM', 'Java'], color: 'indigo-400' },
      { id: 'nfsm-sim', title: 'NFSM Simulator', placeholderText: 'State Machine', description: 'A non-deterministic finite state machine simulator.', link: 'https://github.com/andersonproescholdbell/Nondeterministic-Finite-State-Machine-Simulator', tags: ['FSM', 'Java'], color: 'purple-400' },
    ],
  },
  geometric: {
    title: 'Geometric',
    description: 'Generative art proofs of concept for geometric phenomena.',
    color: 'cyan-400',
    projects: [
      { id: 'sierpinski-triangle', title: 'Sierpinski\'s Triangle', placeholderText: 'Triangle', description: 'Standard chaos game rules.', link: '/geometric/sierpinskis-triangle-standard-rules', tags: ['Fractal', 'Canvas'], wip: true, color: 'cyan' },
      { id: 'square1-fractal', title: 'Square Fractal 1', placeholderText: 'Square', description: 'Rule: Not the same vertex twice.', link: '/geometric/square1-fractal-not-same-vertex-twice', tags: ['Fractal', 'Canvas'], wip: true, color: 'sky' },
      { id: 'square2-fractal', title: 'Square Fractal 2', placeholderText: 'Square', description: 'Rule: Not clockwise/counter-clockwise of previous.', link: '/geometric/square2-fractal-not-vertex-clockwise-or-counterclockwise-of-previous', tags: ['Fractal', 'Canvas'], wip: true, color: 'teal' },
      { id: 'square3-fractal', title: 'Square Fractal 3', placeholderText: 'Square', description: 'Rule: Not vertex 2 away from previous.', link: '/geometric/square3-fractal-not-vertex-2-away-from-previous', tags: ['Fractal', 'Canvas'], wip: true, color: 'sky-400' },
      { id: 'square4-fractal', title: 'Square Fractal 4', placeholderText: 'Square', description: 'Rule: If previous two are same, cannot be neighbors.', link: '/geometric/square4-fractal-if-two-previous-vertices-are-the-same-cannot-neighbor-them', tags: ['Fractal', 'Canvas'], wip: true, color: 'teal-400' },
      { id: 'pentagon1-fractal', title: 'Pentagon Fractal 1', placeholderText: 'Pentagon', description: 'Rule: Not the same vertex twice.', link: '/geometric/pentagon1-fractal-not-the-same-vertex-twice', tags: ['Fractal', 'Canvas'], wip: true, color: 'blue-400' },
      { id: 'pentagon2-fractal', title: 'Pentagon Fractal 2', placeholderText: 'Pentagon', description: 'Rule: If previous two are same, cannot be neighbors.', link: '/geometric/pentagon2-fractal-if-two-previous-vertices-are-the-same-cannot-neighbor-them', tags: ['Fractal', 'Canvas'], wip: true, color: 'blue' },
      { id: 'hexagon1-fractal', title: 'Hexagon Fractal 1', placeholderText: 'Hexagon', description: 'Rule: Not the same vertex twice.', link: '/geometric/hexagon1-fractal-not-the-same-vertex-twice', tags: ['Fractal', 'Canvas'], wip: true, color: 'cyan-400' },
    ],
  },
};