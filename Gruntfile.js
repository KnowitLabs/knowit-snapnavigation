'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('SnapNavigation.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		clean: {
			files: ['dist']
		},
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: ['src/js/snapQuickSearch.js', 'src/js/SnapNavigation.js'],
				dest: 'dist/js/SnapNavigation.js'
			},
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'dist/js/SnapNavigation.min.js'
			},
		},
		// Less
		less: {
			production: {
				options: {
					compress: true,
					cleancss: true
				},
				files: {
					'dist/css/styles.min.css': 'src/less/_application.less'
				}
			}
		},
		// Copy
		copy: {
			fontawesome: {
				expand: true,
				flatten: true,
				src: 'dependencies/font-awesome/fonts/*',
				dest: 'dist/fonts/'
			},
		},

		// Watch
		watch: {
			less: {
				files: [
					'src/less/*.less'
				],
				tasks: ['default']
			},
			js: {
				files: [
					'src/js/*.js'
				],
				tasks: ['default']
			}
		},

		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			src: {
				options: {
					jshintrc: 'src/js/.jshintrc'
				},
				src: ['src/**/*.js']
			},
		},
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task.
	grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify', 'less', 'copy:fontawesome']);

};
