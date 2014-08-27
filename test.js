/*!
 * parse-files <https://github.com/jonschlinkert/parse-files>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var matter = require('gray-matter');
var utils = require('parser-utils');
var _ = require('lodash');
var Parsers = require('./');


describe('.parseFiles()', function() {
  it('should parse a glob of files.', function (done) {
    var parsers = new Parsers();

    parsers.register('md', function md (file, next) {
      file = utils.extendFile(file);
      _.merge(file, matter(file.content));
      next(null, file);
    });

    parsers.parseFiles('fixtures/*.md', function (err, files) {
      if (err) {
        console.log(err);
      }

      files.should.be.an.array;
      done();
    });
  });
});

describe('.parseFilesSync()', function() {
  it('should parse a glob of files.', function () {
    var parsers = new Parsers();

    parsers.register('md', function md (file, next) {
      file = utils.extendFile(file);
      _.merge(file, matter(file.content));
      next(null, file);
    });

    var files = parsers.parseFiles('fixtures/*.md');
    console.log(files)
    files.should.be.an.array;
  });
});