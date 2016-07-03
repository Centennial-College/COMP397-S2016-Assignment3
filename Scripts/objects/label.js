/**
 * File name: label.ts
 * @Author: Kevin Ma
 * Student #: 300867968
 * @Date: July 2, 2016
 *
 * @Description: This class is used as a GUI control that displays text.
 *
 * Version: 0.12 - updated UI, implemented betting and spinning mechanism
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
     * A utility used to create GUI labels
     *
     * @class Label
     * @extends createjs.Text
     */
    var Label = (function (_super) {
        __extends(Label, _super);
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++++++++++++
        function Label(labelString, labelFont, labelColour, x, y, isCentered) {
            _super.call(this, labelString, labelFont, labelColour);
            if (isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getBounds().height * 0.5;
            }
            this.x = x;
            this.y = y;
        }
        return Label;
    }(createjs.Text));
    objects.Label = Label;
})(objects || (objects = {}));
//# sourceMappingURL=label.js.map