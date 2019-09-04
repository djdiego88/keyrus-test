// Load Grunt
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Tasks
        connect: {
            server: {
              options: {},
            }
        },
        sass: { // Begin Sass Plugin
            dist: {
                options: {
                    style: 'compressed',
                },
                files: {
                    'dist/css/style.min.css' : 'sass/main.scss'
                }
            }
        },
        uglify: { // Begin JS Uglify Plugin
            dist: {
                files: {
                    'dist/js/script.min.js': [
                        'node_modules/jquery/dist/jquery.min.js',
                        'node_modules/popper.js/dist/umd/popper.min.js',
                        'node_modules/bootstrap/dist/js/bootstrap.min.js',
                        'js/main.js'
                    ]
                }
            }
        },
        watch: { // Compile everything into one task with Watch Plugin
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            js: {
                files: '**/*.js',
                tasks: ['uglify']
            }
        }
    });
    // Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Register Grunt tasks
    grunt.registerTask('default', ['sass','uglify']);
    // Register dev task
    grunt.registerTask('dev', ['connect', 'sass','uglify', 'watch']);
};