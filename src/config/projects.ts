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
  'original-reference'?: string;
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
      { id: 'floats-v1', link: '/counter-strike/floats-v1', placeholderText: 'Floats V1', title: 'Float Creator V1', description: 'Calculator V1: The original CSGO tradeup calculator.', tags: ['Webpage', 'JavaScript', 'HTML', 'CSS', 'Ported'], color: shuffledColors[1], 'original-reference': 'https://github.com/andersonproescholdbell/andersonproescholdbell.github.io/tree/211aae76a56844745e8cb9a5b1e74379d9ab2b30/floatsV1' },
      { id: 'floats-v2', link: '/counter-strike/floats-v2', placeholderText: 'Floats V2', title: 'Float Creator V2', description: 'Calculator V2: A second version of the tradeup calculator.', tags: ['Webpage', 'React', 'JavaScript', 'Ported'], color: shuffledColors[1], 'original-reference': 'https://github.com/andersonproescholdbell/floats' },
      { id: 'floats-v3', link: '/counter-strike/floats-v3', placeholderText: 'Floats V3', title: 'Float Creator V3', description: 'Calculator V3: A third version of the tradeup calculator.', tags: ['Webpage', 'JavaScript', 'HTML', 'CSS', 'Ported'], color: shuffledColors[1], 'original-reference': 'https://github.com/andersonproescholdbell/andersonproescholdbell.github.io/tree/211aae76a56844745e8cb9a5b1e74379d9ab2b30/floatsV3' },
      { id: 'items-assistant', link: 'https://github.com/andersonproescholdbell/csgo-items-assistant', placeholderText: 'Assistant', title: 'Items Assistant', description: 'Tool for managing CS items.', tags: ['Extension', 'JavaScript', 'HTML', 'CSS'], color: shuffledColors[2] },
      { id: 'market-floats', link: 'https://github.com/andersonproescholdbell/market-float-searcher-csgo', placeholderText: 'Market Floats', title: 'Market Float Searcher', description: 'Find low-float items on the market.', tags: ['Script', 'Python'], color: shuffledColors[3] },
      { id: 'market-bluegems', link: 'https://github.com/andersonproescholdbell/bluegem-finder', placeholderText: 'Market Gems', title: 'Market Bluegem Finder', description: 'Find case-hardened blue gems.', tags: ['Script', 'Python'], color: shuffledColors[4] },
    ],
  },
  games: {
    title: 'Games',
    description: 'Implementations and variations of popular games.',
    color: shuffledColors[7],
    projects: [
      { id: 'catan-board-generator', link: '/games/catan-board-generator', placeholderText: 'Catan', title: 'Catan Board Generator', description: 'A Catan board generator that goes a bit further.', tags: ['Webpage', 'JavaScript', 'HTML', 'CSS', 'Canvas', 'Ported'], color: shuffledColors[5], 'original-reference': 'https://github.com/andersonproescholdbell/Advantageo-Catan-Alternative-Client-Setup' },
      { id: 'wordle', link: '/games/wordle', placeholderText: 'Wordle', title: 'Wordle', description: 'A simple version.', tags: ['Webpage', 'JavaScript', 'HTML', 'CSS', 'Ported'], color: shuffledColors[6], 'original-reference': 'https://github.com/andersonproescholdbell/wordle' },
      { id: 'AKordle', link: '/games/akordle', placeholderText: 'AKordle', title: 'AKordle', description: 'An enhanced version.', tags: ['Webpage', 'PHP', 'JavaScript', 'Bootstrap', 'Ported'], color: shuffledColors[7], 'original-reference': 'https://github.com/andersonproescholdbell/AKordle/tree/main' },
      { id: 'circles-v1', link: '/games/circles-v1', placeholderText: 'Circles', title: 'Circles V1', description: 'Similar to Agario.', tags: ['Webpage', 'Express.js', 'Node.js', 'HTML', 'CSS', 'Canvas', 'Ported'], color: shuffledColors[8], 'original-reference': 'https://github.com/andersonproescholdbell/akpcircles' },
      { id: 'circles-v2', link: '/games/circles-v2', placeholderText: 'Circles', title: 'Circles V2', description: 'An incomplete project that showcased camera following.', tags: ['Webpage', 'Express.js', 'Canvas', 'Phaser.js', 'Ported'], color: shuffledColors[9], 'original-reference': 'https://github.com/andersonproescholdbell/newakpcircles' },
      { id: 'ai-or-real-human', link: '/games/ai-or-real-human', placeholderText: 'AI or Real', title: 'AI or Real Human', description: 'Guess if the image is AI-generated or real human photo.', tags: ['Webpage', 'Next.js', 'Ported'], color: shuffledColors[10], 'original-reference': 'https://github.com/andersonproescholdbell/hackathon-project' },
      { id: 'takuzu-solver', link: 'https://github.com/andersonproescholdbell/takuzu-solver', placeholderText: 'Takuzu', title: 'Takuzu Solver', description: 'A takuzu solver.', tags: ['Script', 'JavaScript'], color: shuffledColors[11] },
    ],
  },
  bots: {
    title: 'Bots',
    description: 'Automated scripts for Discord, YouTube, Reddit.',
    color: shuffledColors[14],
    projects: [
      { id: 'discord-music', link: 'https://github.com/andersonproescholdbell/discord-music-bot', placeholderText: 'Discord', title: 'Discord Music Bot', description: 'Plays music in a Discord voice channel.', tags: ['Bot', 'Discord.js'], color: shuffledColors[12] },
      { id: 'discord-random', link: 'https://github.com/andersonproescholdbell/Impractical-Discord-Bot', placeholderText: 'Discord', title: 'Impractical Discord Bot', description: 'A bot with various random commands.', tags: ['Bot', 'Discord.js'], color: shuffledColors[12] },
      { id: 'reddit-alerts', link: 'https://github.com/andersonproescholdbell/reddit-alerts', placeholderText: 'Reddit', title: 'Reddit Alerts Bot', description: 'Sends alerts for keywords on Reddit.', tags: ['Bot', 'Python', 'PRAW'], color: shuffledColors[13] },
      { id: 'youtube-auto-comment', link: 'https://github.com/andersonproescholdbell/comment-and-like-on-upload', placeholderText: 'YouTube', title: 'YouTube Auto-Commenter', description: 'Likes and comments on new videos from specific channels.', tags: ['Bot', 'Python', 'YouTube API', 'Google OAuth'], color: shuffledColors[14] },
      { id: 'stock-market-alert', link: 'https://github.com/andersonproescholdbell/stock-market-drastic-change', placeholderText: 'Stock Market', title: 'Stock Market Alert Bot', description: 'Alerts on significant stock market changes.', tags: ['Bot', 'Python', 'Alpha Vantage API'], color: shuffledColors[15] },
    ],
  },
  computation: {
    title: 'Theory of Computation',
    description: 'Simulators for theoretical computer science concepts.',
    color: shuffledColors[20],
    placeholderText: 'Computation',
    projects: [
      { id: 'turing-interactive', link: '/computation/turing-machine-simulator-interactive', placeholderText: 'Turing', title: 'Turing Machine (Interactive)', description: 'An interactive Turing Machine simulator.', tags: ['Webpage', 'JavaScript', 'HTML', 'CSS', 'Ported'], color: shuffledColors[16], "original-reference": 'https://github.com/andersonproescholdbell/Turing-Machine-Simulator-Website' },
      { id: 'turing-cli', link: 'https://github.com/andersonproescholdbell/Turing-Machine-Simulator', placeholderText: 'Turing', title: 'Turing Machine (CLI)', description: 'A command-line Turing Machine simulator.', tags: ['CLI', 'Java'], color: shuffledColors[16] },
      { id: 'dfsm-sim', link: 'https://github.com/andersonproescholdbell/Deterministic-Finite-State-Machine-Simulator', placeholderText: 'State Machine', title: 'DFSM Simulator', description: 'A deterministic finite state machine simulator.', tags: ['Script', 'Java'], color: shuffledColors[17] },
      { id: 'nfsm-sim', link: 'https://github.com/andersonproescholdbell/Nondeterministic-Finite-State-Machine-Simulator', placeholderText: 'State Machine', title: 'NFSM Simulator', description: 'A non-deterministic finite state machine simulator.', tags: ['Script', 'Java'], color: shuffledColors[17] },
    ],
  },
  geometric: {
    title: 'Geometric',
    description: 'Generative art proofs of concept for geometric phenomena.',
    color: shuffledColors[25],
    projects: [
      { id: 'fractal-triangle', link: '/geometric/fractal-triangle', placeholderText: 'Triangle', title: 'Sierpinski\'s Triangle', description: 'Standard chaos game rules.', tags: ['Webpage', 'JavaScript', 'HTML', 'CSS', 'Canvas', 'Ported'], color: shuffledColors[18], "original-reference": 'https://github.com/andersonproescholdbell/andersonproescholdbell.github.io/tree/211aae76a56844745e8cb9a5b1e74379d9ab2b30/geometric/sierpinski' },
      { id: 'fractal-square-1', link: '/geometric/fractal-square-1', placeholderText: 'Square 1', title: 'Square Fractal 1', description: 'Rule: Not the same vertex twice.', tags: ['Webpage', 'JavaScript', 'HTML', 'CSS', 'Canvas', 'Ported'], color: shuffledColors[19], "original-reference": 'https://github.com/andersonproescholdbell/andersonproescholdbell.github.io/tree/211aae76a56844745e8cb9a5b1e74379d9ab2b30/geometric/square1' },
      { id: 'fractal-square-2', link: '/geometric/fractal-square-2', placeholderText: 'Square 2', title: 'Square Fractal 2', description: 'Rule: Not clockwise/counter-clockwise of previous.', tags: ['Webpage', 'JavaScript', 'HTML', 'CSS', 'Canvas', 'Ported'], color: shuffledColors[19], "original-reference": 'https://github.com/andersonproescholdbell/andersonproescholdbell.github.io/tree/211aae76a56844745e8cb9a5b1e74379d9ab2b30/geometric/square2' },
      { id: 'fractal-square-3', link: '/geometric/fractal-square-3', placeholderText: 'Square 3', title: 'Square Fractal 3', description: 'Rule: Not vertex 2 away from previous.', tags: ['Webpage', 'JavaScript', 'HTML', 'CSS', 'Canvas', 'Ported'], color: shuffledColors[19], "original-reference": 'https://github.com/andersonproescholdbell/andersonproescholdbell.github.io/tree/211aae76a56844745e8cb9a5b1e74379d9ab2b30/geometric/square3' },
      { id: 'fractal-square-4', link: '/geometric/fractal-square-4', placeholderText: 'Square 4', title: 'Square Fractal 4', description: 'Rule: If previous two are same, cannot be neighbors.', tags: ['Webpage', 'JavaScript', 'HTML', 'CSS', 'Canvas', 'Ported'], color: shuffledColors[19], "original-reference": 'https://github.com/andersonproescholdbell/andersonproescholdbell.github.io/tree/211aae76a56844745e8cb9a5b1e74379d9ab2b30/geometric/square4' },
      { id: 'fractal-pentagon-1', link: '/geometric/fractal-pentagon-1', placeholderText: 'Pentagon 1', title: 'Pentagon Fractal 1', description: 'Rule: Not the same vertex twice.', tags: ['Webpage', 'JavaScript', 'HTML', 'CSS', 'Canvas', 'Ported'], color: shuffledColors[20], "original-reference": 'https://github.com/andersonproescholdbell/andersonproescholdbell.github.io/tree/211aae76a56844745e8cb9a5b1e74379d9ab2b30/geometric/pent1' },
      { id: 'fractal-pentagon-2', link: '/geometric/fractal-pentagon-2', placeholderText: 'Pentagon 2', title: 'Pentagon Fractal 2', description: 'Rule: If previous two are same, cannot be neighbors.', tags: ['Webpage', 'JavaScript', 'HTML', 'CSS', 'Canvas', 'Ported'], color: shuffledColors[20], "original-reference": 'https://github.com/andersonproescholdbell/andersonproescholdbell.github.io/tree/211aae76a56844745e8cb9a5b1e74379d9ab2b30/geometric/pent2' },
      { id: 'fractal-hexagon', link: '/geometric/fractal-hexagon', placeholderText: 'Hexagon', title: 'Hexagon Fractal 1', description: 'Rule: Not the same vertex twice.', tags: ['Webpage', 'JavaScript', 'HTML', 'CSS', 'Canvas', 'Ported'], color: shuffledColors[21], "original-reference": 'https://github.com/andersonproescholdbell/andersonproescholdbell.github.io/tree/211aae76a56844745e8cb9a5b1e74379d9ab2b30/geometric/hex1' },
    ],
  },
};