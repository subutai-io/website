var key = process.argv[2];
var date = process.argv[3];
var filename = key + ".json"
var cn;
var uid;

var DESCRIPTORS_PATH = "/project-descriptors/projects/";
var POSTS_PATH = "/ssf/_posts/projects/";

var fs = require("fs");
var CURL = require("node-curl");
var async = require("async");
var util = require("util");
var YAML = require('yamljs');
var J2Y = require('json2yaml');


var jekyllProperties = {
    "layout" : "profile",
    "categories" : "members"
};


async.parallel([
    function( callback ) {
        callback();
    },
    function( callback ) {
        console.log( key, " ", date );
    }
], function( err ) {

});