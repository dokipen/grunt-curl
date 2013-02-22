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
exports['curl'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'js': function(test) {
    test.expect(1);
    // tests here
    var expectedContent = grunt.file.read('test/expected/file.js'),
        actualContent = grunt.file.read('test/actual/file.js');
    test.equal(actualContent, expectedContent, 'should return the correct value.');
    test.done();
  },
  'zip': function(test) {
    test.expect(1);
    // tests here
    var expectedContent = fs.readFileSync('test/expected/file.zip', 'binary'),
        actualContent = fs.readFileSync('test/actual/file.zip', 'binary');
    test.equal(actualContent, expectedContent, 'should return the correct value.');
    test.done();
  }
};
