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
				}
			},
			files: ['src/*.js']
		},
		concat: {
			options: {
				stripBanners: true,
				banner: '/*\n<%= pkg.name %> - v<%= pkg.version %> \nHomepage: <%= pkg.homepage %> \n\n<%= pkg.description %> \nGenerated at: <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n',
			},
			dist: {
				src: ['src/*.js'],
				dest: 'rokeya_layout-<%= pkg.version %>.js',
			}
		},
		qunit: {
			options: {
				timeout: 60000,
				coverage: {
					src:["rokeya_layout-<%= pkg.version %>.js"],
					instrumentedFiles: "temp/",
					htmlReport: "build/coverage",
					lcovReport: "build/lcov",
					linesThresholdPct: 0
				}
			},
			files: ['test/*.html']
		},
		ftp_push: {
			options: {
				username: process.env.ftpUser,
				password: process.env.ftpPassword,
				host: process.env.ftpHost,
				dest: "seoul.freehostia.com/BanglaDateJS",
				port: 21
			},
			files: {
				expand: true,
				cwd: '.',
				src: [
					"build/coverage/*", "build/report/coverage/**/*"
				]
			}
		}
	});

	// include libraries
	grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks("grunt-qunit-istanbul");
	grunt.loadNpmTasks('grunt-ftp-push');

	// run tasks
	grunt.registerTask('test01', ['jscs', 'jshint', 'concat', 'qunit']);
	grunt.registerTask('ftpDeploy00', ['ftp_push']);
};