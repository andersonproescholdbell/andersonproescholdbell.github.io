// Game Constants for Wordle Enhanced
// Centralizes all magic strings, numbers, and configuration values

export const TILE_STATE = {
    CORRECT: 'green',
    PRESENT: 'orange', 
    ABSENT: 'grey',
    FILLED: 'filled',
    FINAL: 'final'
};

export const KEY_STATE = {
    CORRECT: 'green',
    PRESENT: 'orange',
    ABSENT: 'grey'
};

export const GAME_CONFIG = {
    DEFAULT_ROWS: 6,
    DEFAULT_COLS: 5,
    MIN_WORD_LENGTH: 3,
    MAX_WORD_LENGTH: 8,
    
    // Animation timing (in milliseconds)
    TILE_FLIP_DELAY: 300,
    TILE_FLIP_DURATION: 150, // Should match CSS transition duration
    KEYBOARD_UPDATE_DELAY: 301, // Slightly longer than tile flip to ensure completion
    WIN_PANEL_DELAY: 600, // (total tiles + buffer) * TILE_FLIP_DELAY
    
    // Scoring
    POINTS_PER_REMAINING_GUESS: 100,
    
    // Storage keys
    STORAGE_KEY_GAME: 'enhanced-wordle-game',
    STORAGE_KEY_STATS: 'enhanced-wordle-stats'
};

export const CSS_CLASSES = {
    // Layout classes
    ROW: 'row',
    FLEX_1: 'flex-1',
    FLEX_1_5: 'flex-1-5',
    SPACER: 'spacer',
    
    // Component classes
    BOX: 'box',
    KEY: 'key',
    KEYBOARD: 'keyboard',
    
    // State classes
    SHOW: 'show',
    
    // Utility classes
    D_FLEX: 'd-flex',
    FLEX_ROW: 'flex-row',
    M_2: 'm-2',
    TEXT_CENTER: 'text-center',
    MB_0: 'mb-0'
};

export const GAME_MESSAGES = {
    DICTIONARY_NOT_LOADED: 'Dictionary not loaded. Please wait or refresh the page.',
    INVALID_WORD: 'This word does not exist in the dictionary',
    NO_WORDS_AVAILABLE: (length) => `No words of length ${length} available. Try a different word length.`,
    DICTIONARY_LOAD_ERROR: 'Error loading game. Please refresh the page.',
    START_GAME_FIRST: 'Start a game first to get a hint!',
    
    WIN_TEXT: (guesses) => `You WON in ${guesses} guesses`,
    LOSS_TEXT: (guesses) => `You LOST in ${guesses} guesses`,
    CORRECT_WORD: (word) => `Correct word: ${word}`,
    SCORE: (score) => `Score: ${score}`,
    HINT: (position, letter) => `Hint: The letter at position ${position + 1} is '${letter.toUpperCase()}'`,
    
    STATS: (stats) => {
        const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;
        return `Games Played: ${stats.played}\nWin Rate: ${winRate}%\nCurrent Streak: ${stats.streak}\nMax Streak: ${stats.maxStreak}`;
    }
};

export const DEFAULT_STATS = {
    played: 0,
    won: 0,
    streak: 0,
    maxStreak: 0
};

export const KEYBOARD_LAYOUTS = {
    QWERTY: [
        'QWERTYUIOP',
        'ASDFGHJKL', 
        'ZXCVBNM'
    ]
};

export const ELEMENT_IDS = {
    MAIN: 'main',
    BOXES: 'boxes',
    BOXES_CON: 'boxes-con',
    KEYBOARD: 'keyboard',
    WIN_PANEL: 'winPanel',
    WIN_PANEL_TEXT: 'winPanelText',
    WIN_PANEL_WORD: 'winPanelWord',
    WIN_PANEL_SCORE: 'winPanelScore',
    PANEL: 'panel',
    RANGE: 'range',
    RANGE_LENGTH: 'rangeLength',
    NEW_GAME: 'newGame',
    NEW_GAME_2: 'newGame2',
    HIDE_WIN_PANEL: 'hideWinPanel',
    SETTINGS: 'settings',
    STATS: 'stats',
    HINT: 'hint'
};

export const DATA_ATTRIBUTES = {
    KEY: 'data-key',
    FUNC: 'data-func',
    ENTER: 'enter',
    BACK: 'back'
};

export const CSS_CUSTOM_PROPERTIES = {
    ROWS: '--rows',
    COLS: '--cols'
};