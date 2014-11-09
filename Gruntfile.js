module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			stuff: [
				"./build",
				"/usr/local/var/www/htdocs/"],
			options: { force: true }
		},
		sass: {
			debug: {
				files:  {
					'./build/css/base.css': './src/sass/base.scss'
				}
			},
			prod: {
				options: {
					style: 'compressed'
				},
				files: {
					'./build/css/base.css': './src/sass/base.scss'
				}
			}
		},
		jekyll: {
			debug: {
				src: 'src',
				dest: './build'
			},
			prod: {
				src: './src',
				dest: './build'
			}
		},
		watch: {
			css: {
				files: ['src/_posts/*', 'src/sass/**/*.scss'],
				tasks: ['build:debug']
			},
			html: {
				files: ['src/*','src/_posts/*','src/_layouts/*'],
				tasks: ['build:prod']
			}
		},
		copy: {
			debug: {
				cwd: './build',
				src: ['**'],
				dest: '/usr/local/var/www/htdocs/',
				expand: true
			},
			prod: {
				cwd: './build',
				src: ['**'],
				dest: '/usr/local/var/www/htdocs/',
				expand: true
			}
		},
		requirejs: {
			compile: {
					options: {
					baseUrl: "./src/javascript",
					name: 'main',
					out: './build/javascript/main.js'
				}
			}
		},
		uglify: {
			libs: {
				files: {
					'./build/javascript/require.js': ['./bower_components/requirejs/require.js']
				}
			}
		},
		jshint: {
			all: ['Gruntfile.js', './src/javascript/**/*']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['build:prod']);
	grunt.registerTask('build:debug', ['clean', 'jshint', 'jekyll:debug', 'sass:debug', 'requirejs', 'uglify:libs', 'copy:debug']);
	grunt.registerTask('build:prod', ['clean', 'jshint', 'jekyll:prod', 'sass:debug', 'requirejs', 'uglify:libs', 'copy:prod']);
};
