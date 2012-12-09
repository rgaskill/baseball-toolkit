/*global module:false*/
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Project configuration.
    grunt.initConfig({
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
            scripts: {
                files: 'app/js/**/*.js',
                tasks: ['jshint']
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['jshint']);

};
