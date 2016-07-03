/**
 * File name: config.ts
 * @Author: Kevin Ma
 * Student #: 300867968
 * @Date: July 1, 2016
 *
 * @Description: This file maintains all the constants and configurations for the game.
 *
 * Version: 0.1 - updated project for slot machine
 */
/**
 * Provides the base Config namespace
 *
 * @module config
 */
var config;
(function (config) {
    // Scene Constants
    var Scene = (function () {
        function Scene() {
        }
        Scene.MENU = 0;
        Scene.SLOT_MACHINE = 1;
        Scene.GAME_OVER = 2;
        return Scene;
    }());
    config.Scene = Scene;
    // Screen Constants
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
    // Game Constants
    var Game = (function () {
        function Game() {
        }
        Game.FPS = 60;
        return Game;
    }());
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=config.js.map