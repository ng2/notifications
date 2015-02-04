module.exports = function (grunt) {
    grunt.initConfig({
            jshint: {
                options: {
                    "node": true,
                    "esnext": true,
                    "bitwise": false,
                    "curly": false,
                    "eqeqeq": true,
                    "eqnull": true,
                    "immed": true,
                    "latedef": true,
                    "newcap": true,
                    "noarg": true,
                    "undef": true,
                    "strict": false,
                    "trailing": true,
                    "smarttabs": true,
                    '-W084': true,
                    globals: {
                        "angular": true,
                        "io": true,
                        "window": true,
                        "Notification": true,
                        "navigator": true,
                        "define": true,
                        "document": true,
                        "Routing": true,
                    }
                },
                all: ['Gruntfile.js', 'providers/**/*.js']
            }
        }
    );

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Grunt Tasks
    grunt.registerTask('default', [
        'jshint',
    ]);
};