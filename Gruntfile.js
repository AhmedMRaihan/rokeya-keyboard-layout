module.exports = function(grunt) {

	// configure
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jscs: {
			src: 'src/*.js',
			options: {
				"validateQuoteMarks": { "mark": "\"", "escape": true },
				"disallowMultipleLineBreaks": false,
				"validateLineBreaks": false,
				"requireCurlyBraces": false
			}
		},
		jshint: {
			options: {
				eqeqeq: false,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				},
				reporterOutput: ""
			},
			files: ['src/*.js']
		},
		concat: {
			options: {
				stripBanners: true,
				banner: '/* <%= pkg.name %> - v<%= pkg.version %> \nHomepage: <%= pkg.homepage %> \n\n<%= pkg.description %> */\n',
			},
			dist: {
				src: ['src/*.js'],
				dest: 'rokeya_layout-<%= pkg.version %>.js'
			},
			liveDemoUsage:{
				src: ['src/*.js'],
				dest: 'index.html/rokeya_layout-<%= pkg.version %>.js'
			}
		},
		testee: {
			options: {
				reporter: 'Spec'
			},
			coverage: {
				options: {
				  browsers: ['firefox'],
				  coverage: {
					dir: 'build/coverage/',
					reporters: ['text','html']
				  }
				},
				src: ['test/*.html']
			}
		}
	});

	// include libraries
	grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('testee');
	
	// run tasks
	grunt.registerTask('build01', ['jscs', 'jshint', 'concat']);
	grunt.registerTask('test01', ['testee']);
};