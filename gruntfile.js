module.exports = function(grunt){

    'use strict';
    // Grunt Configuration
    grunt.initConfig({
        jshint: {
            all: [ // Run jshint check on these files
                'gruntfile.js', 
                'build/**/*.js', 
                'test/**/*.js'
            ]
        },
        uglify: {
            dist: {
                files: {
                    'dist/js/package.min.js': ['build/js/index.js']
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'build/css/styles.css': 'build/css/styles.scss'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'build/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
        htmlmin: {                                     // Task 
            dist: {                                      // Target 
                options: {                                 // Target options 
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files 
                    'dist/index.html': 'build/index.html'     // 'destination': 'source'
                }
            },
            dev: {                                       // Another target 
                files: {
                    'dist/index.html': 'build/index.html'
                }
            }
        },
        watch: {
            options: {
                dateFormat: function(time) {
                grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
                grunt.log.writeln('Waiting for more changes...');
                },
            },
            scripts: {
                files: [ // Watch these files
                    'gruntfile.js',
                    'build/index.html',
                    'build/js/**/*.js',
                    'build/css/*.scss'
                ],
                tasks: [ // Then run these tasks if one of the files being watched changes
                    'jshint',
                    'uglify',
                    'sass',
                    'cssmin',
                    'htmlmin:dist'
                ]
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dist', 'Compile all the files for production', ['uglify', 'sass', 'cssmin','htmlmin']);

    grunt.registerTask('default', 'The default tasks to run', ['watch']);
};