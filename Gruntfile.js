module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 
              'app/assets/javascripts/controllers/*.js',
              'app/assets/javascripts/directives/*.js',
              'app/assets/javascripts/filters/*.js',
              'app/assets/javascripts/services/*.js',
              'app/assets/javascripts/main.js',
              ],

      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  // grunt.registerTask('default', ['uglify']);
  grunt.registerTask('test', ['jshint']);

};
