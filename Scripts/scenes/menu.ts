/**
 * File name: menu.ts
 * @Author: Kevin Ma
 * Student #: 300867968
 * @Date: July 2, 2016
 * 
 * @Description: This class is used as a menu scene to the game.
 * 
 * Version: 0.12 - updated UI, implemented betting and spinning mechanism
 */

/**
 * Provides the base Scene namespace
 * 
 * @module scenes
 */
module scenes {
    /**
     * Emulates the menu scene for the game.
     * 
     * @class Menu
     * @extends objects.Scene
     */
    export class Menu extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _startButton: objects.Button;
        private _welcomeLabel: objects.Label;

        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }

        // PUBLIC METHODS +++++++++++++++++++++

        // Start Method
        public start(): void {

            // add the WELCOME Label to the MENU scene
            this._welcomeLabel = new objects.Label(
                "SLOT MACHINE",
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

        // MENU Scene updates here
        public update(): void {

        }


        //EVENT HANDLERS ++++++++++++++++++++

        // START Button click event handler
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