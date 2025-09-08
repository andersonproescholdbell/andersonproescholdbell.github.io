// Animation Controller for Wordle Enhanced
// Handles Promise-based animations replacing brittle setTimeout chains

import { TILE_STATE, GAME_CONFIG } from '/scripts/akordle/game-constants.js';

export class AnimationController {
    constructor(domHelper) {
        this.domHelper = domHelper;
    }

    /**
     * Creates a delay promise
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise} Promise that resolves after delay
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Animates tile flips with sequential timing
     * @param {Object} result - Guess result with grey, orange, green arrays
     * @returns {Promise} Promise that resolves when all animations complete
     */
    async animateTileFlips(result) {
        const { grey, orange, green } = result;
        const total = grey.length + orange.length + green.length;
        
        // Sequential tile animations
        for (let i = 0; i < total; i++) {
            let tileState;
            
            if (grey.includes(i)) {
                tileState = TILE_STATE.ABSENT;
            } else if (orange.includes(i)) {
                tileState = TILE_STATE.PRESENT;
            } else if (green.includes(i)) {
                tileState = TILE_STATE.CORRECT;
            }
            
            this.updateTile(tileState);
            
            // Wait for animation delay before next tile
            if (i < total - 1) {
                await this.delay(GAME_CONFIG.TILE_FLIP_DELAY);
            }
        }
        
        // Small delay to ensure last tile animation starts
        await this.delay(GAME_CONFIG.TILE_FLIP_DURATION);
        
        return true;
    }

    /**
     * Updates a single tile with the given state
     * @param {string} state - Tile state (TILE_STATE constant)
     */
    updateTile(state) {
        const filled = document.querySelectorAll('.filled');
        const final = document.querySelectorAll('.final');
        
        if (filled.length > final.length) {
            const tile = filled[final.length];
            this.domHelper.addClasses(tile, state, TILE_STATE.FINAL);
        }
    }

    /**
     * Animates keyboard color updates
     * @returns {Promise} Promise that resolves when keyboard is updated
     */
    async animateKeyboardUpdate() {
        // Wait a bit to ensure tiles are done animating
        await this.delay(GAME_CONFIG.KEYBOARD_UPDATE_DELAY);
        
        this.updateKeyboard();
        return true;
    }

    /**
     * Updates keyboard colors based on tile states with proper hierarchy
     */
    updateKeyboard() {
        // Process all tiles and collect keyboard state information
        const keyboardStates = new Map();
        
        // Collect all tile states for each letter
        const tiles = document.querySelectorAll('.box.final');
        console.log(`🎹 Updating keyboard based on ${tiles.length} final tiles`);
        
        for (const tile of tiles) {
            const letter = tile.textContent.toUpperCase();
            if (!letter) continue;
            
            let state = null;
            if (this.domHelper.hasClass(tile, TILE_STATE.CORRECT)) {
                state = 'correct';
            } else if (this.domHelper.hasClass(tile, TILE_STATE.PRESENT)) {
                state = 'present';
            } else if (this.domHelper.hasClass(tile, TILE_STATE.ABSENT)) {
                state = 'absent';
            }
            
            if (state) {
                this.updateKeyboardState(keyboardStates, letter, state);
            }
        }
        
        // Apply states to keyboard keys
        for (const [letter, state] of keyboardStates) {
            // Keys are created with UPPERCASE data-key attributes
            const key = document.querySelector(`[data-key="${letter.toUpperCase()}"]`);
            
            if (key) {
                this.applyKeyboardState(key, state);
            } else {
                console.warn(`❌ Key not found for letter "${letter}"`);
            }
        }
    }
    
    /**
     * Updates keyboard state map with hierarchy enforcement
     * @param {Map} stateMap - Map of letter to keyboard state
     * @param {string} letter - Letter to update
     * @param {string} newState - New state to apply
     */
    updateKeyboardState(stateMap, letter, newState) {
        const currentState = stateMap.get(letter);
        
        // Hierarchy: correct > present > absent
        if (!currentState || 
            (newState === 'correct') ||
            (newState === 'present' && currentState !== 'correct')) {
            stateMap.set(letter, newState);
        }
    }
    
