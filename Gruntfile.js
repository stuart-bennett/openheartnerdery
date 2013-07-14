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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.registerTask('default', ['compass:debug', 'jekyll:debug']);
	grunt.registerTask('prod', ['compass:prod', 'jekyll:prod'])
};