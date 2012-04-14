require.config({
	paths: {
		loader: 'src/libs/backbone/loader',
		jQuery: 'src/libs/jquery/jquery',
		Underscore: 'src/libs/underscore/underscore',
		Backbone: 'src/libs/backbone/backbone',
		router: 'src/router',
		app: 'src/app',
		order: 'src/libs/require/order',
		text: 'src/libs/require/text'
	}
});

require(['app'], function(App) {
	App.initialize();
});
