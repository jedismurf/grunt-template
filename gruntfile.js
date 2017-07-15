module.exports = function(grunt){

    'use strict';
    // Grunt Configuration
    grunt.initConfig({
        config: {
            buildDirectory: 'build',
            productionDirectory: 'dist'
        },
        jshint: {
            all: [ // Run jshint check on these files
                'gruntfile.js', 
                '<%= config.buildDirectory %>/**/*.js'
            ]
        },
        concat: {
            dist: {
                src: ['<%= config.buildDirectory %>/js/**/*.js'],
                dest: '<%= config.productionDirectory %>/js/package.js',
            },
        },
        uglify: {
            dist: {
                files: {
                    '<%= config.productionDirectory %>/js/package.min.js': ['<%= config.productionDirectory %>/js/package.js']
                }
            }
        },
        sass: {
            dist: {
                files: {
                    '<%= config.productionDirectory %>/css/styles.css': '<%= config.buildDirectory %>/css/styles.scss'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config.productionDirectory %>/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.productionDirectory %>/css',
                    ext: '.min.css'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '<%= config.productionDirectory %>/index.html': '<%= config.buildDirectory %>/index.html'
                }
            },
            dev: {
                files: {
                    '<%= config.productionDirectory %>/index.html': '<%= config.buildDirectory %>/index.html'
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
                    '<%= config.buildDirectory %>/index.html',
                    '<%= config.buildDirectory %>/js/**/*.js',
                    '<%= config.buildDirectory %>/css/*.scss'
                ],
                tasks: [ // Then run these tasks if one of the files being watched changes
                    'jshint',
                    'concat',
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dist', 'Compile all the files for production', ['concat', 'uglify', 'sass', 'cssmin','htmlmin']);

    grunt.registerTask('default', 'The default tasks to run', ['watch']);
};