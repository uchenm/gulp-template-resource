/**
 * Created by Ming on 2016/1/15.
 */
'use strict';
var es = require('event-stream');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var header = require('gulp-header');
var footer = require('gulp-footer');
var path = require('path');

var TEMPLATE_HEADER = 'angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {\n\n';
var TEMPLATE_BODY = '$templateCache.put("<%= url %>",<%= contents %>);';
var TEMPLATE_FOOTER = '\n\n}]);';
var DEFAULT_FILENAME = 'templates.js';
var DEFAULT_MODULE = 'templates';


var templateFiles = function (options) {
    var normalizeName = function (name) {
        return name.replace(/\\/g, '/');
    }
    var getUrl = function (file) {
        file.path = path.normalize(file.path);
        var root = options.root||"";

        var url = path.join(root, file.path.replace(file.base, ''));
        if (root === '.' || root.indexOf('./') === 0) {
            url = './' + url;
        }
        return normalizeName(url);
    };
    var handleResourceFile = function (file, callback) {
        var template = options.templateBody || TEMPLATE_BODY;
        var url = getUrl(file);
        //Create buffer
        file.contents = new Buffer(gutil.template(template, {
            url: url,
            contents: file.contents,
            file: file
        }));
        //file.processedByTemplateCache = true;
        callback(null, file);
    };
    return handleResourceFile;
}
var templateResource = function (filename, options) {
    //Prepare options
    if (typeof filename === 'string') {
        options = options || {};
    } else {
        options = filename || {};
        filename = options.filename || DEFAULT_FILENAME;
    }
    console.log("templateCache===========", filename, options);
    //Prepare header / footer
    var templateHeader = options.templateHeader || TEMPLATE_HEADER;
    var templateFooter = options.templateFooter || TEMPLATE_FOOTER;
    console.log("templateHeader===========", templateHeader);
    console.log("templateFooter===========", templateFooter);
    //Build templateCache
    return es.pipeline(
        //templateCacheStream(options.root || '', options.base, options.templateBody, options.transformUrl),
        es.map(templateFiles(options)),
        concat(filename),
        header(templateHeader, {
            module: options.module || DEFAULT_MODULE,
            standalone: options.standalone ? ', []' : ''
        }),
        footer(templateFooter, {
            module: options.module || DEFAULT_MODULE
        })
    );

};


/**
 * Expose templateCache
 */

module.exports = templateResource;

