var updateCheck = require("../../lib/update-check");
var fs = require("fs");
var assert = require("chai").assert;
var sinon = require("sinon");

describe("Comparing versions", function () {

    it("should return false when versions match (no update available)", function () {
        var current = "0.5.4";
        var latest = "0.5.4";
        var actual = updateCheck.isOutdated(current, latest);
        assert.isFalse(actual);
    });

    describe("when there is an update available", function () {
        it("should return true when Patch release update is available", function () {
            var current = "0.5.4";
            var latest = "0.5.5";
            var actual = updateCheck.isOutdated(current, latest);
            assert.isTrue(actual);
        });
        it("should return true when PATCH release update is available (2)", function () {
            var current = "0.5.4";
            var latest = "0.5.10";
            var actual = updateCheck.isOutdated(current, latest);
            assert.isTrue(actual);
        });
        it("should return true when MINOR release update is available (2)", function () {
            var current = "0.5.4";
            var latest = "0.6.0";
            var actual = updateCheck.isOutdated(current, latest);
            assert.isTrue(actual);
        });
        it("should return true when MAJOR release update is available (2)", function () {
            var current = "0.5.4";
            var latest = "1.0.0";
            var actual = updateCheck.isOutdated(current, latest);
            assert.isTrue(actual);
        });
    });
});
describe.only("Extracting the latest version from json response", function () {
    var resp; // version 0.5.4
    before(function () {
        resp = fs.readFileSync("./test/fixtures/npm-view1.txt", "UTF-8");
    });
    it("should read the fixture", function () {
        assert.isDefined(resp);
    });
    it("should return the correct version", function () {
        var expected = "0.5.4";
        var actual = updateCheck.extractVersion(resp);
        assert.equal(actual, expected);
    });
    it("should return false if it cannot parse the resp", function () {
        var expected = "0.5.4";
        var actual = updateCheck.extractVersion("wetgwrtg456556534");
        assert.isFalse(actual);
    });
});