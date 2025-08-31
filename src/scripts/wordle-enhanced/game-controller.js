// GameController for Wordle Enhanced
// Encapsulates all game state and logic

import { 
    TILE_STATE, 
    GAME_CONFIG, 
    CSS_CLASSES, 
    GAME_MESSAGES, 
    DEFAULT_STATS, 
    KEYBOARD_LAYOUTS,
    ELEMENT_IDS,
    DATA_ATTRIBUTES,
    CSS_CUSTOM_PROPERTIES
} from './game-constants.js';

export class GameController {
    constructor(domHelper, animationController) {
        this.domHelper = domHelper;
        this.animationController = animationController;
        
        // Game state
        this.currentGame = null;
        this.gameStats = null;
        this.wordDict = [];
        
        // Input state
        this.inputEnabled = false;
        
        // Bind methods to preserve 'this' context
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.submitGuess = this.submitGuess.bind(this);
        this.removeLetter = this.removeLetter.bind(this);
    }

    /**
     * Initialize the game controller
     */
    async initialize() {
        try {
            await this.loadDictionary();
            this.gameStats = this.loadStats();
            this.currentGame = this.loadGameState();
            
            // Set default game configuration
            this.setWordLength(GAME_CONFIG.DEFAULT_COLS);
            this.setRows(GAME_CONFIG.DEFAULT_ROWS);
            
            if (this.currentGame && !this.currentGame.completed) {
                this.updateGameDimensions(this.currentGame.rows, this.currentGame.cols);
                this.createGame();
                this.restoreGameState();
            } else {
                this.newGame();
            }
            
            return true;
        } catch (error) {
            console.error('Failed to initialize game:', error);
            alert(GAME_MESSAGES.DICTIONARY_LOAD_ERROR);
            throw error;
        }
    }

    /**
     * Load word dictionary from server
     */
    async loadDictionary() {
        try {
            const response = await fetch('/scripts/wordle-enhanced/english-mixed-lengths.txt');
            if (!response.ok) {
                throw new Error(`Failed to load dictionary: ${response.status}`);
            }
            const text = await response.text();
            this.wordDict = text.trim().split('\n')
                .map(word => word.trim().toLowerCase())
                .filter(word => word.length > 0);
            
            console.log(`Loaded ${this.wordDict.length} words from dictionary`);
            return this.wordDict;
        } catch (error) {
            console.error('Error loading dictionary:', error);
            // Fallback to basic words
            this.wordDict = ['hello', 'world', 'games', 'words', 'plays'];
            return this.wordDict;
        }
    }

    /**
     * Create a new game
     */
    newGame() {
        const cols = this.getCols();
        const rows = this.getRows();
        
        if (this.wordDict.length === 0) {
            console.error('Dictionary not loaded yet');
            return false;
        }
        
        // Generate random word of correct length
        const wordsOfLength = this.wordDict.filter(word => word.length === cols);
        if (wordsOfLength.length === 0) {
            console.error(`No words of length ${cols} found in dictionary`);
            alert(GAME_MESSAGES.NO_WORDS_AVAILABLE(cols));
            return false;
        }
        
        const word = wordsOfLength[Math.floor(Math.random() * wordsOfLength.length)];
        
        this.currentGame = {
            word: word,
            guesses: [],
            rows: rows,
            cols: cols,
            completed: false
        };
        
        this.createGame();
        this.saveGameState();
        return true;
    }

    /**
     * Create/recreate the game UI
     */
    createGame() {
        const rows = this.getRows();
        const cols = this.getCols();
        
        this.updateGameDimensions(rows, cols);
        this.createRows(rows, cols);
        this.createKeyboard();
        this.enableInput();
    }

    /**
     * Create game board rows and boxes
     */
    createRows(rows, cols) {
        const boxesContainer = this.domHelper.getElementById(ELEMENT_IDS.BOXES);
        if (!boxesContainer) return;
        
        this.domHelper.clearElement(boxesContainer);
        
        for (let i = 0; i < rows; i++) {
            const row = this.domHelper.createGameRow();
            
            for (let j = 0; j < cols; j++) {
                const box = this.domHelper.createBox();
                row.appendChild(box);
            }
            
            boxesContainer.appendChild(row);
        }
    }

