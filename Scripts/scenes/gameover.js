/**
 * File name: gameover.ts
 * @Author: Kevin Ma
 * Student #: 300867968
 * @Date: July 2, 2016
 *
 * @Description: This class is used as a game over scene for the game.
 *
 * Version: 0.12 - updated UI, implemented betting and spinning mechanism
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Provides the base Scene namespace
 *
 * @module scenes
 */
// GAME_OVER SCENE
var scenes;
(function (scenes) {
    /**
     * Emulates the game over scene for the game.
     *
     * @class GameOver
     * @extends objects.Scene
     */
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function GameOver() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        GameOver.prototype.start = function () {
            // add the GAME OVER Label to the GAME_OVER scene
            this._gameOverLabel = new objects.Label("GAME OVER", "60px Consolas", "#000", config.Screen.CENTER_X, config.Screen.CENTER_Y, true);
            this.addChild(this._gameOverLabel);
            // add the START button to the GAME_OVER scene
            this._startOverButton = new objects.Button("StartButton", config.Screen.CENTER_X, config.Screen.CENTER_Y + 80, true);
            this.addChild(this._startOverButton);
            // START Button event listener
            this._startOverButton.on("click", this._startOverButtonClick, this);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // GAME_OVER Scene updates here
        GameOver.prototype.update = function () {
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // START Button click event handler
        GameOver.prototype._startOverButtonClick = function (event) {
            // Switch to the SLOT_MACHINE Scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        };
        return GameOver;
    }(objects.Scene));
    scenes.GameOver = GameOver;
})(scenes || (scenes = {}));
//# sourceMappingURL=gameover.js.map