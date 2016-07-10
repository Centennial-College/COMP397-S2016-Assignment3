/**
 * @file config.ts
 * @author Kevin Ma kma45@my.centennialcollge.ca
 * @studentID 300867968
 * @date July 8, 2016
 * @description This file maintains all the constants and configurations for the project
 * @version 0.15.04 - added comments to config.ts
 */
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/**
 * This is the generic config namespace
 *
 * @module config
 */
var config;
(function (config) {
    /**
     * Scene Constants
     *
     * @export
     * @class Scene
     */
    var Scene = (function () {
        function Scene() {
        }
        Scene.MENU = 0;
        Scene.SLOT_MACHINE = 1;
        return Scene;
    }());
    config.Scene = Scene;
    /**
     * Screen Constants
     *
     * @export
     * @class Screen
     */
    var Screen = (function () {
        function Screen() {
        }
        Screen.WIDTH = 640;
        Screen.HEIGHT = 480;
        Screen.CENTER_X = 320;
        Screen.CENTER_Y = 240;
        return Screen;
    }());
    config.Screen = Screen;
    /**
     * Game Constants
     *
     * @export
     * @class Game
     */
    var Game = (function () {
        function Game() {
        }
        Game.FPS = 60;
        return Game;
    }());
    config.Game = Game;
})(config || (config = {}));
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
//# sourceMappingURL=config.js.map