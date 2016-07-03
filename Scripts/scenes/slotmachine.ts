// SLOT_MACHINE SCENE
module scenes {
    export class SlotMachine extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backgroundImage: createjs.Bitmap;
        private _bet1Button: objects.Button;
        private _bet10Button: objects.Button;
        private _bet100Button: objects.Button;
        private _spinButton: objects.Button;
        private _reels: createjs.Bitmap[];
        private _jackPotText: objects.Label;
        private _creditsText: objects.Label;
        private _betText: objects.Label;
        private _resultText: objects.Label;
        private _playerMoney: number;
        private _winnings: number;
        private _jackpot: number;
        private _playerBet: number;

        private _grapes: number;
        private _bananas: number;
        private _oranges: number;
        private _cherries: number;
        private _bars: number;
        private _bells: number;
        private _sevens: number;
        private _blanks: number;

        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }

        // PUBLIC METHODS +++++++++++++++++++++

        // Start Method
        public start(): void {
            // Reset the Game to initialize values
            this._resetAll();
            this._resetFruitTally();

            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);

            // add Bet1Button to the scene
            this._bet1Button = new objects.Button("Bet1Button", 185, 385, false);
            this.addChild(this._bet1Button);
            this._bet1Button.on("click", this._bet1ButtonClick, this);

            // add Bet10Button to the scene
            this._bet10Button = new objects.Button("Bet10Button", 253, 385, false);
            this.addChild(this._bet10Button);
            this._bet10Button.on("click", this._bet10ButtonClick, this);

            // add Bet100Button to the scene
            this._bet100Button = new objects.Button("Bet100Button", 323, 385, false);
            this.addChild(this._bet100Button);
            this._bet100Button.on("click", this._bet100ButtonClick, this);

            // add SpinButton to the scene
            this._spinButton = new objects.Button("SpinButton", 412, 385, false);
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._spinButtonClick, this);

            // add JackPot Text to the scene
            this._jackPotText = new objects.Label(
                this._jackpot.toString(),
                "14px Consolas",
                "#ff2640",
                367, 119, false
            );
            this._jackPotText.textAlign = 'right';
            this.addChild(this._jackPotText);

            // add Credits Text to the scene
            this._creditsText = new objects.Label(
                this._playerMoney.toString(),
                "14px Consolas",
                "#ff2640",
                274, 309, false
            );
            this._creditsText.textAlign = 'right';
            this.addChild(this._creditsText);

            // add Bet Text to the scene
            this._betText = new objects.Label(
                this._playerBet.toString(),
                "14px Consolas",
                "#ff2640",
                364, 309, false
            );
            this._betText.textAlign = 'right';
            this.addChild(this._betText);

            // add Result Text to the scene
            this._resultText = new objects.Label(
                this._winnings.toString(),
                "14px Consolas",
                "#ff2640",
                450, 309, false
            );
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
        }

        // SLOT_MACHINE Scene updates here
        public update(): void {

        }

        // PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        private _checkRange(value: number, lowerBounds: number, upperBounds: number): number {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        }

        /* Utility function to reset the player stats */
        private _resetAll() {
            this._playerMoney = 1000;
            this._winnings = 0;
            this._jackpot = 5000;
            this._playerBet = 0;
        }

        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        private _spinReels(): string[] {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];

            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):  // 41.5% probability
                        betLine[spin] = "Blank";
                        this._blanks++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37): // 15.4% probability
                        betLine[spin] = "Grapes";
                        this._grapes++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46): // 13.8% probability
                        betLine[spin] = "Banana";
                        this._bananas++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54): // 12.3% probability
                        betLine[spin] = "Orange";
                        this._oranges++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59): //  7.7% probability
                        betLine[spin] = "Cherry";
                        this._cherries++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62): //  4.6% probability
                        betLine[spin] = "Bar";
                        this._bars++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64): //  3.1% probability
                        betLine[spin] = "Bell";
                        this._bells++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65): //  1.5% probability
                        betLine[spin] = "Seven";
                        this._sevens++;
                        break;
                }
            }
            return betLine;
        }

        /* This function calculates the player's winnings, if any */
        private _determineWinnings(): void {
            if (this._blanks == 0) {
                if (this._grapes == 3) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._bananas == 3) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._oranges == 3) {
                    this._winnings = this._playerBet * 30;
                }
                else if (this._cherries == 3) {
                    this._winnings = this._playerBet * 40;
                }
                else if (this._bars == 3) {
                    this._winnings = this._playerBet * 50;
                }
                else if (this._bells == 3) {
                    this._winnings = this._playerBet * 75;
                }
                else if (this._sevens == 3) {
                    this._winnings = this._playerBet * 100;
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
                console.log('playerbet: ' + this._playerBet);
                // showWinMessage();
            }
            else {
                console.log('Loss!');
                // showLossMessage();
            }

            this._resultText.text = this._winnings.toString();
            this._playerMoney += this._winnings;
            this._creditsText.text = this._playerMoney.toString();
            this._resetFruitTally();
        }

        /* Utility function to reset the fruit tally counters */
        private _resetFruitTally(): void {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        }

        /* Utility function that initializes the bitmap array with 3 blank reels */
        private _initializeBitMapArray(): void {
            this._reels = new Array<createjs.Bitmap>();
            for (var reel: number = 0; reel < 3; reel++) {
                this._reels[reel] = new createjs.Bitmap(assets.getResult("Blank"));
                this._reels[reel].x = 229 + (reel * 82);
                this._reels[reel].y = 232;
                this.addChild(this._reels[reel]);
                console.log("reel" + reel + " " + this._reels[reel]);
            }
        }

        private _makeBet(playerBet: number): void {
            // ensure the player has enough to successfully make his bet
            if (playerBet <= this._playerMoney) {
                this._playerBet += playerBet;
                this._playerMoney -= playerBet;
                this._creditsText.text = this._playerMoney.toString();
                this._betText.text = this._playerBet.toString();
                console.log('Bet ' + playerBet + ' Credit.');
            }
            else {
                // make error sound
            }
        }

        //EVENT HANDLERS ++++++++++++++++++++
        private _bet1ButtonClick(event: createjs.MouseEvent): void {
            this._makeBet(1);
        }

        private _bet10ButtonClick(event: createjs.MouseEvent): void {
            this._makeBet(10);
        }

        private _bet100ButtonClick(event: createjs.MouseEvent): void {
            this._makeBet(100);
        }

        private _spinButtonClick(event: createjs.MouseEvent): void {
            // resets the winnings before each spin
            this._winnings = 0;

            // ensure player has enough money to play
            if (this._playerBet > 0) {
                var bitmap: string[] = this._spinReels();

                for (var reel: number = 0; reel < 3; reel++) {
                    this._reels[reel].image = assets.getResult(bitmap[reel]);
                }

                // calculate the winnings for the current spin
                this._determineWinnings();

                // reset player's bet to zero
                this._playerBet = 0;
                this._betText.text = this._playerBet.toString();
            }
        }
    }
}