    /**
     * Create virtual keyboard
     */
    createKeyboard() {
        const keyboardContainer = this.domHelper.getElementById(ELEMENT_IDS.KEYBOARD);
        if (!keyboardContainer) return;
        
        this.domHelper.clearElement(keyboardContainer);
        
        const layout = KEYBOARD_LAYOUTS.QWERTY;
        
        // First row (no spacers, no functions)
        this.createKeyboardRow(layout[0], false, false);
        
        // Second row (with spacers, no functions)
        this.createKeyboardRow(layout[1], true, false);
        
        // Third row (no spacers, with functions)
        this.createKeyboardRow(layout[2], false, true);
    }

    /**
     * Create a keyboard row
     * @param {string} letters - Letters for this row
     * @param {boolean} hasSpacers - Whether to add spacers
     * @param {boolean} hasFunctions - Whether to add Enter/Back keys
     */
    createKeyboardRow(letters, hasSpacers, hasFunctions) {
        const keyboardContainer = this.domHelper.getElementById(ELEMENT_IDS.KEYBOARD);
        const row = this.domHelper.createKeyboardRow(hasSpacers);
        
        if (hasSpacers) {
            const leftSpacer = this.domHelper.createSpacer();
            row.appendChild(leftSpacer);
        }
        
        if (hasFunctions) {
            const enterKey = this.domHelper.createEnterKey();
            enterKey.addEventListener('click', this.submitGuess);
            row.appendChild(enterKey);
        }
        
        for (const letter of letters) {
            const key = this.domHelper.createKey(letter);
            key.addEventListener('click', () => this.addLetter(letter));
            row.appendChild(key);
        }
        
        if (hasFunctions) {
            const backKey = this.domHelper.createBackspaceKey();
            backKey.addEventListener('click', this.removeLetter);
            row.appendChild(backKey);
        }
        
        if (hasSpacers) {
            const rightSpacer = this.domHelper.createSpacer();
            row.appendChild(rightSpacer);
        }
        
        keyboardContainer.appendChild(row);
    }

    /**
     * Add a letter to the current guess
     */
    addLetter(letter) {
        if (typeof letter !== 'string') {
            letter = letter.getAttribute(DATA_ATTRIBUTES.KEY);
        }
        
        const filled = document.querySelectorAll('.filled');
        const final = document.querySelectorAll('.final');
        
        if (filled.length - final.length < this.getCols()) {
            const boxes = document.querySelectorAll('.box');
            const targetBox = boxes[filled.length];
            targetBox.textContent = letter.toUpperCase();
            this.domHelper.addClasses(targetBox, TILE_STATE.FILLED);
            
            // Optional: animate letter entry
            this.animationController.animateLetterEntry(targetBox);
        }
    }

    /**
     * Remove the last letter from current guess
     */
    removeLetter() {
        const filled = document.querySelectorAll('.filled');
        const final = document.querySelectorAll('.final');
        
        if (filled.length > final.length) {
            const lastFilled = filled[filled.length - 1];
            lastFilled.textContent = '';
            this.domHelper.removeClasses(lastFilled, TILE_STATE.FILLED);
        }
    }

    /**
     * Get current guess as string
     */
    getGuess() {
        const filled = document.querySelectorAll('.filled');
        const final = document.querySelectorAll('.final');
        
        let guess = '';
        for (let i = final.length; i < filled.length; i++) {
            guess += filled[i].textContent;
        }
        return guess.toLowerCase();
    }

