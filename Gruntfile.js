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
      glob_to_multiple: 
        {
          expand: true,
          cwd: 'less',
          src: ['**/*.less', '!mixins.less'],
          dest: 'public/css/',
          ext: '.css'
        }
    },
    watch: {
      src: {
        files: ['coffeescript/**/*.coffee', 'less/*.less', 'Gruntfile.js'], // Remove Gruntfile.js if it's in coffeescript to avoid infinite loop
        tasks: ['default']
      }
    },
    requirejs: {
      compile: {
        options: {
          mainConfigFile: "requirejs.config.js",
          appDir: "public/js",
          baseUrl: "/",
          dir: "public/js/js-build",
          findNestedDependencies: true,
          optimizeCss: "none",
          fileExclusionRegExp: /^\.|favicon.ico|images|css|js-build/,
          optimize: "uglify",
          modules: [
            {
              name: "main"
            }
          ],

          done: function(done, output) {
            var duplicates = require('rjs-build-analysis').duplicates(output);

            if (duplicates.length > 0) {
              grunt.log.subhead('Duplicates found in requirejs build:');
              grunt.log.warn(duplicates);
              done(new Error('r.js built duplicate modules, please check the excludes option.'));
            }

            done();
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task(s).
  grunt.registerTask('default', ['coffeelint', 'coffee', 'jshint', 'less']);
  grunt.registerTask('build', ['requirejs']);

};
