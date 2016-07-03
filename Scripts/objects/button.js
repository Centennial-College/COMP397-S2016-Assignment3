/**
 * File name: button.ts
 * @Author: Kevin Ma
 * Student #: 300867968
 * @Date: July 3, 2016
 *
 * @Description: This class is used as a GUI button control.
 *
 * Version: 0.14 - added checks to disable betting and spin buttons when appropiate
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
     * A utility used to create GUI button controls
     *
     * @class Button
     * @extends createjs.Bitmap
     */
    var Button = (function (_super) {
        __extends(Button, _super);
        //CONSTRUCTOR
        function Button(pathString, x, y, isCentered) {
            _super.call(this, assets.getResult(pathString));
            this.isCentered = isCentered;
            this.x = x;
            this.y = y;
            this.width = 150;
            this.height = 50;
            if (this.isCentered) {
                this.regX = this.width * 0.5;
                this.regY = this.height * 0.5;
            }
            this.on("mouseover", this.overButton, this);
            this.on("mouseout", this.outButton, this);
        }
        // PUBLIC METHODS
        // Disable the button
        Button.prototype.DisableButton = function () {
            this.alpha = 0.7;
            this.mouseEnabled = false;
        };
        // Enable the button to be clicked
        Button.prototype.EnableButton = function () {
            this.alpha = 1.0;
            this.mouseEnabled = true;
        };
        // PRIVATE METHODS
        // Event Handler for mouse over
        Button.prototype.overButton = function (event) {
            event.currentTarget.alpha = 0.7;
        };
        // Event Handler for mouse out
        Button.prototype.outButton = function (event) {
            event.currentTarget.alpha = 1.0;
        };
        return Button;
    }(createjs.Bitmap));
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=button.js.map