    /**
     * Submit current guess
     */
    async submitGuess() {
        const filled = document.querySelectorAll('.filled');
        const final = document.querySelectorAll('.final');
        
        if (filled.length - final.length === this.getCols()) {
            const guess = this.getGuess();
            
            // Check dictionary
            if (this.wordDict.length === 0) {
                alert(GAME_MESSAGES.DICTIONARY_NOT_LOADED);
                return;
            }
            
            if (!this.wordDict.includes(guess)) {
                alert(GAME_MESSAGES.INVALID_WORD);
                // Optional: animate shake
                await this.animationController.animateShake();
                return;
            }

            // Process the guess
            const responseData = this.processGuess(guess);
            
            // Disable input during animations
            this.disableInput();
            
            // Animate the response
            await this.animationController.animateGuessResponse(responseData);
            
            // Re-enable input if game continues
            if (!responseData.over) {
                this.enableInput();
            }
        }
    }

    /**
     * Process a guess and return response data
     */
    processGuess(guess) {
        if (!this.currentGame || !this.currentGame.word) {
            return { bad: true };
        }
        
        const word = this.currentGame.word;
        const cols = this.getCols();
        
        let grey = [];
        let orange = [];
        let green = [];
        
        // Faithful Wordle algorithm
        const letterCounts = {};
        for (const char of word) {
            letterCounts[char] = (letterCounts[char] || 0) + 1;
        }
        
        // First pass: mark exact matches
        const tempLetterCounts = { ...letterCounts };
        for (let i = 0; i < cols; i++) {
            if (word[i] === guess[i]) {
                green.push(i);
                tempLetterCounts[guess[i]]--;
            }
        }
        
        // Second pass: mark partial matches
        for (let i = 0; i < cols; i++) {
            if (word[i] !== guess[i]) {
                if (tempLetterCounts[guess[i]] > 0) {
                    orange.push(i);
                    tempLetterCounts[guess[i]]--;
                } else {
                    grey.push(i);
                }
            }
        }
        
        // Save guess to game state
        if (!this.currentGame.guesses) {
            this.currentGame.guesses = [];
        }
        
        this.currentGame.guesses.push({
            word: guess,
            result: { grey, orange, green }
        });
        
        const guessCount = this.currentGame.guesses.length;
        const gameOver = guess === word || guessCount >= this.getRows();
        const won = guess === word;
        
        const responseData = {
            grey,
            orange, 
            green,
            over: gameOver ? (won ? 'win' : 'loss') : false,
            guesses: guessCount,
            word: word,
            score: won ? (this.getRows() - guessCount + 1) * GAME_CONFIG.POINTS_PER_REMAINING_GUESS : 0
        };
        
        if (gameOver) {
            this.currentGame.completed = true;
            this.updateStats(won);
        }
        
        this.saveGameState();
        return responseData;
    }

    /**
     * Restore game state from saved game
     */
    restoreGameState() {
        if (!this.currentGame || !this.currentGame.guesses) return;
        
        const boxes = document.querySelectorAll('.box');
        let boxIndex = 0;
        
        // Restore each previous guess
        for (const guessData of this.currentGame.guesses) {
            const guess = guessData.word;
            const result = guessData.result;
            
            // Fill boxes with letters and apply colors
            for (let i = 0; i < guess.length; i++) {
                const box = boxes[boxIndex];
                box.textContent = guess[i].toUpperCase();
                this.domHelper.addClasses(box, TILE_STATE.FILLED, TILE_STATE.FINAL);
                
                // Apply result colors
                if (result.green.includes(i)) {
                    this.domHelper.addClasses(box, TILE_STATE.CORRECT);
                } else if (result.orange.includes(i)) {
                    this.domHelper.addClasses(box, TILE_STATE.PRESENT);
                } else if (result.grey.includes(i)) {
                    this.domHelper.addClasses(box, TILE_STATE.ABSENT);
                }
                
                boxIndex++;
            }
        }
        
        // Update keyboard colors
        this.animationController.updateKeyboard();
        
        // Disable input if game is completed
        if (this.currentGame.completed) {
            this.disableInput();
        }
    }

    /**
     * Enable user input
     */
    enableInput() {
        if (!this.inputEnabled) {
            document.addEventListener('keyup', this.handleKeyPress);
            this.inputEnabled = true;
        }
    }

