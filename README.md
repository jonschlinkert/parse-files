# parse-files [![NPM version](https://badge.fury.io/js/parse-files.svg)](http://badge.fury.io/js/parse-files)


> Complimentary lib to parser-cache. Extends the `Parsers` prototype with additional methods for reading files from the file system.

## Install
#### Install with [npm](npmjs.org):

```bash
npm i parse-files --save-dev
```

## Usage

```js
var Parsers = require('parse-files');
var parsers = new Parsers();
```

## API
### [.parseFile](index.js#L28)

Asynchronously read and parse a file at the given `filepath` and callback `next(err, str)`.

* `filepath` **{String}**: The file to parse.    
* `options` **{Object|Function}**: or next function.    
* `next` **{Function}**: Callback function.    

**Example:**

```js
parsers.parseFile('docs/abc.md', function (err, file) {
  console.log(file);
});
```

### [.parseFiles](index.js#L66)

Synchronously read and parse a glob of files from the given `patterns` and callback `next(err, str)`. Options are passed to [globby] and `.parseFile()`.

* `glob` **{String}**: Glob patterns to use for files to parse.    
* `options` **{Object|Function}**: or next function.    
* `next` **{Function}**: Callback function.    

**Example:**

```js
parsers.parseFiles('docs/*.md', function (err, files) {
  console.log(files);
});
```

## Related

* [parser-cache](https://github.com/jonschlinkert/parser-cache)
* [parser-noop](https://github.com/jonschlinkert/parser-noop)
* [parser-front-matter](https://github.com/jonschlinkert/parser-front-matter)

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on August 27, 2014._


[gray-matter]: https://github.com/jonschlinkert/gray-matter
[globby]: https://github.com/sindresorhus/globby