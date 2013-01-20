/*global module:false*/
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Project configuration.
    grunt.initConfig({
        copy: {
            dist: {
                files: {
                    '../bbtk-server/target/bb-toolkit/': 'app/**'
                }
            }
        },
        jshint: {
            all: [
                'app/js/controllers/**/*.js',
                'app/js/directives/**/*.js',
                'app/js/routes/**/*.js',
                'app/js/services/**/*.js',
                'app/js/main.js',
                'app/js/bbtk.js',
                'app/js/bbtkApp.js'
            ],
            options: {
                "browser": true,
                "trailing": true,
                "strict": true,
                "jquery": true,
                "curly": true,
                "camelcase": true,
                "eqeqeq": true,
                "eqnull": true,
                "immed": true,
                "latedef": true,
                "newcap": true,
                "noarg": true,
                "undef": true,
                "smarttabs": true,
                globals: {
                    "define": true,
                    "require": true
                }
            }


        },

        watch: {
            dev: {
                files: 'app/**/*',
                tasks: ['jshint','copy:dist'],
                options: {   //grunt-contrib-watch issue #13 requires this. https://github.com/gruntjs/grunt-contrib-watch/issues/13
                    forceWatchMethod: 'old'
                }

            },
            scripts: { //grunt-contrib-watch issue #13 requires this. https://github.com/gruntjs/grunt-contrib-watch/issues/13
                files: 'app/js/**/*.js',
                tasks: ['jshint']
            }
        },

        requirejs: {
            compile: {
                options: {
                    appDir: 'app',
                    baseUrl: 'js',
                    dir: 'build',
                    mainConfigFile: 'app/js/requireConfig.js',
                    modules: [
                        {name: 'main'},
                        {name: 'bbtk'}
                    ]
                }
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('build', ['jshint', 'requirejs']);
    grunt.registerTask('dev', ['watch:dev']);

};
