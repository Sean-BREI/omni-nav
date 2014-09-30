module.exports = function(grunt) {

	// Configurations
	var production_assets_url  = '//www2.chapman.edu/omni-nav/'; 
	var development_assets_url = ''; // Leave blank to use relative URLs

	// Begin Grunt Setup
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			build: {
				src: 'src/omni-nav.js',
				dest: 'dist/omni-nav.min.js'
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'dist/omni-nav.min.css': 'src/omni-nav.scss'
				}
			}
		},

		copy: {
			main: {
			files: [
				{expand: true, cwd: 'src/', src: 'omni-nav.svg',  dest: 'dist/'}
		    ]
		  }
		},

		includereplace: {
			readme: {
				options: {
					suffix: ';',
					globals: {
						base_url: development_assets_url,
						production_base_url: production_assets_url
					}
				},
				src: 'src/index.html',
				dest: 'index.html'
			},
			dist: {
				options: {
					suffix: ';',
					globals: {
						base_url: production_assets_url
					}
				},
				src: 'src/omni-nav.html',
				dest: 'dist/omni-nav.html'
			}
		},

		watch: {
			options: {
				livereload: true,
			},
			scripts: {
				files: ['src/*.js'],
				tasks: ['uglify']
			},
			css: {
				files: ['src/*.scss'],
				tasks: ['sass']
			},
			svg: {
				files: ['src/omni-nav.svg'],
				tasks: ['copy']
			},
			html: {
				files: ['src/index.html', 'src/omni-nav.html'],
				tasks: ['copy', 'includereplace']
			}
		},


	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-include-replace');

	// Grunt Tasks
	grunt.registerTask('default', ['uglify', 'sass', 'copy', 'includereplace']);

};