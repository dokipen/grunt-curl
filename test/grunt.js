module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    },
    test: {
      all: '*_test.js'
    }
  });

  // Load local tasks.
  grunt.loadTasks('../tasks');

  // Run project task then tests.
  grunt.registerTask('default', 'curl curl-dir test');
};
