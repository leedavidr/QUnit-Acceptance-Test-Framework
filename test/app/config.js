(function () {

	require.config({
		paths: {
			// path configuration assumes .js suffix

			// Libraries
			'jQuery': '../../js/libs/jquery-1.8.2.min',
			'Underscore': '../../js/libs/underscore'
		},
		shim: {
			'jQuery': {
				exports: '$'
			},
			'Underscore': {
				exports: '_'
			}
		}
	});

	require(['setup']);
}());