    /**
     * Applies keyboard state to a key element
     * @param {HTMLElement} key - Key element
     * @param {string} state - State to apply ('correct', 'present', 'absent')
     */
    applyKeyboardState(key, state) {
        // Remove all keyboard state classes
        this.domHelper.removeClasses(key, TILE_STATE.CORRECT, TILE_STATE.PRESENT, TILE_STATE.ABSENT);
        
        // Apply the appropriate state class
        if (state === 'correct') {
            this.domHelper.addClasses(key, TILE_STATE.CORRECT);
            console.log(`🟢 Key "${key.textContent}" -> GREEN`);
        } else if (state === 'present') {
            this.domHelper.addClasses(key, TILE_STATE.PRESENT);
            console.log(`🟡 Key "${key.textContent}" -> ORANGE`);
        } else if (state === 'absent') {
            this.domHelper.addClasses(key, TILE_STATE.ABSENT);
            console.log(`⚫ Key "${key.textContent}" -> GREY`);
        }
    }

    /**
     * Animates the win panel appearance
     * @param {Object} gameData - Game result data
     * @returns {Promise} Promise that resolves when panel is shown
     */
    async animateWinPanel(gameData) {
        const totalTiles = gameData.grey.length + gameData.orange.length + gameData.green.length;
        const delay = (totalTiles + 2) * GAME_CONFIG.TILE_FLIP_DELAY;
        
        await this.delay(delay);
        
        this.showWinPanel(gameData);
        return true;
    }

    /**
     * Shows the win panel with game results
     * @param {Object} gameData - Game result data
     */
    showWinPanel(gameData) {
        const winPanelText = this.domHelper.getElementById('winPanelText');
        const winPanelWord = this.domHelper.getElementById('winPanelWord');
        const winPanelScore = this.domHelper.getElementById('winPanelScore');
        const winPanel = this.domHelper.getElementById('winPanel');
        
        if (winPanelText && winPanelWord && winPanelScore && winPanel) {
            if (gameData.over === 'win') {
                this.domHelper.setText(winPanelText, `You WON in ${gameData.guesses} guesses`);
                winPanelText.style.color = 'green';
            } else {
                this.domHelper.setText(winPanelText, `You LOST in ${gameData.guesses} guesses`);
                winPanelText.style.color = 'red';
            }

            this.domHelper.setText(winPanelWord, `Correct word: ${gameData.word}`);
            this.domHelper.setText(winPanelScore, `Score: ${gameData.score}`);

            winPanel.style.display = 'flex';
        }
    }

    /**
     * Animates a complete guess response sequence
     * @param {Object} responseData - Complete response data from guess processing
     * @returns {Promise} Promise that resolves when all animations complete
     */
    async animateGuessResponse(responseData) {
        if (responseData.bad) {
            // No animation needed for bad guesses
            return false;
        }

        // Start tile flip animations
        await this.animateTileFlips(responseData);
        
        // Update keyboard in parallel with potential win panel
        const keyboardPromise = this.animateKeyboardUpdate();
        
        // Show win panel if game is over
        const winPanelPromise = responseData.over ? 
            this.animateWinPanel(responseData) : 
            Promise.resolve();
        
        // Wait for both keyboard update and potential win panel
        await Promise.all([keyboardPromise, winPanelPromise]);
        
        return true;
    }

    /**
     * Animates tile shake for invalid words (optional enhancement)
     * @param {number} rowIndex - Index of row to shake
     * @returns {Promise} Promise that resolves when shake completes
     */
    async animateShake(rowIndex = null) {
        // Get current row tiles
        const filled = document.querySelectorAll('.filled');
        const final = document.querySelectorAll('.final');
        const currentRowStart = final.length;
        const cols = parseInt(this.domHelper.getCSSProperty('--cols')) || 5;
        
        const tilesToShake = [];
        for (let i = 0; i < cols && (currentRowStart + i) < filled.length; i++) {
            tilesToShake.push(filled[currentRowStart + i]);
        }
        
        // Add shake animation class (would need corresponding CSS)
        tilesToShake.forEach(tile => {
            tile.style.animation = 'shake 0.5s ease-in-out';
        });
        
        // Remove animation after completion
        await this.delay(500);
        tilesToShake.forEach(tile => {
            tile.style.animation = '';
        });
        
        return true;
    }

    /**
     * Animates letter typing (subtle bounce effect)
     * @param {HTMLElement} tile - Tile element that was just filled
     * @returns {Promise} Promise that resolves when animation completes
     */
    async animateLetterEntry(tile) {
        // Add a subtle scale animation
        tile.style.transform = 'scale(1.1)';
        tile.style.transition = 'transform 0.1s ease-out';
        
        await this.delay(100);
        
        tile.style.transform = 'scale(1)';
        
        await this.delay(100);
        
        // Clean up
        tile.style.transform = '';
        tile.style.transition = '';
        
        return true;
    }
}