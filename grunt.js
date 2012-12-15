
module.exports = function( grunt ) {

var testUrl = "http://127.0.0.1:8080/prototype/test/";
var config = {
		lint: {
			webapp: [
				"*.js"
			],
			test: [
				"test/app/*.js"
			]
		},
		optimize: {
			// concatenate require js files where "app" is the name of directory and "config" is the name of the main config file
			"app": "config"
		},
		deoptimize: {
			// don't use concatenated require js where "app" is the name of directory and "config" is the name of the main config file
			"app": "config"
		},
		requirejs: {
			// base task that optimize (multitask) will use
			compile: {
				options: {
					baseUrl: "",
					mainConfigFile: "",
					name: "",
					out: ""
				}
			}
		},
		deploy: {
			app: {
				src: "app/**",
				dest: process.env.CATALINA_HOME + "/webapps/prototype/"
			},
			css: {
				src: "css/**",
				dest: process.env.CATALINA_HOME + "/webapps/prototype/"
			},
			html: {
				src: "html/**",
				dest: process.env.CATALINA_HOME + "/webapps/prototype/"
			},
			img: {
				src: "img/**",
				dest: process.env.CATALINA_HOME + "/webapps/prototype/"
			},
			js: {
				src: "js/**",
				dest: process.env.CATALINA_HOME + "/webapps/prototype/"
			},
			test: {
				src: "test/**",
				dest: process.env.CATALINA_HOME + "/webapps/prototype/"
			}
		},
		qunit: {
			app:  testUrl + "app/",
		}
	},
	cheerio = require( "cheerio" );

grunt.initConfig( config );

grunt.loadTasks('test/grunt-tasks');
grunt.loadNpmTasks('grunt-contrib-requirejs');

grunt.registerMultiTask( "optimize", "Optimize web apps to production-ready state", function() {
	/* Optimize Javascript files using grunt-contrib-requirejs task */
	grunt.config.set('requirejs.compile.options.baseUrl', this.target + '/js');
	grunt.config.set('requirejs.compile.options.mainConfigFile', this.target + '/js/' + this.data + '.js');
	grunt.config.set('requirejs.compile.options.name', this.data);
	grunt.config.set('requirejs.compile.options.out', this.target + '/js/build/optimized.js');
	grunt.config.set('requirejs.compile.options.optimize', 'none');
	grunt.task.run('requirejs');

	/* Replace reference to requirejs in index.html to use new optimized file */
	var indexLocation = this.target + "/index.html";
	var appIndexHtml = grunt.file.read( indexLocation );
	var $ = cheerio.load( appIndexHtml );
	$( "script[data-main='js/" + this.data + "']" ).attr( 'data-main', 'js/build/optimized' );
	grunt.file.write( indexLocation, $.html() );
});

grunt.registerMultiTask( "deoptimize", "Deoptimize web apps to development state", function() {
	/* Replace reference to requirejs in index.html to use new optimized file */
	var indexLocation = this.target + "/index.html";
	var appIndexHtml = grunt.file.read( indexLocation );
	var $ = cheerio.load( appIndexHtml );
	$( "script[data-main='js/build/optimized']" ).attr( 'data-main', 'js/' + this.data );
	grunt.file.write( indexLocation, $.html() );
});


grunt.registerMultiTask( "deploy", "Copy files to destination folder", function() {
	var files = grunt.file.expandFiles( this.file.src ),
		target = this.file.dest;
	files.forEach(function( fileName ) {
		grunt.file.copy( fileName, target + fileName );
	});
	grunt.log.writeln( "Copied " + files.length + " files." );
});

grunt.registerTask( "test", "qunit:app" );
grunt.registerTask( "default", "lint deploy test" );

};
