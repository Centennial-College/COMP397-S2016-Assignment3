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
module config {

    // Scene Constants
    export class Scene {
        public static MENU: number = 0;
        public static SLOT_MACHINE: number = 1;
        public static GAME_OVER: number = 2;
    }
    
    
    // Screen Constants
    export class Screen {
        public static WIDTH: number = 640;
        public static HEIGHT: number = 480;
        public static CENTER_X: number = 320;
        public static CENTER_Y: number = 240;
    }
    
    // Game Constants
    export class Game {
        public static FPS: number = 60;
    }
}