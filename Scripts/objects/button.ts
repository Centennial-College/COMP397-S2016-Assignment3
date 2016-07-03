/**
 * File name: button.ts
 * @Author: Kevin Ma
 * Student #: 300867968
 * @Date: July 3, 2016
 * 
 * @Description: This class is used as a GUI button control.
 * 
 * Version: 0.14 - added checks to disable betting and spin buttons when appropiate
 */

/**
 * Provides the base Object namespace
 * 
 * @module objects
 */
module objects {
    /**
     * A utility used to create GUI button controls
     * 
     * @class Button
     * @extends createjs.Bitmap
     */
    export class Button extends createjs.Bitmap {
        //PUBLIC INSTANCE VARIABLES
        public width: number;
        public height: number;

        //CONSTRUCTOR
        constructor(pathString: string, x: number, y: number, public isCentered: boolean) {
            super(assets.getResult(pathString));
            this.x = x;
            this.y = y;

            this.width = 150;
            this.height = 50;

            if (this.isCentered) {
                this.regX = this.width * 0.5;
                this.regY = this.height * 0.5;
            }

            this.on("mouseover", this.overButton, this);
            this.on("mouseout", this.outButton, this);
        }

        // PUBLIC METHODS
        // Disable the button
        public DisableButton(): void {
            this.alpha = 0.7;
            this.mouseEnabled = false;
        }

        // Enable the button to be clicked
        public EnableButton(): void {
            this.alpha = 1.0;
            this.mouseEnabled = true;
        }

        // PRIVATE METHODS
        // Event Handler for mouse over
        overButton(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 0.7;
        }

        // Event Handler for mouse out
        outButton(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 1.0;
        }
    }
} 