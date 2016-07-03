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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Provides the base Object namespace
 *
 * @module objects
 */
var objects;
(function (objects) {
    /**
     * A utility used to create different scenes for the project.
     *
     * @class Scene
     * @extends createjs.Container
     */
    var Scene = (function (_super) {
        __extends(Scene, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++
        function Scene() {
            _super.call(this);
            this.start();
        }
        // Add game objects to my scene in this method
        Scene.prototype.start = function () {
            stage.addChild(this);
        };
        // update game objects in my scene
        Scene.prototype.update = function () {
        };
        // Setup Background
        Scene.prototype._setupBackground = function (background) {
            this._background = new createjs.Bitmap(assets.getResult(background));
            this.addChild(this._background);
        };
        // FadeIn method
        Scene.prototype._fadeIn = function (transitionTime) {
            createjs.Tween.get(this._background).to({ alpha: 0 }, transitionTime, createjs.Ease.getPowInOut(2));
        };
        // FadeOut method
        Scene.prototype._fadeOut = function (transitionTime, callback) {
            createjs.Tween.get(this._background).to({ alpha: 0 }, transitionTime, createjs.Ease.getPowInOut(2)).call(callback);
        };
        return Scene;
    }(createjs.Container));
    objects.Scene = Scene;
})(objects || (objects = {}));
//# sourceMappingURL=scene.js.map