module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    pkg: require("./package.json"),
    watch: {
      scripts: {
        files: ['{,*/}*.js', '*.js', 'test/*.html', 'test/*.js'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    },
    shell: {
      install: {
        command: 'component install --dev',
        options: {
          stderr: true
        }
      },
      build: {
        command: 'component build --dev',
        options: {
          stderr: true
        }
      },
      standalone: {
        command: 'component build --standalone List -n list.standalone'
      },
      mkdir: {
        command: 'mkdir -p dist'
      },
      move: {
        command: 'mv build/list.standalone.js dist/list.js'
      },
      remove: {
        command: 'rm -fr build components dist'
      }
    },
    jshint: {
      code: {
        src: ['Gruntfile.js', '*.js', 'src/*.js'],
        options: {
          expr: true,
          multistr: false,
          globals: {
            module: true
          }
        }
      },
      tests: {
        src: ['test/(*|!mocha).js'],
        options: {
          expr: true,
          multistr: true,
          globals: {
            jQuery: true,
            module: true
          }
        }
      }
    },
    uglify: {
      target: {
        files: {
          'dist/list.min.js': ['dist/list.js']
        }
      }
    },
    mocha: {
      cool: {
        src: [ 'test/index.html' ],
        options: {
          run: true,
          timeout: 10000,
          bail: false,
          log: true,
          reporter: 'Nyan',
          mocha: {
            ignoreLeaks: false
          }
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('default', ['jshint:code', 'jshint:tests', 'shell:install', 'shell:build']);
  grunt.registerTask('dist', ['default', 'shell:standalone', 'shell:mkdir', 'shell:move', 'uglify']);
  grunt.registerTask('clean', ['shell:remove']);

  grunt.registerTask('test', ['mocha']);

  return grunt;
};
