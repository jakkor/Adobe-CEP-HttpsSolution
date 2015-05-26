/** Sample output folder for OSX. */
var outputFolder = "/Users/editor/Library/Application Support/Adobe/CEP/extensions/https/";

module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    concat: {
      options: {
        separator: ';',
      },
      js_frontend: {
        src: [
          './vendor/jquery/jquery.js',
          './vendor/CSInterface-5.2/index.js',
          './app/**/*.js',
          './ext.js'
        ],
        dest: './assets/app.js',
      },
    },
    watch: {
      javascript: {
        files: [
          'app/**/*.js',
          'ext.js'
        ],
        tasks: ['build'],
        options: {
          nospawn: true
        }
      },
      html: {
        files: [
          'index.html',
        ],
        tasks: ['build'],
      },
      css: {
        files: [
          'assets/style.css',
        ],
        tasks: ['build'],
      }
    },
    uglify: {
      dist: {
        files: {
          './assets/app.js': './assets/app.js'
        }
      }
    },
    copy: {
      dist: {
        files: [
          { src: './index.html', dest: outputFolder},
          { src: './assets/app.js', dest: outputFolder},
          { src: './assets/style.css', dest: outputFolder},
          { src: './CSXS/manifest.xml', dest: outputFolder + '/CSXS/manifest.xml'},
          { expand: true, src: './node_modules/**/*', dest: outputFolder}
        ]
      }
    },
    clean: {
      options: {
        force: true
      },
      dist: [
        outputFolder
      ]
    }
  });

  grunt.registerTask('default', ['clean', 'concat', 'uglify', 'copy', 'watch']);
  grunt.registerTask('build', ['clean', 'concat', 'uglify', 'copy']);
};