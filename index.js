var fs = require('fs');
var path = require('path');
var glob = require('globby');
var async = require('async');
var _ = require('lodash');

var Parsers = require('parser-cache');


/**
 * Asynchronously read a file at the given `filepath` and
 * callback `next(err, str)`.
 *
 * @param {String} `path`
 * @param {Object|Function} `options` or next function.
 * @param {Function} `next`
 * @api public
 */

Parsers.prototype.parseFile = function parseFile(filepath, options, next) {
  if (typeof options === 'function') {
    next = options;
    options = {};
  }

  var opts = _.extend({}, options);

  try {
    var str = fs.readFileSync(filepath, 'utf8');
    this.parse(str, opts, next);
  } catch (err) {
    next(err);
    return;
  }
};


/**
 * Synchronously read and parse a glob of files from the given `patterns`
 * and callback `next(err, str)`. Options are passed to [globby] and `.parseSync()`.
 *
 * @param {String} `path`
 * @param {Object|Function} `options` or next function.
 * @param {Function} `next`
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
      var stack = self.get(path.extname(fp));
      var str = fs.readFileSync(fp, 'utf8');
      return function (cb) {
        self.parse({content: str}, stack, cb);
      };
    }), next);
  });
};


module.exports = Parsers;
