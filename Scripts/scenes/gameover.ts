/**
 * @file gameover.ts
 * @author Kevin Ma kma45@my.centennialcollge.ca
 * @studentID 300867968
 * @date July 9, 2016
 * @description This file is the prototype for a gameover scene in a game.
 * @version 0.15.07 - added comments to gameover.ts
 */

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * This is the generic scenes namespace
 * 
 * @module scenes
 */
module scenes {
    /**
     * This GameOver scene extends the objects.Scene object 
     * 
     * @export
     * @class GameOver
     * @extends {objects.Scene}
     */
    export class GameOver extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        private _startOverButton: objects.Button;
        private _gameOverLabel: objects.Label;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of GameOver.
         */
        constructor() {
            super();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method adds game objects to the gameover scene
         * 
         * @public
         * @method start
         * @returns {void}
         */
        public start(): void {

            // add the GAME OVER Label to the GAME_OVER scene
            this._gameOverLabel = new objects.Label(
                "GAME OVER",
                "60px Consolas",
                "#000",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y, true);
            this.addChild(this._gameOverLabel);

            // add the START button to the GAME_OVER scene
            this._startOverButton = new objects.Button(
                "StartButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 80, true);
            this.addChild(this._startOverButton);

            // Attach a click event listener to the START Button 
            this._startOverButton.on("click", this._startOverButtonClick, this);

            // add this scene to the global stage container
            stage.addChild(this);
        }

        /**
         * Update game objects in the gameover scene
         * 
         * @public
         * @method update
         * @returns {void}
         */
        public update(): void {

        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This is an event handler for the click event
         * 
         * @private
         * @method _startOverButtonClick
         * @param {createjs.MouseEvent} event
         * @returns {void}
         */
        private _startOverButtonClick(event: createjs.MouseEvent) {
            // Switch to the SLOT_MACHINE Scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        }
    }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++