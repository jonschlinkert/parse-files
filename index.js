var fs = require('fs');
var path = require('path');
var glob = require('globby');
var async = require('async');
var _ = require('lodash');

var Parsers = require('parser-cache');


/**
 * Asynchronously read and parse a file at the given `filepath` and
 * callback `next(err, str)`.
 *
 * **Example:**
 *
 * ```js
 * parsers.parseFile('docs/abc.md', function (err, file) {
 *   console.log(file);
 * });
 * ```
 *
 * @param {String} `filepath` The file to parse.
 * @param {Object|Function} `options` or next function.
 * @param {Function} `next` Callback function.
 * @api public
 */

Parsers.prototype.parseFile = function parseFile(filepath, options, next) {
  if (typeof options === 'function') {
    next = options;
    options = {};
  }

  var opts = _.extend({}, options);

  try {
    var stack = this.get(path.extname(filepath));
    var str = fs.readFileSync(filepath, 'utf8');

    this.parse({content: str}, stack, next);
  } catch (err) {
    next(err);
    return;
  }
};


/**
 * Synchronously read and parse a glob of files from the given `patterns`
 * and callback `next(err, str)`. Options are passed to [globby] and `.parseFile()`.
 *
 * **Example:**
 *
 * ```js
 * parsers.parseFiles('docs/*.md', function (err, files) {
 *   console.log(files);
 * });
 * ```
 *
 * @param {String} `glob` Glob patterns to use for files to parse.
 * @param {Object|Function} `options` or next function.
 * @param {Function} `next` Callback function.
 * @api public
 */

Parsers.prototype.parseFiles = function(patterns, options, next) {
  if (!patterns.length) {
    next(null, []);
    return;
  }

  if (typeof options === 'function') {
    next = options;
    options = {};
  }

  var opts = _.extend({}, options);
  var self = this;

  glob(patterns, opts, function (err, files) {
    if (err) {
      next(err);
      return;
    }

    async.series(files.map(function (fp) {
      return function (cb) {
        self.parseFile(fp, options, cb);
      };
    }), next);
  });
};


module.exports = Parsers;
