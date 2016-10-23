module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
  pkg: require("./package.json"),
  watch: {
    scripts: {
      files: ['src/*.js', 'src/utils/*.js', '*.js', 'test/*.html', 'test/*.js'],
      tasks: ['test'],
      options: {
        spawn: false,
      },
    },
  },
  shell: {
    build: {
      command: 'node_modules/browserify/bin/cmd.js index.js > dist/list.js',
      options: {
        stderr: true
      }
    },
    remove: {
      command: 'rm -fr node_modules dist'
    }
  },
  jshint: {
    code: {
    src: ['Gruntfile.js', '*.js', 'src/*.js', 'src/utils/*.js'],
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
  file_append: {
    default_options: {
      files: [
        {
          prepend: "// List.js v<%= pkg.version %> (<%= pkg.homepage %>) by <%= pkg.author.name %> (<%= pkg.author.url %>)\n",
          input: 'dist/list.min.js'
        },
        {
          prepend: "// List.js v<%= pkg.version %> (<%= pkg.homepage %>) by <%= pkg.author.name %> (<%= pkg.author.url %>)\n",
          input: 'dist/list.js'
        }
      ]
    }
  },
  mocha: {
    test: {
      src: [ 'test/index.html' ],
      options: {
        run: true,
        timeout: 10000,
        bail: false,
        log: true,
        logErrors: true,
        reporter: 'Nyan'
      }
    }
  }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-file-append');

  grunt.registerTask('mkdir', function() { grunt.file.mkdir("dist"); });
  grunt.registerTask('default', ['jshint:code', 'jshint:tests', 'mkdir', 'shell:build']);
  grunt.registerTask('dist', ['default', 'mkdir', 'shell:build', 'uglify', 'file_append']);
  grunt.registerTask('clean', ['shell:remove']);
  grunt.registerTask('test', ['dist', 'mocha']);

  return grunt;
};
