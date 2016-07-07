/**
 * File name: slotmachine.ts
 * @Author: Kevin Ma
 * Student #: 300867968
 * @Date: July 4, 2016
 *
 * @Description: This typescript file contains all the code required to emulate a
 * web slot machine game interface.
 *
 * Version: 0.15 - redesigned UI to accomodate 5 reels and additional reset and quit buttons
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
var scenes;
(function (scenes) {
    /**
      * Emulates the slot machine scene for the game where most of the action occurs.
      *
      * @class SlotMachine
      * @extends objects.Scene
      */
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function SlotMachine() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
            // Reset the Game to initialize values
            this._resetAll();
            this._resetFruitTally();
            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);
            // add Bet1Button to the scene
            this._bet1Button = new objects.Button("Bet1Button", 249, 384, false);
            this.addChild(this._bet1Button);
            this._bet1Button.on("click", this._bet1ButtonClick, this);
            // add Bet10Button to the scene
            this._bet10Button = new objects.Button("Bet10Button", 333, 384, false);
            this.addChild(this._bet10Button);
            this._bet10Button.on("click", this._bet10ButtonClick, this);
            // add Bet100Button to the scene
            this._bet100Button = new objects.Button("Bet100Button", 417, 384, false);
            this.addChild(this._bet100Button);
            this._bet100Button.on("click", this._bet100ButtonClick, this);
            // add SpinButton to the scene
            this._spinButton = new objects.Button("SpinButton", 501, 384, false);
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._spinButtonClick, this);
            // add ResetButton to the scene
            this._resetButton = new objects.Button("ResetButton", 81, 384, false);
            this.addChild(this._resetButton);
            this._resetButton.on("click", this._resetButtonClick, this);
            // add CashOutButton to the scene
            this._cashOutButton = new objects.Button("CashOutButton", 165, 384, false);
            this.addChild(this._cashOutButton);
            this._cashOutButton.on("click", this._cashOutButtonClick, this);
            // add JackPot Text to the scene
            this._jackPotText = new objects.Label(this._jackpot.toString(), "14px Consolas", "#ff2640", 202, 309, false);
            this._jackPotText.textAlign = 'right';
            this.addChild(this._jackPotText);
            // add Credits Text to the scene
            this._creditsText = new objects.Label(this._playerMoney.toString(), "14px Consolas", "#ff2640", 303, 309, false);
            this._creditsText.textAlign = 'right';
            this.addChild(this._creditsText);
            // add Bet Text to the scene
            this._betText = new objects.Label(this._playerBet.toString(), "14px Consolas", "#ff2640", 405, 309, false);
            this._betText.textAlign = 'right';
            this.addChild(this._betText);
            // add Result Text to the scene
            this._resultText = new objects.Label(this._winnings.toString(), "14px Consolas", "#ff2640", 507, 309, false);
            this._resultText.textAlign = 'right';
            this.addChild(this._resultText);
            // Initialize Array of Bitmaps
            this._initializeBitMapArray();
            // Setup Background
            this._setupBackground("WhiteBackground");
            // FadeIn - 500 milliseconds
            this._fadeIn(500);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // SLOT_MACHINE Scene updates here
        SlotMachine.prototype.update = function () {
            // By default all buttons are enabled
            this._enableAllButtons();
            // Place bet buttons are disabled when player's credits not enough
            if (this._playerMoney < 100) {
                this._bet100Button.DisableButton();
            }
            if (this._playerMoney < 10) {
                this._bet10Button.DisableButton();
            }
            if (this._playerMoney < 1) {
                this._bet1Button.DisableButton();
            }
            // Spin button is diabled until player makes a bet
            if (this._playerBet == 0) {
                this._spinButton.DisableButton();
            }
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /* Utility function to check if a value falls within a range of bounds */
        SlotMachine.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        /* Utility function to reset the player stats */
        SlotMachine.prototype._resetAll = function () {
            this._playerMoney = 1000;
            this._winnings = 0;
            this._jackpot = 5000;
            this._playerBet = 0;
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        SlotMachine.prototype._spinReels = function () {
            var betLine = [" ", " ", " ", " ", " "];
            var outCome = [0, 0, 0, 0, 0];
            for (var spin = 0; spin < 5; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):
                        betLine[spin] = "Blank";
                        this._blanks++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37):
                        betLine[spin] = "Grapes";
                        this._grapes++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46):
                        betLine[spin] = "Banana";
                        this._bananas++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54):
                        betLine[spin] = "Orange";
                        this._oranges++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59):
                        betLine[spin] = "Cherry";
                        this._cherries++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62):
                        betLine[spin] = "Bar";
                        this._bars++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64):
                        betLine[spin] = "Bell";
                        this._bells++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65):
                        betLine[spin] = "Seven";
                        this._sevens++;
                        break;
                }
            }
            return betLine;
        };
        /* This function calculates the player's winnings, if any */
        SlotMachine.prototype._determineWinnings = function () {
            if (this._blanks == 0) {
                // 5 matches 
                if (this._grapes == 5) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._bananas == 5) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._oranges == 5) {
                    this._winnings = this._playerBet * 30;
                }
                else if (this._cherries == 5) {
                    this._winnings = this._playerBet * 40;
                }
                else if (this._bars == 5) {
                    this._winnings = this._playerBet * 50;
                }
                else if (this._bells == 5) {
                    this._winnings = this._playerBet * 75;
                }
                else if (this._sevens == 5) {
                    this._winnings = this._playerBet * 100;
                }
                else if (this._grapes == 4) {
                    this._winnings = this._playerBet * 6;
                }
                else if (this._bananas == 4) {
                    this._winnings = this._playerBet * 6;
                }
                else if (this._oranges == 4) {
                    this._winnings = this._playerBet * 8;
                }
                else if (this._cherries == 4) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._bars == 4) {
                    this._winnings = this._playerBet * 12;
                }
                else if (this._bells == 4) {
                    this._winnings = this._playerBet * 25;
                }
                else if (this._sevens == 4) {
                    this._winnings = this._playerBet * 50;
                }
                else if (this._grapes == 3) {
                    this._winnings = this._playerBet * 3;
                }
                else if (this._bananas == 3) {
                    this._winnings = this._playerBet * 3;
                }
                else if (this._oranges == 3) {
                    this._winnings = this._playerBet * 4;
                }
                else if (this._cherries == 3) {
                    this._winnings = this._playerBet * 5;
                }
                else if (this._bars == 3) {
                    this._winnings = this._playerBet * 6;
                }
                else if (this._bells == 3) {
                    this._winnings = this._playerBet * 12;
                }
                else if (this._sevens == 3) {
                    this._winnings = this._playerBet * 25;
                }
                else if (this._grapes == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._bananas == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._oranges == 2) {
                    this._winnings = this._playerBet * 3;
                }
                else if (this._cherries == 2) {
                    this._winnings = this._playerBet * 4;
                }
                else if (this._bars == 2) {
                    this._winnings = this._playerBet * 5;
                }
                else if (this._bells == 2) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._sevens == 2) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._sevens == 1) {
                    this._winnings = this._playerBet * 5;
                }
                else {
                    this._winnings = this._playerBet * 1;
                }
                console.log('Win!');
                console.log('Won : ' + this._winnings);
            }
            else {
                console.log('Loss!');
            }
            this._resultText.text = this._winnings.toString(); //results = winnings
            this._playerMoney += this._winnings; //increment credits
            this._creditsText.text = this._playerMoney.toString();
            this._resetFruitTally();
        };
        /* Utility function to reset the fruit tally counters */
        SlotMachine.prototype._resetFruitTally = function () {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        };
        /* Utility function that initializes the bitmap array with 3 blank reels */
        SlotMachine.prototype._initializeBitMapArray = function () {
            this._reels = new Array();
            for (var reel = 0; reel < 5; reel++) {
                this._reels[reel] = new createjs.Bitmap(assets.getResult("Blank"));
                // can't do this._reels[reel].x = 138 + (82 * reel)
                // because not all +82, some +79, some + 84
                switch (reel) {
                    case 0:
                        this._reels[reel].x = 138;
                        break;
                    case 1:
                        this._reels[reel].x = 217;
                        break;
                    case 2:
                        this._reels[reel].x = 301;
                        break;
                    case 3:
                        this._reels[reel].x = 385;
                        break;
                    case 4:
                        this._reels[reel].x = 464;
                        break;
                }
                this._reels[reel].y = 230;
                this.addChild(this._reels[reel]);
                console.log("reel" + reel + " " + this._reels[reel]);
            }
        };
        SlotMachine.prototype._makeBet = function (playerBet) {
            this._playerBet += playerBet;
            this._playerMoney -= playerBet;
            this._creditsText.text = this._playerMoney.toString();
            this._betText.text = this._playerBet.toString();
            console.log('Bet ' + playerBet + ' Credit.');
        };
        /* Utility function to enable all buttons currently disabled */
        SlotMachine.prototype._enableAllButtons = function () {
            if (!this._bet1Button.mouseEnabled)
                this._bet1Button.EnableButton();
            if (!this._bet10Button.mouseEnabled)
                this._bet10Button.EnableButton();
            if (!this._bet100Button.mouseEnabled)
                this._bet100Button.EnableButton();
            if (!this._spinButton.mouseEnabled)
                this._spinButton.EnableButton();
        };
        //EVENT HANDLERS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        SlotMachine.prototype._bet1ButtonClick = function (event) {
            this._makeBet(1);
        };
        SlotMachine.prototype._bet10ButtonClick = function (event) {
            this._makeBet(10);
        };
        SlotMachine.prototype._bet100ButtonClick = function (event) {
            this._makeBet(100);
        };
        SlotMachine.prototype._spinButtonClick = function (event) {
            // resets the winnings before each spin
            this._winnings = 0;
            var bitmap = this._spinReels();
            for (var reel = 0; reel < 5; reel++) {
                this._reels[reel].image = assets.getResult(bitmap[reel]);
            }
            // calculate the winnings for the current spin
            this._determineWinnings();
            // reset player's bet to zero
            this._playerBet = 0;
            this._betText.text = this._playerBet.toString();
        };
        SlotMachine.prototype._resetButtonClick = function (event) {
        };
        SlotMachine.prototype._cashOutButtonClick = function (event) {
        };
        return SlotMachine;
    }(objects.Scene));
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
//# sourceMappingURL=slotmachine.js.map