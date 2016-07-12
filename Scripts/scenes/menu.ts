/**
 * @file menu.ts
 * @author Kevin Ma kma45@my.centennialcollge.ca
 * @studentID 300867968
 * @date July 9, 2016
 * @description This file is the menu scene for the game.
 * @version 1.0.1 - fixed Menu.ts (title label)
 */

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * This is the generic scenes namespace
 * 
 * @module scenes
 */
module scenes {
    /**
     * This Menu scene extends the objects.Scene object 
     * 
     * @export
     * @class GameOver
     * @extends {objects.Scene}
     */
    export class Menu extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        private _startButton: objects.Button;
        private _welcomeLabel: objects.Label;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Menu.
         */
        constructor() {
            super();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method adds game objects to the menu scene
         * 
         * @public
         * @method start
         * @returns {void}
         */
        public start(): void {

            // add the WELCOME Label to the MENU scene
            this._welcomeLabel = new objects.Label(
                "REEL REVOLUTION",
                "60px Consolas",
                "#000",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y, true);
            this.addChild(this._welcomeLabel);

            // add the START button to the MENU scene
            this._startButton = new objects.Button(
                "StartButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 80, true);
            this.addChild(this._startButton);

            // START Button event listener
            this._startButton.on("click", this._startButtonClick, this);

            // Setup Background
            this._setupBackground("WhiteBackground");

            // FadeIn - 500 milliseconds
            this._fadeIn(500);

            // add this scene to the global stage container
            stage.addChild(this);
        }

        /**
         * Update game objects in the menu scene
         * 
         * @public
         * @method update
         * @returns {void}
         */
        public update(): void {

        }


        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This is an event handler for the click event
         * 
         * @private
         * @method _startOverButtonClick
         * @param {createjs.MouseEvent} event
         * @returns {void}
         */
        private _startButtonClick(event: createjs.MouseEvent) {
            // FadeOut
            this._fadeOut(500, () => {
                // Switch to the SLOT_MACHINE Scene
                scene = config.Scene.SLOT_MACHINE;
                changeScene();
            });
        }
    }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++