/// <reference path = "_reference.ts" />
/**
 * @file game.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @studentID 300867968
 * @date: July 8, 2016
 * @description: This file is the entry point for the game.
 * @version 0.16.0 - replaced all text-based reel images with graphics
 */
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Variable Declarations
// Global Variables
var assets;
var canvas;
var stage;
var stats;
var currentScene;
var scene;
// Game Scenes
var menu;
var slotmachine;
var gameover;
// array of asset objects which contains all assets to be preloaded 
var assetData = [
    { id: "BackButton", src: "../../Assets/images/BackButton.png" },
    { id: "NextButton", src: "../../Assets/images/NextButton.png" },
    { id: "StartButton", src: "../../Assets/images/StartButton.png" },
    { id: "StartOverButton", src: "../../Assets/images/StartOverButton.png" },
    { id: "SlotMachine", src: "../../Assets/images/SlotMachine.png" },
    { id: "Bet1Button", src: "../../Assets/images/Bet1Button.png" },
    { id: "Bet10Button", src: "../../Assets/images/Bet10Button.png" },
    { id: "Bet100Button", src: "../../Assets/images/Bet100Button.png" },
    { id: "SpinButton", src: "../../Assets/images/SpinButton.png" },
    { id: "ResetButton", src: "../../Assets/images/ResetButton.png" },
    { id: "CashOutButton", src: "../../Assets/images/CashOutButton.png" },
    { id: "WhiteBackground", src: "../../Assets/images/WhiteBackground.png" },
    { id: "Blank", src: "../../Assets/images/Blank.png" },
    { id: "Grapes", src: "../../Assets/images/Grapes.png" },
    { id: "Watermelon", src: "../../Assets/images/Watermelon.png" },
    { id: "Orange", src: "../../Assets/images/Orange.png" },
    { id: "Cherry", src: "../../Assets/images/Cherry.png" },
    { id: "Bar", src: "../../Assets/images/Bar.png" },
    { id: "Bell", src: "../../Assets/images/Bell.png" },
    { id: "Seven", src: "../../Assets/images/Seven.png" }
];
/**
 * This method preloads all assets required for the game before initializing the game
 *
 * @method preload
 * @returns {void}
 */
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}
/**
 * This method is the entry point for the application
 *
 * @method init
 * @returns {void}
 */
function init() {
    // create a reference the HTML canvas Element
    canvas = document.getElementById("canvas");
    // create our main display list container
    stage = new createjs.Stage(canvas);
    // Enable mouse events, 20 frames per second; mouse events are resource intensive, so only enable them when required
    stage.enableMouseOver(20);
    // set the framerate to 60 frames per second
    createjs.Ticker.setFPS(config.Game.FPS);
    // create an event listener to count off frames
    createjs.Ticker.on("tick", gameLoop, this);
    // sets up our stats counting workflow
    setupStats();
    // set initial scene
    scene = config.Scene.MENU;
    changeScene();
}
/**
 * Main Game Loop function that handles what happens each "tick" or frame
 *
 * @method gameLoop
 * @param {createjs.Event} event
 * @returns {void}
 */
function gameLoop(event) {
    // start collecting stats for this frame
    stats.begin();
    // calling State's update method
    currentScene.update();
    // redraw/refresh stage every frame
    stage.update();
    // stop collecting stats for this frame
    stats.end();
}
/**
 * Setup Game Stats
 *
 * @method setupStats
 * @returns {void}
 */
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}
/**
 * Finite State Machine used to change Scenes
 *
 * @method changeScene
 * @returns {void}
 */
function changeScene() {
    // Launch various scenes
    switch (scene) {
        case config.Scene.MENU:
            // show the MENU scene
            stage.removeAllChildren();
            menu = new scenes.Menu();
            currentScene = menu;
            console.log("Starting MENU Scene");
            break;
        case config.Scene.SLOT_MACHINE:
            // show the SLOT_MACHINE scene
            stage.removeAllChildren();
            slotmachine = new scenes.SlotMachine();
            currentScene = slotmachine;
            console.log("Starting SLOT_MACHINE Scene");
            break;
        case config.Scene.GAME_OVER:
            // show the GAME_OVER scene
            stage.removeAllChildren();
            gameover = new scenes.GameOver();
            currentScene = gameover;
            console.log("Starting GAME_OVER Scene");
            break;
    }
    console.log(currentScene.numChildren);
}
// waits until the window object is finished loading, then calls the preload method
window.onload = preload;
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
//# sourceMappingURL=game.js.map