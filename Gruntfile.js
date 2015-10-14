/**
 * Export this module if in the future
 * we modify or need it to other modules
 */
module.exports = function(grunt) {
	/**
	 * Grunt init config
	 * our tasks
	 */
	grunt.initConfig({
		watch: {
			files: ['Gruntfile.js','src/_assets/js/*.js'],
			tasks: ['concat'],
			options: {
				spawn: false,// speed up the reaction time
				reload: true
			},
		},//watch
		concat: {
			dist: {
				src: ['src/_assets/js/index.js', 'src/_assets/js/index1.js'],
				dest: 'dest/js/build.js',
			},
		},//concat
		jade: {
			compile: {
				files: {
					"dest/*" : ["src/jade/*jade",]
				}
			}
		},//jade
		sass: {
			dist: {
				options: {
					style: 'expanded'
				}
			},
			files: {
			  'main.css': 'main.sass',
			},
		}
	});
	/**
	 * Load Tasks
	 */
	grunt.loadNpmTasks('grunt-contrib-concat');
	/// not configured yet
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	/**
	 * Default task
	 * configure
	 */
	grunt.registerTask('default',['concat']);
};



