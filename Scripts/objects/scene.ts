/**
 * File name: scene.ts
 * @Author: Kevin Ma
 * Student #: 300867968
 * @Date: July 2, 2016
 * 
 * @Description: This class is used as a template for the different scenes of the game.
 * 
 * Version: 0.9 - added in fade in and fade out transitions for menu and slotmachine scenes
 */

/**
 * Provides the base Object namespace
 * 
 * @module objects
 */
module objects {
    /**
     * A utility used to create different scenes for the project.
     * 
     * @class Scene
     * @extends createjs.Container
     */
    export class Scene extends createjs.Container {
        // PROTECTED INSTANCE VARIABLES
        protected _background: createjs.Bitmap;

        // CONSTRUCTOR +++++++++++++++++++++++++++++
        constructor() {
            super();
            this.start();
        }

        // Add game objects to my scene in this method
        public start(): void {
            stage.addChild(this);
        }

        // update game objects in my scene
        public update(): void {

        }

        // Setup Background
        protected _setupBackground(background: string): void {
            this._background = new createjs.Bitmap(assets.getResult(background));
            this.addChild(this._background);
        }

        // FadeIn method
        protected _fadeIn(transitionTime: number): void {
            createjs.Tween.get(this._background).to({ alpha: 0 }, transitionTime,
                createjs.Ease.getPowInOut(2));
        }

        // FadeOut method
        protected _fadeOut(transitionTime: number, callback: any): void {
            createjs.Tween.get(this._background).to({ alpha: 0 }, transitionTime,
                createjs.Ease.getPowInOut(2)).call(callback);
        }
    }
}