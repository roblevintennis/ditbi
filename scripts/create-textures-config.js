#!/usr/bin/env node

// TODO: DRY - this is too similar to create-colors-config.js .. we should
// refactor and combine these two scripts

/**
 * The purpose of this script is to read in all the files from the
 * `textures` subdirectory, and place those in a JavaScript accessible
 * data structure, then write out to a scripts/js/textures.js file for
 * later use by ditbi.
 */
var fs = require('fs');
var path = require('path');
var filedata = '';
var textures = {};

// argv[1] will be path to this script which is in: /full/path/to/<ditbi>/scripts
// we utlize that fact to build a path to our textures dir
console.log("Before setting paths...");
var texturesSource = path.join(path.dirname(process.argv[1]), '../textures');
var texturesDest = path.join(path.dirname(process.argv[1]), 'js/textures.json');
var texturesJSDest = path.join(path.dirname(process.argv[1]), 'js/textures.js');
var textures = readTexturesDir(texturesSource, texturesDest);
var str = JSON.stringify(textures);

console.log("About to write textures as JSON...");
fs.writeFile(texturesDest, str, function(err) {
    if(err) {
        console.log(err);
    }
    // This will additionally write out a textures.js file
    console.log("About to write textures as JavaScript...");
    writeTexturesAsJavascript(texturesDest, texturesJSDest);
});

function readTexturesDir (sourcePath, destPath) {
    var files = fs.readdirSync(sourcePath);
    //textures structure will have each texture found as: {<name>:<path>}
    var textures = {};
    for (var i in files) {
        var currentFile = sourcePath + path.sep + files[i];
        var stats = fs.statSync(currentFile);
        if (stats.isFile()) {
            console.log(currentFile);
            var ext = getExtension(currentFile);
            var name = getFilename(currentFile, '.'+ext);
            var filename = name+'.'+ext;
            if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
                textures[filename] = 'textures/'+filename;
            }
        }
        else if (stats.isDirectory()) {
            readTexturesDir(currentFile);
        }
    }
    return textures;
};

/**
 * Writes out our textures.js file
 */
function writeTexturesAsJavascript(jsonSrcPath, destPath) {
    var json = fs.readFileSync(jsonSrcPath, "utf8");
    // Prepare and write a loadable JavaScript file that creates a _texturez namespace
    var templateStart = 'var _texturez = (function () {\nreturn ';
    var templateEnd = ';\n})();';
    var content = templateStart + json + templateEnd;
    console.log("--- Writing out Textures JavaScript ---");
    fs.writeFile(destPath, content, function(err) {
        if(err) {
            console.log("Issue creating final textures JavaScript file: ", err);
        } else {
            console.log("Textures JavaScript written to: ", destPath);
        }
    });
}

function getExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

function getFilename(filename, ext) {
    return path.basename(filename, ext);
}

