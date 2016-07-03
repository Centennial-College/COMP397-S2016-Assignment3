/**
 * File name: asset.ts
 * @Author: Kevin Ma
 * Student #: 300867968
 * @Date: July 1, 2016
 * 
 * @Description: This file is as a template for assets of the project.
 * 
 * Version: 0.3 - changed to shorthand notation for declaring instance variables in asset class
 */

/**
 * Provides the base Object namespace
 * 
 * @module objects
 */
module objects {
    /**
     * A utility used to store assets belonging to the project.
     * 
     * @class Asset
     */
    export class Asset {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++
        constructor(public id: string, public src: string) {}
    }
}