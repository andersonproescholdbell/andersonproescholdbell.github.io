export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  wip?: boolean;
  placeholderText?: string;
}

export interface Category {
  title: string;
  description: string;
  color: 'sky' | 'emerald' | 'red' | 'indigo' | 'purple' | 'amber' | 'pink';
  projects: Project[];
  placeholderText?: string;
}

export const projectData: Record<string, Category> = {
  'counter-strike': {
    title: 'Counter-Strike',
    description: 'A collection of trade-up calculators and tools for CS.',
    color: 'sky',
    projects: [
      { id: 'floatsv1', title: 'FloatsV1', description: 'Calculator V1', link: '/counter-strike/floatsv1', tags: ['Calculator'], wip: true },
      { id: 'floatsv2', title: 'FloatsV2', description: 'Calculator V2', link: '/counter-strike/floatsv2', tags: ['Calculator'], wip: true },
      { id: 'floatsv3', title: 'FloatsV3', description: 'Calculator V3', link: '/counter-strike/floatsv3', tags: ['Calculator'], wip: true },
      { id: 'items-assistant', title: 'Items Assistant', placeholderText: 'Assistant', description: 'Tool for managing CS items.', link: 'https://github.com/andersonproescholdbell/csgo-items-assistant', tags: ['Tool', 'External'] },
      { id: 'market-float-searcher', title: 'Market Float Searcher', placeholderText: 'Market Floats', description: 'Find low-float items on the market.', link: 'https://github.com/andersonproescholdbell/market-float-searcher-csgo', tags: ['Tool', 'External'] },
      { id: 'bluegem-finder', title: 'Market Bluegem Finder', placeholderText: 'Market Bluegems', description: 'Find case-hardened blue gems.', link: 'https://github.com/andersonproescholdbell/bluegem-finder', tags: ['Tool', 'External'] },
    ],
  },
  games: {
    title: 'Games',
    description: 'Implementations and variations of popular games.',
    color: 'emerald',
    projects: [
      { id: 'catan-board-generator', title: 'Catan Board Generator', placeholderText: 'Catan', description: 'A Catan board generator that goes a bit further.', link: '/games/catan-board-generator', tags: ['Algorithm', 'SVG'], wip: true },
      { id: 'wordle-basic', title: 'Wordle Basic', placeholderText: 'Wordle', description: 'A simple version of the popular word game.', link: '/games/wordle-basic', tags: ['Game Logic'], wip: false },
      { id: 'wordle-enhanced', title: 'Wordle Enhanced', placeholderText: 'Wordle', description: 'An enhanced version of Wordle.', link: '/games/wordle-enhanced', tags: ['Game Logic', 'CSS'], wip: false },
      { id: 'circles-basic', title: 'Circles Basic', placeholderText: 'Circles', description: 'A basic concept for a circle-based game.', link: '/games/circles-basic', tags: ['Game Logic'], wip: true },
      { id: 'circles-enhanced', title: 'Circles Enhanced', placeholderText: 'Circles', description: 'An enhanced version of the circles game.', link: '/games/circles-enhanced', tags: ['Game Logic', 'Canvas'], wip: true },
      { id: 'ai-or-real-human', title: 'AI or Real Human', placeholderText: 'AI or Real', description: 'Guess if the image is AI-generated or real.', link: '/games/ai-or-real-human', tags: ['AI', 'Game'], wip: true },
    ],
  },
  bots: {
    title: 'Bots',
    description: 'Automated scripts for Discord, YouTube, Reddit.',
    color: 'amber',
    projects: [
      { id: 'discord-music', title: 'Discord Music Bot', placeholderText: 'Discord', description: 'Plays music in a Discord voice channel.', link: 'https://github.com/andersonproescholdbell/discord-music-bot', tags: ['Discord.js', 'API'] },
      { id: 'discord-random', title: 'Impractical Discord Bot', placeholderText: 'Discord', description: 'A bot with various random commands.', link: 'https://github.com/andersonproescholdbell/Impractical-Discord-Bot', tags: ['Discord.js'] },
      { id: 'reddit-alerts', title: 'Reddit Alerts Bot', placeholderText: 'Reddit', description: 'Sends alerts for keywords on Reddit.', link: 'https://github.com/andersonproescholdbell/reddit-alerts', tags: ['Python', 'PRAW'] },
      { id: 'youtube-auto-comment', title: 'YouTube Auto-Commenter', placeholderText: 'YouTube', description: 'Likes and comments on new videos from specific channels.', link: 'https://github.com/andersonproescholdbell/comment-and-like-on-upload', tags: ['YouTube API', 'Automation'] },
      { id: 'stock-market-alert', title: 'Stock Market Alert Bot', placeholderText: 'Stock Market', description: 'Alerts on drastic stock market changes.', link: 'https://github.com/andersonproescholdbell/stock-market-drastic-change', tags: ['Finance API', 'Python'] },
    ],
  },
  computation: {
    title: 'Theory of Computation',
    description: 'Simulators for theoretical computer science concepts.',
    color: 'indigo',
    placeholderText: 'Computation', 
    projects: [
      { id: 'turing-interactive', title: 'Turing Machine (Interactive)', placeholderText: 'Turing', description: 'An interactive Turing Machine simulator.', link: '/computation/turing-machine-simulator-interactive', tags: ['Simulator', 'UI'], wip: true },
      { id: 'turing-cli', title: 'Turing Machine (CLI)', placeholderText: 'Turing', description: 'A command-line Turing Machine simulator.', link: 'https://github.com/andersonproescholdbell/Turing-Machine-Simulator', tags: ['CLI', 'Java'] },
      { id: 'dfsm-sim', title: 'DFSM Simulator', placeholderText: 'State Machine', description: 'A deterministic finite state machine simulator.', link: 'https://github.com/andersonproescholdbell/Deterministic-Finite-State-Machine-Simulator', tags: ['FSM', 'Java'] },
      { id: 'nfsm-sim', title: 'NFSM Simulator', placeholderText: 'State Machine', description: 'A non-deterministic finite state machine simulator.', link: 'https://github.com/andersonproescholdbell/Nondeterministic-Finite-State-Machine-Simulator', tags: ['FSM', 'Java'] },
    ],
  },
  geometric: {
    title: 'Geometric',
    description: 'Generative art proofs of concept for geometric phenomena.',
    color: 'pink',
    projects: [
      { id: 'sierpinski-triangle', title: 'Sierpinski\'s Triangle', placeholderText: 'Triangle', description: 'Standard chaos game rules.', link: '/geometric/sierpinskis-triangle-standard-rules', tags: ['Fractal', 'Canvas'], wip: true },
      { id: 'square1-fractal', title: 'Square Fractal 1', placeholderText: 'Square', description: 'Rule: Not the same vertex twice.', link: '/geometric/square1-fractal-not-same-vertex-twice', tags: ['Fractal', 'Canvas'], wip: true },
      { id: 'square2-fractal', title: 'Square Fractal 2', placeholderText: 'Square', description: 'Rule: Not clockwise/counter-clockwise of previous.', link: '/geometric/square2-fractal-not-vertex-clockwise-or-counterclockwise-of-previous', tags: ['Fractal', 'Canvas'], wip: true },
      { id: 'square3-fractal', title: 'Square Fractal 3', placeholderText: 'Square', description: 'Rule: Not vertex 2 away from previous.', link: '/geometric/square3-fractal-not-vertex-2-away-from-previous', tags: ['Fractal', 'Canvas'], wip: true },
      { id: 'square4-fractal', title: 'Square Fractal 4', placeholderText: 'Square', description: 'Rule: If previous two are same, cannot be neighbors.', link: '/geometric/square4-fractal-if-two-previous-vertices-are-the-same-cannot-neighbor-them', tags: ['Fractal', 'Canvas'], wip: true },
      { id: 'pentagon1-fractal', title: 'Pentagon Fractal 1', placeholderText: 'Pentagon', description: 'Rule: Not the same vertex twice.', link: '/geometric/pentagon1-fractal-not-the-same-vertex-twice', tags: ['Fractal', 'Canvas'], wip: true },
      { id: 'pentagon2-fractal', title: 'Pentagon Fractal 2', placeholderText: 'Pentagon', description: 'Rule: If previous two are same, cannot be neighbors.', link: '/geometric/pentagon2-fractal-if-two-previous-vertices-are-the-same-cannot-neighbor-them', tags: ['Fractal', 'Canvas'], wip: true },
      { id: 'hexagon1-fractal', title: 'Hexagon Fractal 1', placeholderText: 'Hexagon', description: 'Rule: Not the same vertex twice.', link: '/geometric/hexagon1-fractal-not-the-same-vertex-twice', tags: ['Fractal', 'Canvas'], wip: true },
    ],
  },
};