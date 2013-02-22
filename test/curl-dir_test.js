var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var fs = require('fs');
exports['curl-dir'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'multi': function(test) {
    test.expect(2);
    // tests here
    var expectedLabContent = grunt.file.read('test/expected/file.js'),
        actualLabContent = grunt.file.read('test/actual/multi/LAB.min.js');
    test.equal(actualLabContent, expectedLabContent, 'should return the correct value for LAB.min.js.');

    var expectedCookiejarContent = grunt.file.read('test/expected/cookiejar.js'),
        actualCookiejarContent = grunt.file.read('test/actual/multi/cookiejar.js');
    test.equal(actualLabContent, expectedLabContent, 'should return the correct value for cookiejar.js.');

    test.done();
  },
  'braceExpansion': function(test) {
    test.expect(2);
    // tests here
    var expectedLabContent = grunt.file.read('test/expected/file.js'),
        actualLabContent = grunt.file.read('test/actual/braceExpansion/LAB.min.js');
    test.equal(actualLabContent, expectedLabContent, 'should return the correct value for LAB.min.js.');

    var expectedCookiejarContent = grunt.file.read('test/expected/cookiejar.js'),
        actualCookiejarContent = grunt.file.read('test/actual/braceExpansion/cookiejar.js');
    test.equal(actualLabContent, expectedLabContent, 'should return the correct value for cookiejar.js.');

    test.done();
  },
  'router': function(test) {
    test.expect(2);
    // tests here
    var expectedLabContent = grunt.file.read('test/expected/file.js'),
        actualLabContent = grunt.file.read('test/actual/router/ajax/libs/labjs/2.0.3/LAB.min.js');
    test.equal(actualLabContent, expectedLabContent, 'should return the correct value for LAB.min.js.');

    var expectedCookiejarContent = grunt.file.read('test/expected/cookiejar.js'),
        actualCookiejarContent = grunt.file.read('test/actual/router/ajax/libs/cookiejar/0.5/cookiejar.js');
    test.equal(actualLabContent, expectedLabContent, 'should return the correct value for cookiejar.js.');

    test.done();
  }
};
