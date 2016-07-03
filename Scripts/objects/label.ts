/**
 * File name: label.ts
 * @Author: Kevin Ma
 * Student #: 300867968
 * @Date: July 2, 2016
 * 
 * @Description: This class is used as a GUI control that displays text.
 * 
 * Version: 0.12 - updated UI, implemented betting and spinning mechanism
 */

/**
 * Provides the base Object namespace
 * 
 * @module objects
 */
module objects {
    /**
     * A utility used to create GUI labels
     * 
     * @class Label
     * @extends createjs.Text
     */
    export class Label extends createjs.Text {
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++++++++++++
        constructor(labelString: string, labelFont: string, labelColour: string, x: number, y: number, isCentered: boolean) {
            super(labelString, labelFont, labelColour);

            if (isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getBounds().height * 0.5;
            }

            this.x = x;
            this.y = y;
        }
    }
} 