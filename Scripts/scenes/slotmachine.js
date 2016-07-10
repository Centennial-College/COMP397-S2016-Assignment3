/**
 * @file slotmachine.ts
 * @author Kevin Ma kma45@my.centennialcollge.ca
 * @studentID 300867968
 * @date July 10, 2016
 * @description This file is the main game scene for the game
 * @version 0.18.05 - added font awesome to modal headers
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/**
 * This is the generic scenes namespace
 *
 * @module scenes
 */
var scenes;
(function (scenes) {
    /**
     * This SlotMachine scene extends the objects.Scene object
     *
     * @export
     * @class SlotMachine
     * @extends {objects.Scene}
     */
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of SlotMachine.
         */
        function SlotMachine() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method adds game objects to the slotmachine scene
         *
         * @public
         * @method start
         * @returns {void}
         */
        SlotMachine.prototype.start = function () {
            // Reset the Game to initialize values
            this._resetPlayerStats();
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
        /**
         * Update game objects in the slotmachine scene
         *
         * @public
         * @method update
         * @returns {void}
         */
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
            // Update the game labels every tick of the game loop
            this._jackPotText.text = this._jackpot.toString();
            this._betText.text = this._playerBet.toString();
            this._creditsText.text = this._playerMoney.toString();
            this._resultText.text = this._winnings.toString();
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Utility function to check if a value falls within a specified range.
         *
         * @private
         * @method _checkRange
         * @param {number} value
         * @param {number} lowerBounds
         * @param {number} upperBounds
         * @returns {number}
         */
        SlotMachine.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        /**
         * Utility function to reset the player's stats
         *
         * @private
         * @method _resetPlayerStats
         * @returns {void}
         */
        SlotMachine.prototype._resetPlayerStats = function () {
            this._playerMoney = 1000;
            this._winnings = 0;
            this._jackpot = 5000;
            this._playerBet = 0;
        };
        /**
         * Determines the betLine results.
         * e.g. Bar - Orange - Watermelon - Seven - Blank
         *
         * @private
         * @method _spinReels
         * @returns {string[]}
         */
        SlotMachine.prototype._spinReels = function () {
            // declaring temporary storage of the betline results
            var betLine = [" ", " ", " ", " ", " "];
            // declaring storage for random number
            var outCome = 0;
            // determine the betline results for each reel based on random number generator
            for (var spin = 0; spin < 5; spin++) {
                // Assigns outCome a random number between 1 and 65
                outCome = Math.floor((Math.random() * 65) + 1);
                switch (outCome) {
                    case this._checkRange(outCome, 1, 27):
                        betLine[spin] = "Blank";
                        this._blanks++;
                        break;
                    case this._checkRange(outCome, 28, 37):
                        betLine[spin] = "Grapes";
                        this._grapes++;
                        break;
                    case this._checkRange(outCome, 38, 46):
                        betLine[spin] = "Watermelon";
                        this._watermelons++;
                        break;
                    case this._checkRange(outCome, 47, 54):
                        betLine[spin] = "Orange";
                        this._oranges++;
                        break;
                    case this._checkRange(outCome, 55, 59):
                        betLine[spin] = "Cherry";
                        this._cherries++;
                        break;
                    case this._checkRange(outCome, 60, 62):
                        betLine[spin] = "Bar";
                        this._bars++;
                        break;
                    case this._checkRange(outCome, 63, 64):
                        betLine[spin] = "Bell";
                        this._bells++;
                        break;
                    case this._checkRange(outCome, 65, 65):
                        betLine[spin] = "Seven";
                        this._sevens++;
                        break;
                }
            }
            return betLine;
        };
        /**
         * This function calculates the player's winnings, if any
         *
         * @private
         * @method _determineWinnings
         * @returns {void}
         */
        SlotMachine.prototype._determineWinnings = function () {
            if (this._blanks == 0) {
                // 5 matches 
                if (this._grapes == 5) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._watermelons == 5) {
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
                else if (this._watermelons == 4) {
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
                else if (this._watermelons == 3) {
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
                else if (this._watermelons == 2) {
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
                console.log("++++++++++++++++++++++");
                console.log('Win!');
                console.log('Won : ' + this._winnings + " Credits");
                console.log("++++++++++++++++++++++");
            }
            else {
                console.log("----------------------");
                console.log('Loss!');
                console.log("There was at least one blank.");
                console.log("----------------------");
            }
            this._playerMoney += this._winnings; //increment credits
            this._resetFruitTally();
        };
        /**
         * Utility function to reset the fruit tally counters
         *
         * @private
         * @method _resetFruitTally
         * @returns {void}
         */
        SlotMachine.prototype._resetFruitTally = function () {
            this._grapes = 0;
            this._watermelons = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        };
        /**
         * Utility function that initializes the bitmap array with 5 blank reels
         *
         * @private
         * @method _initializeBitMapArray
         * @returns {void}
         */
        SlotMachine.prototype._initializeBitMapArray = function () {
            this._reels = new Array();
            for (var reelIndex = 0; reelIndex < 5; reelIndex++) {
                this._reels[reelIndex] = new createjs.Bitmap(assets.getResult("Blank"));
                // can't do this._reels[reelIndex].x = 138 + (82 * reelIndex)
                // because not all +82, some +79, some + 84
                switch (reelIndex) {
                    case 0:
                        this._reels[reelIndex].x = 138;
                        break;
                    case 1:
                        this._reels[reelIndex].x = 217;
                        break;
                    case 2:
                        this._reels[reelIndex].x = 301;
                        break;
                    case 3:
                        this._reels[reelIndex].x = 385;
                        break;
                    case 4:
                        this._reels[reelIndex].x = 464;
                        break;
                }
                this._reels[reelIndex].y = 230;
                this.addChild(this._reels[reelIndex]);
                console.log("reel" + reelIndex + " " + this._reels[reelIndex]);
            }
        };
        /**
         * Adds the parameter playerBet to the _playerBet, and deducts
         * from _playerMoney
         *
         * @private
         * @method _makeBet
         * @param {number} playerBet
         * @returns {void}
         */
        SlotMachine.prototype._makeBet = function (playerBet) {
            this._playerBet += playerBet;
            this._playerMoney -= playerBet;
            console.log('Bet ' + playerBet + ' Credit.');
        };
        /**
         * Utility function to enable all buttons currently disabled
         *
         * @private
         * @method _enableAllButtons
         * @returns {void}
         */
        SlotMachine.prototype._enableAllButtons = function () {
            if (!this._bet1Button.mouseEnabled)
                this._bet1Button.EnableButton();
            if (!this._bet10Button.mouseEnabled)
                this._bet10Button.EnableButton();
            if (!this._bet100Button.mouseEnabled)
                this._bet100Button.EnableButton();
            if (!this._spinButton.mouseEnabled)
                this._spinButton.EnableButton();
            if (!this._cashOutButton.mouseEnabled)
                this._cashOutButton.EnableButton();
        };
        /**
         * Utility function that creates a confirm modal and appends it to the document after the
         * div containing the class="game". modalType = 0 creates a confirmation dialogue box,
         * modalType = 1 creates a notification dialogue box.
         *
         * @private
         * @method _createAndAddConfirmModal
         * @param {string} title
         * @param {string} content
         * @param {string} elementID
         * @param {number} modalType
         * @returns {void}
         */
        SlotMachine.prototype._createAndAddModal = function (title, content, elementID, modalType) {
            var modal = '<!-- Modal --><div id=' + elementID + ' class="modal fade" role="dialog"><div class="modal-dialog"><!-- Modal content--><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">' + title + '</h4></div><div class="modal-body"><p>' + content + '</p></div><div class="modal-footer">';
            switch (modalType) {
                // confirmation modal
                case 0:
                    modal += '<button type="button" id="yesBtn" class="btn btn-primary" data-dismiss="modal">Yes</button><button type="button" id="noBtn" class="btn btn-danger" data-dismiss="modal">No</button>';
                    break;
                // notification modal
                case 1:
                    modal += '<button type="button" id="infoBtn" class="btn btn-info" data-dismiss="modal">Ok</button>';
                    break;
            }
            modal += '</div></div></div></div>';
            $(modal).insertAfter('.game');
        };
        //EVENT HANDLERS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This is an event handler for the _bet1Button's mouse click event.
         *
         * @private
         * @method _bet1ButtonClick
         * @param {createjs.MouseEvent} event
         * @returns {void}
         */
        SlotMachine.prototype._bet1ButtonClick = function (event) {
            this._makeBet(1);
        };
        /**
         * This is an event handler for the _bet10Button's mouse click event.
         *
         * @private
         * @method _bet10ButtonClick
         * @param {createjs.MouseEvent} event
         * @returns {void}
         */
        SlotMachine.prototype._bet10ButtonClick = function (event) {
            this._makeBet(10);
        };
        /**
         * This is an event handler for the _bet100Button's mouse click event.
         *
         * @private
         * @method _bet100ButtonClick
         * @param {createjs.MouseEvent} event
         * @returns {void}
         */
        SlotMachine.prototype._bet100ButtonClick = function (event) {
            this._makeBet(100);
        };
        /**
         * This is an event handler for the _spinButton's mouse click event
         *
         * @private
         * @method _spinButtonClick
         * @param {createjs.MouseEvent} event
         * @returns {void}
         */
        SlotMachine.prototype._spinButtonClick = function (event) {
            // resets the winnings before each spin
            this._winnings = 0;
            // Determine the outcomes of the reels
            var bitmap = this._spinReels();
            for (var reelIndex = 0; reelIndex < 5; reelIndex++) {
                this._reels[reelIndex].image = assets.getResult(bitmap[reelIndex]);
            }
            // calculate the winnings for the current spin
            this._determineWinnings();
            // reset player's bet to zero
            this._playerBet = 0;
        };
        /**
         * This is an event handler for the _resetButton's mouse click event.
         *
         * @private
         * @method _resetButtonClick
         * @param {createjs.MouseEvent} event
         * @returns {void}
         */
        SlotMachine.prototype._resetButtonClick = function (event) {
            this._createAndAddModal("Reset Game <i class='fa fa-refresh fa-spin'></i>", "The game data has been reset.", "resetModal", 1);
            $('#resetModal').modal('show');
            this._resetPlayerStats();
            this._resetFruitTally();
            this._reels.forEach(function (element) {
                element.image = assets.getResult("Blank");
            });
        };
        /**
          * This is an event handler for the _cashOutButton's click event.
          *
          * @private
          * @method _cashOutButtonClick
          * @param {createjs.MouseEvent} event
          * @returns {void}
          */
        SlotMachine.prototype._cashOutButtonClick = function (event) {
            // create a modal to display confirmation message
            this._createAndAddModal("Cash Out <i class='fa fa-money text-success'></i>", "Are you sure you would like to quit the game?", "cashOutModal", 0);
            // attach event listener to the yesBtn
            $('#yesBtn').on('click', function () {
                scene = config.Scene.MENU;
                changeScene();
            });
            $('#cashOutModal').modal("show");
        };
        return SlotMachine;
    }(objects.Scene));
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
//# sourceMappingURL=slotmachine.js.map