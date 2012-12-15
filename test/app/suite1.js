define([
	'jQuery',
	'Underscore'
], function($$, Underscore) {
		var referencePath = window.location.protocol + "//" + window.location.host + window.location.pathname;
		
		module("Module of Tests", {
			setup: function() {	
				$$('#myFrame').attr('src', referencePath + '../../login');
				stop();
				stop();
				setTimeout(function() {
					start();

					ok($("#loginForm").is(":visible"),"Given I can see the Login form");

					$("#username").val('user');
					$("#password").val('password');
					ok($("#loginForm").submit(), "When I log in as user");

					stop();
					stop();
					setTimeout(function() {
						ok($("#something").is(":visible"), "Then I am logged in");
						start();
					}, 1000);
				}, 1000);
			},
			teardown: function() {
				$$('#myFrame').attr('src', referencePath + '../../logout');
				stop();
				stop();
				setTimeout(function() {
					start();
				}, 1000);
			}
		});

		test('Basic Test', function() {
			ok(true, "Tested something");
		});
	};
});
