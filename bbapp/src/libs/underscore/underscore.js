/*
Loads underscore, its inflection plugin, and does some config
*/
define(['order!src/libs/underscore/underscore-min','order!src/libs/underscore/underscore-inflection'], function(){
	_.templateSettings = {
		interpolate : /\{\{(.+?)\}\}/g
	};
	return _;
});