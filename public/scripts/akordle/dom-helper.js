// DOM Helper Utility for Wordle Enhanced
// Centralizes DOM creation and scoped CSS attribute handling

import { CSS_CLASSES, ELEMENT_IDS, DATA_ATTRIBUTES } from '/scripts/akordle/game-constants.js';

export class DOMHelper {
    constructor() {
        this.scopedAttribute = null;
        this._detectScopedAttribute();
    }

    /**
     * Auto-detects the Astro scoped CSS attribute from existing elements
     */
    _detectScopedAttribute() {
        // Try to find the scoped attribute from common elements
        const testElements = [
            document.getElementById(ELEMENT_IDS.BOXES),
            document.getElementById(ELEMENT_IDS.KEYBOARD),
            document.getElementById(ELEMENT_IDS.MAIN)
        ];

        for (const element of testElements) {
            if (element) {
                // Look for data-astro-cid-* attributes
                const attributes = element.attributes;
                for (let i = 0; i < attributes.length; i++) {
                    const attr = attributes[i];
                    if (attr.name.startsWith('data-astro-cid-')) {
                        this.scopedAttribute = attr.name;
                        return;
                    }
                }
            }
        }
    }

    /**
     * Creates an element with automatic scoped CSS attribute application
     * @param {string} tagName - HTML tag name
     * @param {Object} options - Element configuration
     * @param {string} options.className - CSS class name(s)
     * @param {string} options.textContent - Text content
     * @param {string} options.innerHTML - HTML content
     * @param {Object} options.attributes - Additional attributes
     * @returns {HTMLElement} The created element
     */
    createElement(tagName, options = {}) {
        const element = document.createElement(tagName);

        // Apply CSS class
        if (options.className) {
            element.className = options.className;
        }

        // Apply text content
        if (options.textContent) {
            element.textContent = options.textContent;
        }

        // Apply innerHTML (use with caution)
        if (options.innerHTML) {
            element.innerHTML = options.innerHTML;
        }

        // Apply additional attributes
        if (options.attributes) {
            Object.entries(options.attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }

        // Apply scoped CSS attribute
        if (this.scopedAttribute) {
            element.setAttribute(this.scopedAttribute, '');
        }

        return element;
    }

    /**
     * Creates a game box element
     * @returns {HTMLElement} Box element
     */
    createBox() {
        return this.createElement('div', {
            className: CSS_CLASSES.BOX
        });
    }

    /**
     * Creates a keyboard key element
     * @param {string} letter - The letter for the key
     * @param {Object} options - Additional options
     * @returns {HTMLElement} Key element
     */
    createKey(letter, options = {}) {
        const className = options.isSpecial ? 
            `${CSS_CLASSES.KEY} ${CSS_CLASSES.FLEX_1_5}` : 
            CSS_CLASSES.KEY;

        return this.createElement('button', {
            className,
            textContent: letter,
            attributes: {
                [DATA_ATTRIBUTES.KEY]: letter
            }
        });
    }

    /**
     * Creates the Enter key element
     * @returns {HTMLElement} Enter key element
     */
    createEnterKey() {
        return this.createElement('button', {
            className: `${CSS_CLASSES.KEY} ${CSS_CLASSES.FLEX_1_5}`,
            textContent: 'ENTER',
            attributes: {
                [DATA_ATTRIBUTES.FUNC]: DATA_ATTRIBUTES.ENTER
            }
        });
    }

    /**
     * Creates the Backspace key element
     * @returns {HTMLElement} Backspace key element
     */
    createBackspaceKey() {
        return this.createElement('button', {
            className: `${CSS_CLASSES.KEY} ${CSS_CLASSES.FLEX_1_5}`,
            textContent: 'BACK',
            attributes: {
                [DATA_ATTRIBUTES.FUNC]: DATA_ATTRIBUTES.BACK
            }
        });
    }

    /**
     * Creates a keyboard row element
     * @param {boolean} hasSpacers - Whether to add spacers on sides
     * @returns {HTMLElement} Row element
     */
    createKeyboardRow(hasSpacers = false) {
        const row = this.createElement('div', {
            className: `${CSS_CLASSES.ROW} ${CSS_CLASSES.FLEX_1}`
        });

        if (hasSpacers) {
            const leftSpacer = this.createElement('div', {
                className: CSS_CLASSES.SPACER
            });
            row.appendChild(leftSpacer);
        }

        return row;
    }

    /**
     * Creates a spacer element
     * @returns {HTMLElement} Spacer element
     */
    createSpacer() {
        return this.createElement('div', {
            className: CSS_CLASSES.SPACER
        });
    }

    /**
     * Creates a game row for boxes
     * @returns {HTMLElement} Game row element
     */
    createGameRow() {
        return this.createElement('div', {
            className: CSS_CLASSES.ROW
        });
    }

    /**
     * Clears the content of an element
     * @param {HTMLElement|string} elementOrId - Element or element ID
     */
    clearElement(elementOrId) {
        const element = typeof elementOrId === 'string' ? 
            document.getElementById(elementOrId) : 
            elementOrId;
            
        if (element) {
            element.innerHTML = '';
        }
    }

    /**
     * Gets element by ID with error handling
     * @param {string} elementId - Element ID
     * @returns {HTMLElement|null} Element or null if not found
     */
    getElementById(elementId) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.warn(`Element with ID '${elementId}' not found`);
        }
        return element;
    }

    /**
     * Applies CSS classes to an element
     * @param {HTMLElement} element - Target element
     * @param {...string} classNames - Class names to add
     */
    addClasses(element, ...classNames) {
        element.classList.add(...classNames);
    }

    /**
     * Removes CSS classes from an element
     * @param {HTMLElement} element - Target element
     * @param {...string} classNames - Class names to remove
     */
    removeClasses(element, ...classNames) {
        element.classList.remove(...classNames);
    }

    /**
     * Checks if element has a specific class
     * @param {HTMLElement} element - Target element
     * @param {string} className - Class name to check
     * @returns {boolean} True if element has the class
     */
    hasClass(element, className) {
        return element.classList.contains(className);
    }

    /**
     * Sets text content safely
     * @param {HTMLElement|string} elementOrId - Element or element ID
     * @param {string} text - Text to set
     */
    setText(elementOrId, text) {
        const element = typeof elementOrId === 'string' ? 
            document.getElementById(elementOrId) : 
            elementOrId;
            
        if (element) {
            element.textContent = text;
        }
    }

    /**
     * Sets CSS custom property (CSS variable)
     * @param {string} property - CSS custom property name (including --)
     * @param {string|number} value - Property value
     */
    setCSSProperty(property, value) {
        document.documentElement.style.setProperty(property, value);
    }

    /**
     * Gets CSS custom property value
     * @param {string} property - CSS custom property name (including --)
     * @returns {string} Property value
     */
    getCSSProperty(property) {
        return getComputedStyle(document.documentElement).getPropertyValue(property);
    }
}