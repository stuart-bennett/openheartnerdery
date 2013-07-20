module.exports = function(grunt) {
	grunt.initConfig({
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
				dest: 'C:\\inetpub\\wwwroot'
			},
			prod: {
				src: './src',
				dest: 'C:\\webapps\\mysite'
			}
		},
		jslint: {
			files: [
				'src/scripts/*.js'
			]
		},
		watch: {
			javascriptQualityCheck: {
				files: ['src/scripts/*.js'],
				tasks: ['jslint', 'jekyll:debug']
			},
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

	grunt.loadNpmTasks('grunt-jslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('debug', ['jslint', 'compass:debug', 'jekyll:debug']);
	grunt.registerTask('prod', ['jslint', 'compass:prod', 'jekyll:prod']);
};