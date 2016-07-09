/**
 * @file label.ts
 * @author Kevin Ma kma45@my.centennialcollge.ca
 * @studentID 300867968
 * @date July 8, 2016
 * @description This file is the prototype for a GUI control that displays text.
 * @version 0.15.05 - added comments to label.ts
 */

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * This is the generic objects namespace
 * 
 * @module objects
 */
module objects {
    /**
     * This simple Label class extends the createjs.Text object.
     * A Label may be centered by setting true into isCentered constructor parameter
     * 
     * @export
     * @class Label
     * @extends {createjs.Text}
     */
    export class Label extends createjs.Text {
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Label.
         * 
         * @param {string} labelString
         * @param {string} labelFont
         * @param {string} labelColour
         * @param {number} x
         * @param {number} y
         * @param {boolean} isCentered
         */
        constructor(labelString: string, labelFont: string, labelColour: string, x: number, y: number, isCentered: boolean) {
            super(labelString, labelFont, labelColour);

            // Check if user wants to change regX and regY values to the center 
            if (isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getBounds().height * 0.5;
            }

            this.x = x;
            this.y = y;
        }
    }
} 

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++