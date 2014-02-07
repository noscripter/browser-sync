var browserSync = require("browser-sync");

browserSync.init("css/*.css").then(function (bsObj) {
    console.log(bsObj.getSnippet());
});
