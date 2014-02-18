var bs = require("../../../lib/browser-sync");
var messages = require("../../../lib/messages");
var events = require("events");
var browserSync = new bs();
var assert = require("chai").assert;
var sinon = require("sinon");
var options = browserSync.options;

describe("Browser Sync INIT", function () {

    var files = ["**/*.css"],
        portRange = {
            min: 3000,
            max: 4000
        },
        startServices,
        fail;

    before(function () {

        startServices = sinon.stub(browserSync, "startServices");
        fail      = sinon.stub(browserSync, "fail");
        startServices.returns(true);
    });

    afterEach(function () {
        startServices.reset();
        fail.reset();
    });

    after(function () {
        startServices.restore();
        fail.restore();
    });

    describe("returning event emitter", function () {
        it("should return the event emitter", function () {
            var options = {
                ports: portRange
            };
            var bs = browserSync.init(files, options);
            assert.instanceOf(bs, events.EventEmitter);
        });
    });
});