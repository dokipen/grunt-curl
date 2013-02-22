/*
 * grunt-curl
 * https://github.com/twolfson/grunt-curl
 *
 * Copyright (c) 2013 Todd Wolfson
 * Licensed under the MIT license.
 */

var fs = require('fs'),
    path = require('path'),
    request = require('request');
    curl = function (url, cb) {
      // Request the url
      console.error('fetching ', url)
      request.get({'url': url, 'encoding': 'binary'}, function (err, res, body) {
        // Callback with the error and body
        cb(err, body);
      });
    }
module.exports = function (grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('curl', 'Download files from the internet via grunt.', function () {
    // Collect the filepaths we need
    var data = this.data,
        src = data.src,
        dest = data.dest,
        done = this.async(),
        that = this;

    // Upcast the srcFiles to an array
    var srcFiles = src;
    if (!Array.isArray(srcFiles)) {
      srcFiles = [src];
    }

    // Asynchronously fetch the files in parallel
    var async = grunt.util.async;
    async.map(srcFiles, curl, curlResultFn);

    function curlResultFn(err, files) {
      // If there is an error, fail
      if (err) {
        return grunt.fail.fatal(err);
      }

      // Concatenate the srcFiles, process the blob through our helper,
      var separator = data.separator || '\n',
          content = files.join(separator);

      // Write out the content
      var destDir = path.dirname(dest);
      grunt.file.mkdir(destDir);
      fs.writeFileSync(dest, content, 'binary');

      // Fail task if errors were logged.
      if (that.errorCount) { return false; }

      // Otherwise, print a success message.
      grunt.log.writeln('File "' + dest + '" created.');

      // Callback
      done();
    }
  });

  var defaultRouter = path.basename;
  grunt.registerMultiTask('curl-dir', 'Download collections of files from the internet via grunt.', function () {
    // Collect the filepaths we need
    var data = this.data,
        src = data.src,
        dest = data.dest,
        router = data.router || defaultRouter,
        done = this.async(),
        that = this;

    // Upcast the srcFiles to an array
    var srcFiles = src;
    if (!Array.isArray(srcFiles)) {
      srcFiles = [src];
    }

    // Iterate over the array and expand the braces
    var minimatch = grunt.file.minimatch,
        braceExpand = minimatch.braceExpand;
    srcFiles = srcFiles.reduce(function expandSrcFiles (retArr, srcFile) {
      var srcFileArr = braceExpand(srcFile);
      retArr = retArr.concat(srcFileArr);
      return retArr;
    }, []);

    // Asynchronously fetch the files in parallel
    var async = grunt.util.async;
    async.map(srcFiles, curl, curlResultFn);

    function curlResultFn(err, files) {
      // If there is an error, fail
      if (err) {
        return grunt.fail.fatal(err);
      }

      // Determine the destinations
      var destArr = srcFiles.map(function getDest (srcFile) {
            // Route the file, append it to dest, and return
            var filepath = router(srcFile),
                retStr = path.join(dest, filepath);
            return retStr;
          });

      // Iterate over each of the files
      files.forEach(function curlWriteFiles (content, i) {
        // Write out the content
        var destPath = destArr[i],
            destDir = path.dirname(destPath);
        grunt.file.mkdir(destDir);
        fs.writeFileSync(destPath, content, 'binary');
      });

      // Fail task if errors were logged.
      if (that.errorCount) { return false; }

      // Otherwise, print a success message.
      grunt.log.writeln('Files "' + destArr.join('", "') + '" created.');

      // Callback
      done();
    }
  });

};
