import type { ColorName } from './colors';
import { SHUFFLED_COLORS } from './colors';

export interface Project {
  id: string;
  link: string;
  placeholderText?: string;
  title: string;
  description: string;
  tags: string[];
  wip?: boolean;
  color?: ColorName;
}

export interface Category {
  title: string;
  description: string;
  color: ColorName;
  projects: Project[];
  placeholderText?: string;
}

// Use the centralized shuffled colors
const shuffledColors = SHUFFLED_COLORS;

export const projectData: Record<string, Category> = {
  'counter-strike': {
    title: 'Counter-Strike',
    description: 'A collection of trade-up calculators and tools for CS.',
    color: shuffledColors[0],
    projects: [
      { id: 'floats-v1', link: '/counter-strike/floats-v1', placeholderText: 'Floats V1', title: 'Floats-V1', description: 'Calculator V1', tags: ['Calculator'], wip: true, color: shuffledColors[1] },
      { id: 'floats-v2', link: '/counter-strike/floats-v2', placeholderText: 'Floats V2', title: 'Floats-V2', description: 'Calculator V2', tags: ['Calculator'], wip: true, color: shuffledColors[1] },
      { id: 'floats-v3', link: '/counter-strike/floats-v3', placeholderText: 'Floats V3', title: 'Floats-V3', description: 'Calculator V3', tags: ['Calculator'], wip: true, color: shuffledColors[1] },
      { id: 'items-assistant', link: 'https://github.com/andersonproescholdbell/csgo-items-assistant', placeholderText: 'Assistant', title: 'Items Assistant', description: 'Tool for managing CS items.', tags: ['Tool', 'External'], color: shuffledColors[4] },
      { id: 'market-floats', link: 'https://github.com/andersonproescholdbell/market-float-searcher-csgo', placeholderText: 'Market Floats', title: 'Market Float Searcher', description: 'Find low-float items on the market.', tags: ['Tool', 'External'], color: shuffledColors[5] },
      { id: 'market-bluegems', link: 'https://github.com/andersonproescholdbell/bluegem-finder', placeholderText: 'Market Gems', title: 'Market Bluegem Finder', description: 'Find case-hardened blue gems.', tags: ['Tool', 'External'], color: shuffledColors[6] },
    ],
  },
  games: {
    title: 'Games',
    description: 'Implementations and variations of popular games.',
    color: shuffledColors[7],
    projects: [
      { id: 'catan-board-generator', link: '/games/catan-board-generator', placeholderText: 'Catan', title: 'Catan Board Generator', description: 'A Catan board generator that goes a bit further.', tags: ['Algorithm', 'SVG'], wip: true, color: shuffledColors[8] },
      { id: 'wordle-basic', link: '/games/wordle-basic', placeholderText: 'Wordle', title: 'Wordle Basic', description: 'A simple version.', tags: ['Game Logic'], wip: false, color: shuffledColors[9] },
      { id: 'wordle-enhanced', link: '/games/wordle-enhanced', placeholderText: 'Wordle', title: 'Wordle Enhanced', description: 'An enhanced version.', tags: ['Game Logic', 'CSS'], wip: false, color: shuffledColors[9] },
      { id: 'wordle-enhanced-server', link: 'https://github.com/andersonproescholdbell/AKordle/tree/main', placeholderText: 'Wordle', title: 'Wordle Enhanced Server', description: 'An enhanced version that leverages server functionality.', tags: ['Game Logic', 'CSS'], wip: false, color: shuffledColors[9] },
      { id: 'circles-basic', link: '/games/circles-basic', placeholderText: 'Circles', title: 'Circles Basic', description: 'Similar to Agario.', tags: ['Game Logic'], wip: true, color: shuffledColors[11] },
      { id: 'circles-enhanced', link: '/games/circles-enhanced', placeholderText: 'Circles', title: 'Circles Enhanced Server', description: 'More similar to Agario .', tags: ['Game Logic', 'Canvas'], wip: true, color: shuffledColors[11] },
      { id: 'circles-basic-server', link: 'https://github.com/andersonproescholdbell/akpcircles', placeholderText: 'Circles', title: 'Circles Basic Server', description: 'Similar to Agario that (server version).', tags: ['Game Logic'], wip: true, color: shuffledColors[11] },
      { id: 'circles-enhanced-server', link: 'https://github.com/andersonproescholdbell/newakpcircles', placeholderText: 'Circles', title: 'Circles Enhanced', description: 'More similar to Agario (server version).', tags: ['Game Logic', 'Canvas'], wip: true, color: shuffledColors[11] },
      { id: 'ai-or-real-human', link: '/games/ai-or-real-human', placeholderText: 'AI or Real', title: 'AI or Real Human', description: 'Guess if the image is AI-generated or real.', tags: ['AI', 'Game'], wip: true, color: shuffledColors[13] },
      { id: 'takuzu-solver', link: 'https://github.com/andersonproescholdbell/takuzu-solver', placeholderText: 'Takuzu', title: 'Takuzu Solver', description: 'A takuzu solver.', tags: ['AI', 'Game', 'External'], wip: true, color: shuffledColors[14] },
    ],
  },
  bots: {
    title: 'Bots',
    description: 'Automated scripts for Discord, YouTube, Reddit.',
    color: shuffledColors[14],
    projects: [
      { id: 'discord-music', link: 'https://github.com/andersonproescholdbell/discord-music-bot', placeholderText: 'Discord', title: 'Discord Music Bot', description: 'Plays music in a Discord voice channel.', tags: ['Discord.js', 'API'], color: shuffledColors[15] },
      { id: 'discord-random', link: 'https://github.com/andersonproescholdbell/Impractical-Discord-Bot', placeholderText: 'Discord', title: 'Impractical Discord Bot', description: 'A bot with various random commands.', tags: ['Discord.js'], color: shuffledColors[15] },
      { id: 'reddit-alerts', link: 'https://github.com/andersonproescholdbell/reddit-alerts', placeholderText: 'Reddit', title: 'Reddit Alerts Bot', description: 'Sends alerts for keywords on Reddit.', tags: ['Python', 'PRAW'], color: shuffledColors[17] },
      { id: 'youtube-auto-comment', link: 'https://github.com/andersonproescholdbell/comment-and-like-on-upload', placeholderText: 'YouTube', title: 'YouTube Auto-Commenter', description: 'Likes and comments on new videos from specific channels.', tags: ['YouTube API', 'Automation'], color: shuffledColors[18] },
      { id: 'stock-market-alert', link: 'https://github.com/andersonproescholdbell/stock-market-drastic-change', placeholderText: 'Stock Market', title: 'Stock Market Alert Bot', description: 'Alerts on significant stock market changes.', tags: ['Finance API', 'Python'], color: shuffledColors[19] },
    ],
  },
  computation: {
    title: 'Theory of Computation',
    description: 'Simulators for theoretical computer science concepts.',
    color: shuffledColors[20],
    placeholderText: 'Computation', 
    projects: [
      { id: 'turing-interactive', link: '/computation/turing-machine-simulator-interactive', placeholderText: 'Turing', title: 'Turing Machine (Interactive)', description: 'An interactive Turing Machine simulator.', tags: ['Simulator', 'UI'], wip: true, color: shuffledColors[21] },
      { id: 'turing-cli', link: 'https://github.com/andersonproescholdbell/Turing-Machine-Simulator', placeholderText: 'Turing', title: 'Turing Machine (CLI)', description: 'A command-line Turing Machine simulator.', tags: ['CLI', 'Java'], color: shuffledColors[21] },
      { id: 'dfsm-sim', link: 'https://github.com/andersonproescholdbell/Deterministic-Finite-State-Machine-Simulator', placeholderText: 'State Machine', title: 'DFSM Simulator', description: 'A deterministic finite state machine simulator.', tags: ['FSM', 'Java'], color: shuffledColors[23] },
      { id: 'nfsm-sim', link: 'https://github.com/andersonproescholdbell/Nondeterministic-Finite-State-Machine-Simulator', placeholderText: 'State Machine', title: 'NFSM Simulator', description: 'A non-deterministic finite state machine simulator.', tags: ['FSM', 'Java'], color: shuffledColors[23] },
    ],
  },
  geometric: {
    title: 'Geometric',
    description: 'Generative art proofs of concept for geometric phenomena.',
    color: shuffledColors[25],
    projects: [
      { id: 'fractal-triangle', link: '/geometric/fractal-triangle', placeholderText: 'Triangle', title: 'Sierpinski\'s Triangle', description: 'Standard chaos game rules.', tags: ['Fractal', 'Canvas'], wip: true, color: shuffledColors[26] },
      { id: 'fractal-square-1', link: '/geometric/fractal-square-1', placeholderText: 'Square 1', title: 'Square Fractal 1', description: 'Rule: Not the same vertex twice.', tags: ['Fractal', 'Canvas'], wip: true, color: shuffledColors[27] },
      { id: 'fractal-square-2', link: '/geometric/fractal-square-2', placeholderText: 'Square 2', title: 'Square Fractal 2', description: 'Rule: Not clockwise/counter-clockwise of previous.', tags: ['Fractal', 'Canvas'], wip: true, color: shuffledColors[27] },
      { id: 'fractal-square-3', link: '/geometric/fractal-square-3', placeholderText: 'Square 3', title: 'Square Fractal 3', description: 'Rule: Not vertex 2 away from previous.', tags: ['Fractal', 'Canvas'], wip: true, color: shuffledColors[27] },
      { id: 'fractal-square-4', link: '/geometric/fractal-square-4', placeholderText: 'Square 4', title: 'Square Fractal 4', description: 'Rule: If previous two are same, cannot be neighbors.', tags: ['Fractal', 'Canvas'], wip: true, color: shuffledColors[27] },
      { id: 'fractal-pentagon-1', link: '/geometric/fractal-pentagon-1', placeholderText: 'Pentagon 1', title: 'Pentagon Fractal 1', description: 'Rule: Not the same vertex twice.', tags: ['Fractal', 'Canvas'], wip: true, color: shuffledColors[31] },
      { id: 'fractal-pentagon-2', link: '/geometric/fractal-pentagon-2', placeholderText: 'Pentagon 2', title: 'Pentagon Fractal 2', description: 'Rule: If previous two are same, cannot be neighbors.', tags: ['Fractal', 'Canvas'], wip: true, color: shuffledColors[31] },
      { id: 'fractal-hexagon', link: '/geometric/fractal-hexagon', placeholderText: 'Hexagon', title: 'Hexagon Fractal 1', description: 'Rule: Not the same vertex twice.', tags: ['Fractal', 'Canvas'], wip: true, color: shuffledColors[33] },
    ],
  },
};