module.exports = function( grunt ) {

var testUrl = "http://127.0.0.1:8080/prototype/test/";
var config = {
		deploy: {
			app: {
				src: "app/**",
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
};

grunt.initConfig( config );

grunt.loadTasks('test/grunt-tasks');

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


