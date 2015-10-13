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
		concat: {
			options: {
				separator: ";",
			},
			dist: {
				src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
				dest: 'dist/build.js',
			},
		},
	});
	/**
	 * Load Tasks
	 */
	grunt.loadNpmTasks('grunt-contrib-conta');
};



