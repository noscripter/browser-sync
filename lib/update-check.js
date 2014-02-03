var sys = require("sys");
var fs = require("fs");
var exec = require("child_process").exec;
var q = require("q");
var child;

module.exports = {
    /**
     * @param {Object} pjson
     * @returns {Q.promise}
     */
    checkForUpdate: function (current) {

        var deferred = q.defer();
        var isOutdated = this.isOutdated;
        var extractVersion = this.extractVersion;

        this.hasInternetConnection().then(function () {
            child = exec("npm view browser-sync", function (error, stdout, stderr) {
                var latest = extractVersion(stdout);

                if (latest) {
                    if (isOutdated(current, latest)) {
                        deferred.resolve(latest);
                    }
                }
            });
        }, function () {
            // No Internet, reject the promise
            deferred.reject();
        });

        // executes `pwd`

        return deferred.promise;
    },
    /**
     *
     */
    hasInternetConnection: function () {
        var deferred = q.defer();

        require('dns').resolve('www.google.com', function(err) {
            if (err) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    },
    /**
     * @param {String} resp
     * @returns {Boolean|String}
     */
    extractVersion: function (resp) {
        var regex = /'dist-tags': ?\{ ?latest: ?'(.+)' ?\}/;
        var match = regex.exec(resp);
        if (match) {
            return match[1];
        }
        return false;
    },
    /**
     * @param {String} current
     * @param {String} latest
     */
    isOutdated: function (current, latest) {
        var currentSplit = current.split(".");
        var latestSplit = latest.split(".");
        var isOutdated = false;

        currentSplit.forEach(function (item, i) {
            if (parseInt(item, 10) < parseInt(latestSplit[i])) {
                isOutdated = true;
            }
        });

        return isOutdated;
    }
};