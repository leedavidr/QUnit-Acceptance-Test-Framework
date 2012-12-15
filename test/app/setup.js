define([
	'jQuery'
	
], function(jQuery) {

	var $$ = jQuery.noConflict(true);

	require(['suite1']);

	$$(document).ready(function() {
		QUnit.start();
	});

	$$('#myFrame').load(function() {
		//grab jQuery from the iFrame everytime the iFrame loads
		$ = jQuery = this.contentWindow.jQuery;

		//turn off async so tests will wait for ajax results
		$.ajaxSetup({ async: false });

		//dynamically determine reference path to avoid cross domain scripting
		var referencePath =  window.location.protocol + "//" + window.location.host + window.location.pathname;
		$.getScript(referencePath + "../js/jquery.simulate.js");

		//turn off animations for testing purposes
		$.support.cssTransitions = false;
		$.fx.off = true;
		QUnit.start();
	});
});
