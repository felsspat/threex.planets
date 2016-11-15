module.exports = function (grunt) {
    require('jit-grunt')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: true, yuicompress: true, optimization: 2,
                    plugins : [ new (require('less-plugin-autoprefix'))({browsers : [ "last 2 versions" ]}) ]
                },
                files: {
                    "dist/css/style.css" : "src/less/style.less"
                }
            }
        }, uglify: {
            my_target: {
                files: {
                    'dist/js/main.min.js': ['node_modules/jquery/dist/jquery.js', 'src/js/main.js']
                }
            }
        }, jshint: {
            files: ['Gruntfile.js', 'src/js/**/*.js'],
            options: {
                esnext: true,
                globals: {
                    jQuery: true
                }
            }
        }, minifyHtml: {
            options: {
                cdata: true
            },
            dist: {
                files: {
                    'dist/index.html': 'src/html/index.htm'
                }
            }
        }, watch: {
            styles: {
                files: ['src/less/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }, concurrent: {
            html: ['newer:minifyHtml'],
            js: ['newer:jshint', 'newer:uglify'],
            css: ['newer:less']
        }, connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.',
                    keepalive: true
                }
            }
        }, copy: {
            main: {
                expand: true,
                cwd: 'dist',
                src: '**',
                dest: 'docs/'
                }
        }
        /*
         webfont: { // Erstellt im Buildprozess eine Schriftart aus SVG-Dateien
         icons: {
         src: '../../temp/*.svg',
         dest: '../../' + grunt.option('dest'),
         options: {
         fontFilename: 'icons',
         stylesheet: 'less',
         htmlDemo: 'true',
         relativeFontPath: '/'+grunt.option('dest'),
         template: 'grunt-webfont-template.css'
         }
         }
         }, svgstore: { // SVG Sprite erstellen. Wird bisher wenn überhaupt nur manuell ausgeführt
         default: {
         files: {
         'dest/dest.svg': ['../../temp/*.svg'],
         },
         },
         options: {
         includedemo: true,
         inheritviewbox: true,
         svg: {
         xmlns: 'http://www.w3.org/2000/svg'
         }
         }
         }*/
    });
    //grunt.registerTask('svgsprite', ['svgstore']);
    grunt.registerTask('default', ['concurrent:html', 'concurrent:js', 'concurrent:css']);
    grunt.registerTask('publish', ['copy']);
    grunt.registerTask('server', ['connect']);
};
