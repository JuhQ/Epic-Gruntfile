module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'routes/*.js', 'public/**/*.js', '!public/js/libs/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      }
    },
    coffee: {
      glob_to_multiple: {
        expand: true,
        cwd: 'coffeescript',
        src: ['**/*.coffee'],
        dest: '',
        ext: '.js'
      }
    },
    coffeelint: {
      app: ['coffeescript/**/*.coffee'],
      options: {
        "max_line_length": {
          "value": 140
        }
      }
    },
    less: {
      development: {
        files: {
          "public/css/styles.css": "less/*.less"
        }
      }
    },
    watch: {
      src: {
        files: ['coffeescript/**/*.coffee', 'less/*.less', 'Gruntfile.js'], // Remove Gruntfile.js if it's in coffeescript to avoid infinite loop
        tasks: ['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['coffeelint', 'coffee', 'jshint', 'less']);

};