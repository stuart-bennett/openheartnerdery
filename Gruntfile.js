module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			stuff: ["./src/css", "./build", "/usr/local/var/www/htdocs/"],
			options: { force: true }
		},
		compass: {
			debug: {
				options: {
				}
			},
			prod: {
				options: {
					outputStyle: 'compressed'
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
				tasks: ['clean', 'compass:debug', 'jekyll:debug', 'copy:debug']
			},
			html: {
				files: ['src/*','src/_posts/*','src/_layouts/*'],
				tasks: ['jekyll:debug', 'copy:debug']
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['build:prod']);
	grunt.registerTask('build:debug', ['clean', 'compass:debug', 'jekyll:debug', 'copy:debug']);
	grunt.registerTask('build:prod', ['clean', 'compass:prod', 'jekyll:prod']);
};
