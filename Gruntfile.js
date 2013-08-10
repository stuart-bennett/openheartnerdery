module.exports = function(grunt) {
	grunt.initConfig({
		clean: ["./src/css", "./build"],
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
				files: ['src/sass/shared/modules/*.scss','src/sass/shared/*.scss','src/sass/*.scss'],
				tasks: ['compass:debug', 'jekyll:debug']
			},
			html: {
				files: ['src/*','src/_posts/*','src/_layouts/*'],
				tasks: ['jekyll:debug']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['build:prod']);
	grunt.registerTask('build:debug', ['clean', 'compass:debug', 'jekyll:debug']);
	grunt.registerTask('build:prod', ['clean', 'compass:prod', 'jekyll:prod']);
};