define(['src/libs/underscore/underscore-min'], function(){
	_.templateSettings = {
		interpolate : /\{\{(.+?)\}\}/g
	};
	return _.noConflict();
});