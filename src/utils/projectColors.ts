import { projectData } from '../data/portfolio/projects';

// Color map for WIP page styling
const colorMap = {
  // Original colors
  sky:     { bgColor: '#0ea5e9', darkBg: '#1e3c72', lightBg: '#2a5298', accent: '#00d4ff' },
  emerald: { bgColor: '#10b981', darkBg: '#065f46', lightBg: '#047857', accent: '#34d399' },
  red:     { bgColor: '#ef4444', darkBg: '#7f1d1d', lightBg: '#991b1b', accent: '#f87171' },
  indigo:  { bgColor: '#6366f1', darkBg: '#3730a3', lightBg: '#4338ca', accent: '#818cf8' },
  purple:  { bgColor: '#a855f7', darkBg: '#581c87', lightBg: '#6b21a8', accent: '#c084fc' },
  amber:   { bgColor: '#f59e0b', darkBg: '#92400e', lightBg: '#b45309', accent: '#fbbf24' },
  pink:    { bgColor: '#ec4899', darkBg: '#831843', lightBg: '#9d174d', accent: '#f472b6' },
  // Blues & Cyans
  blue:    { bgColor: '#3b82f6', darkBg: '#1e3a8a', lightBg: '#1d4ed8', accent: '#60a5fa' },
  cyan:    { bgColor: '#06b6d4', darkBg: '#164e63', lightBg: '#0e7490', accent: '#22d3ee' },
  teal:    { bgColor: '#14b8a6', darkBg: '#134e4a', lightBg: '#0f766e', accent: '#2dd4bf' },
  // Greens & Yellows  
  green:   { bgColor: '#22c55e', darkBg: '#14532d', lightBg: '#166534', accent: '#4ade80' },
  lime:    { bgColor: '#84cc16', darkBg: '#365314', lightBg: '#3f6212', accent: '#a3e635' },
  yellow:  { bgColor: '#eab308', darkBg: '#713f12', lightBg: '#854d0e', accent: '#facc15' },
  orange:  { bgColor: '#f97316', darkBg: '#9a3412', lightBg: '#c2410c', accent: '#fb923c' },
  // Pinks & Purples
  rose:    { bgColor: '#f43f5e', darkBg: '#881337', lightBg: '#9f1239', accent: '#fb7185' },
  fuchsia: { bgColor: '#d946ef', darkBg: '#701a75', lightBg: '#86198f', accent: '#e879f9' },
  violet:  { bgColor: '#8b5cf6', darkBg: '#4c1d95', lightBg: '#5b21b6', accent: '#a78bfa' },
  // Grays & Neutrals
  slate:   { bgColor: '#64748b', darkBg: '#1e293b', lightBg: '#334155', accent: '#94a3b8' },
  gray:    { bgColor: '#6b7280', darkBg: '#1f2937', lightBg: '#374151', accent: '#9ca3af' },
  zinc:    { bgColor: '#71717a', darkBg: '#18181b', lightBg: '#27272a', accent: '#a1a1aa' },
  neutral: { bgColor: '#737373', darkBg: '#171717', lightBg: '#262626', accent: '#a3a3a3' },
  stone:   { bgColor: '#78716c', darkBg: '#1c1917', lightBg: '#292524', accent: '#a8a29e' },
  // Lighter variants
  'sky-400':     { bgColor: '#38bdf8', darkBg: '#1e3c72', lightBg: '#2563eb', accent: '#60a5fa' },
  'blue-400':    { bgColor: '#60a5fa', darkBg: '#1e3a8a', lightBg: '#2563eb', accent: '#93c5fd' },
  'indigo-400':  { bgColor: '#818cf8', darkBg: '#3730a3', lightBg: '#4f46e5', accent: '#a5b4fc' },
  'purple-400':  { bgColor: '#c084fc', darkBg: '#581c87', lightBg: '#7c3aed', accent: '#d8b4fe' },
  'pink-400':    { bgColor: '#f472b6', darkBg: '#831843', lightBg: '#be185d', accent: '#f9a8d4' },
  'rose-400':    { bgColor: '#fb7185', darkBg: '#881337', lightBg: '#be123c', accent: '#fda4af' },
  'red-400':     { bgColor: '#f87171', darkBg: '#7f1d1d', lightBg: '#b91c1c', accent: '#fca5a5' },
  'orange-400':  { bgColor: '#fb923c', darkBg: '#9a3412', lightBg: '#c2410c', accent: '#fdba74' },
  'amber-400':   { bgColor: '#fbbf24', darkBg: '#92400e', lightBg: '#d97706', accent: '#fcd34d' },
  'yellow-400':  { bgColor: '#facc15', darkBg: '#713f12', lightBg: '#ca8a04', accent: '#fde047' },
  'lime-400':    { bgColor: '#a3e635', darkBg: '#365314', lightBg: '#65a30d', accent: '#bef264' },
  'green-400':   { bgColor: '#4ade80', darkBg: '#14532d', lightBg: '#15803d', accent: '#86efac' },
  'emerald-400': { bgColor: '#34d399', darkBg: '#064e3b', lightBg: '#059669', accent: '#6ee7b7' },
  'teal-400':    { bgColor: '#2dd4bf', darkBg: '#134e4a', lightBg: '#0d9488', accent: '#5eead4' },
  'cyan-400':    { bgColor: '#22d3ee', darkBg: '#164e63', lightBg: '#0891b2', accent: '#67e8f9' },
  // New diverse colors - Deep & Rich
  burgundy:      { bgColor: '#800020', darkBg: '#4a0012', lightBg: '#660019', accent: '#cc0033' },
  navy:          { bgColor: '#000080', darkBg: '#000040', lightBg: '#000060', accent: '#4040ff' },
  forest:        { bgColor: '#228B22', darkBg: '#0f4a0f', lightBg: '#1a6b1a', accent: '#4CAF50' },
  maroon:        { bgColor: '#800000', darkBg: '#4a0000', lightBg: '#660000', accent: '#cc3333' },
  crimson:       { bgColor: '#DC143C', darkBg: '#8b0c23', lightBg: '#b01030', accent: '#ff4569' },
  mahogany:      { bgColor: '#C04000', darkBg: '#732600', lightBg: '#993300', accent: '#ff6600' },
  // Vibrant colors
  coral:         { bgColor: '#FF7F50', darkBg: '#cc4c20', lightBg: '#e6633a', accent: '#ff9f7f' },
  turquoise:     { bgColor: '#40E0D0', darkBg: '#1a6b63', lightBg: '#2d9b92', accent: '#7fffd4' },
  magenta:       { bgColor: '#FF00FF', darkBg: '#990099', lightBg: '#cc00cc', accent: '#ff66ff' },
  chartreuse:    { bgColor: '#7FFF00', darkBg: '#4a9900', lightBg: '#66cc00', accent: '#99ff33' },
  vermillion:    { bgColor: '#E34234', darkBg: '#8a221a', lightBg: '#b52d26', accent: '#ff6b5a' },
  // Unique tones
  bronze:        { bgColor: '#CD7F32', darkBg: '#7a4c1e', lightBg: '#a66327', accent: '#e6a857' },
  copper:        { bgColor: '#B87333', darkBg: '#6e451f', lightBg: '#945c29', accent: '#d18c4d' },
  seagreen:      { bgColor: '#2E8B57', darkBg: '#1a5234', lightBg: '#236b45', accent: '#5ac57a' },
  royalblue:     { bgColor: '#4169E1', darkBg: '#274087', lightBg: '#3456b4', accent: '#6b8bf5' },
  darkviolet:    { bgColor: '#9400D3', darkBg: '#58007e', lightBg: '#7600a8', accent: '#c433ff' },
  steelblue:     { bgColor: '#4682B4', darkBg: '#2a4e6c', lightBg: '#386890', accent: '#70a5d4' },
  // Modern colors
  mint:          { bgColor: '#00FF7F', darkBg: '#009950', lightBg: '#00cc66', accent: '#66ff9f' },
  peach:         { bgColor: '#FFCBA4', darkBg: '#cc9974', lightBg: '#e6b58a', accent: '#ffd9bf' },
  lavender:      { bgColor: '#967BB6', darkBg: '#5a4a6e', lightBg: '#7b6292', accent: '#c2a6e6' },
  salmon:        { bgColor: '#FA8072', darkBg: '#c84c45', lightBg: '#e7665a', accent: '#ffb3aa' },
  gold:          { bgColor: '#FFD700', darkBg: '#ccab00', lightBg: '#e6c200', accent: '#ffeb66' },
  // Additional rich colors
  plum:          { bgColor: '#8B008B', darkBg: '#520052', lightBg: '#700070', accent: '#cc33cc' },
  olive:         { bgColor: '#6B8E23', darkBg: '#405515', lightBg: '#56711c', accent: '#9bc53d' },
  chocolate:     { bgColor: '#D2691E', darkBg: '#7e3f12', lightBg: '#a85418', accent: '#ffa64d' },
  firebrick:     { bgColor: '#B22222', darkBg: '#6b1515', lightBg: '#8f1b1b', accent: '#e55555' },
  darkcyan:      { bgColor: '#008B8B', darkBg: '#005252', lightBg: '#007070', accent: '#33cccc' }
};

export function getProjectColor(categoryId: string, projectId: string) {
  const category = projectData[categoryId];
  if (!category) return null;
  
  const project = category.projects.find(p => p.id === projectId);
  if (!project?.color) return null;
  
  return colorMap[project.color];
}

export function getCategoryColor(categoryId: string) {
  const category = projectData[categoryId];
  if (!category) return null;
  
  return colorMap[category.color];
}