    /**
     * Disable user input
     */
    disableInput() {
        if (this.inputEnabled) {
            document.removeEventListener('keyup', this.handleKeyPress);
            this.inputEnabled = false;
        }
    }

    /**
     * Handle keyboard input
     */
    handleKeyPress(event) {
        if (event.code === 'Enter') {
            this.submitGuess();
        } else if (event.code === 'Backspace') {
            this.removeLetter();
        } else if (event.key.toLowerCase().match(/^[a-z]$/)) {
            this.addLetter(event.key.toUpperCase());
        }
    }

    /**
     * Get hint for current game
     */
    getHint() {
        if (this.currentGame && this.currentGame.word) {
            const word = this.currentGame.word;
            const randomIndex = Math.floor(Math.random() * word.length);
            return GAME_MESSAGES.HINT(randomIndex, word[randomIndex]);
        } else {
            return GAME_MESSAGES.START_GAME_FIRST;
        }
    }

    /**
     * Get formatted stats string
     */
    getStatsString() {
        return GAME_MESSAGES.STATS(this.gameStats || DEFAULT_STATS);
    }

    /**
     * Set word length and update CSS
     */
    setWordLength(length) {
        this.domHelper.setCSSProperty(CSS_CUSTOM_PROPERTIES.COLS, length);
    }

    /**
     * Set number of rows and update CSS
     */
    setRows(rows) {
        this.domHelper.setCSSProperty(CSS_CUSTOM_PROPERTIES.ROWS, rows);
    }

    /**
     * Get current number of columns
     */
    getCols() {
        return parseInt(this.domHelper.getCSSProperty(CSS_CUSTOM_PROPERTIES.COLS)) || GAME_CONFIG.DEFAULT_COLS;
    }

    /**
     * Get current number of rows
     */
    getRows() {
        return parseInt(this.domHelper.getCSSProperty(CSS_CUSTOM_PROPERTIES.ROWS)) || GAME_CONFIG.DEFAULT_ROWS;
    }

    /**
     * Update game dimensions
     */
    updateGameDimensions(rows, cols) {
        this.setRows(rows);
        this.setWordLength(cols);
    }

    /**
     * Check if words of given length are available
     */
    hasWordsOfLength(length) {
        return this.wordDict.some(word => word.length === length);
    }

    /**
     * Save current game state to localStorage
     */
    saveGameState() {
        if (this.currentGame) {
            localStorage.setItem(GAME_CONFIG.STORAGE_KEY_GAME, JSON.stringify(this.currentGame));
        }
    }

    /**
     * Load game state from localStorage
     */
    loadGameState() {
        const saved = localStorage.getItem(GAME_CONFIG.STORAGE_KEY_GAME);
        return saved ? JSON.parse(saved) : null;
    }

    /**
     * Update game statistics
     */
    updateStats(won) {
        let stats = JSON.parse(localStorage.getItem(GAME_CONFIG.STORAGE_KEY_STATS) || JSON.stringify(DEFAULT_STATS));
        
        stats.played++;
        if (won) {
            stats.won++;
            stats.streak++;
            stats.maxStreak = Math.max(stats.maxStreak, stats.streak);
        } else {
            stats.streak = 0;
        }
        
        localStorage.setItem(GAME_CONFIG.STORAGE_KEY_STATS, JSON.stringify(stats));
        this.gameStats = stats;
    }

    /**
     * Load game statistics
     */
    loadStats() {
        const stats = localStorage.getItem(GAME_CONFIG.STORAGE_KEY_STATS);
        return stats ? JSON.parse(stats) : { ...DEFAULT_STATS };
    }

    /**
     * Reset game state (for debugging)
     */
    resetGame() {
        localStorage.removeItem(GAME_CONFIG.STORAGE_KEY_GAME);
        this.currentGame = null;
    }

    /**
     * Reset statistics (for debugging)
     */
    resetStats() {
        localStorage.removeItem(GAME_CONFIG.STORAGE_KEY_STATS);
        this.gameStats = { ...DEFAULT_STATS };
    }
}