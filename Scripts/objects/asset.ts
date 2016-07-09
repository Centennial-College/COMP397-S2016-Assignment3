/**
 * @file asset.ts
 * @author Kevin Ma kma45@my.centennialcollge.ca
 * @studentID 300867968
 * @date July 8, 2016
 * @description This file is the prototype for an asset of the project.
 * @version 0.15.03 - added comments to asset.ts
 */

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * This is the generic objects namespace
 * 
 * @module objects
 */
module objects {
    /**
     * This simple Asset class only contains a constructor  
     * 
     * @export
     * @class Asset
     */
    export class Asset {
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Asset.
         * 
         * @param {string} id
         * @param {string} src
         */
        constructor(public id: string, public src: string) {}
    }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++