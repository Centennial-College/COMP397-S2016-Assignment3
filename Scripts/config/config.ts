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
module config {
    /**
     * Scene Constants
     * 
     * @export
     * @class Scene
     */
    export class Scene {
        public static MENU: number = 0;
        public static SLOT_MACHINE: number = 1;
    }
    
    /**
     * Screen Constants 
     * 
     * @export
     * @class Screen
     */
    export class Screen {
        public static WIDTH: number = 640;
        public static HEIGHT: number = 480;
        public static CENTER_X: number = 320;
        public static CENTER_Y: number = 240;
    }

    /**
     * Game Constants 
     * 
     * @export
     * @class Game
     */
    export class Game {
        public static FPS: number = 60;
    }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++