"use strict";

var fs          = require("fs");
var globWatcher = require("glob-watcher");
var _           = require("lodash");

/**
 * Plugin interface
 * @returns {*|function(this:exports)}
 */
module.exports.plugin = function (glob, opt, emitter) {



    // array of tasks given
//    if (Array.isArray(fn)) {
//        return vfs.watch(glob, opt, function () {
//            this.start.apply(this, fn);
//        }.bind(this));
//    }

    return globWatcher(glob, opt, function (data) {
        return true;
    });
};