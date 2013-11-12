"use strict";

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: require("./package.json"),
    watch: {
      scripts: {
        files: ['**/*.js', '*.js'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    },
    shell: {
      install: {
        command: 'component install --dev'
      },
      build: {
        command: 'component build --dev'
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
    uglify: {
      target: {
        files: {
          'dist/list.min.js': ['dist/list.js']
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['shell:install', 'shell:build']);
  grunt.registerTask('dist', ['default', 'shell:standalone', 'shell:mkdir', 'shell:move', 'uglify']);
  grunt.registerTask('clean', ['shell:remove']);

  return grunt;
};
