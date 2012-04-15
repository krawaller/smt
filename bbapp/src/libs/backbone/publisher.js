/*
A module designed to be mixed in with with BB objects that publish views (normally routers, but
can also be other views). Defines a single 'publishView' function, that assumes that the object
also has a 'viewContainers' property, containing name and selector key-value pairs.

The published views are assumed to have the Publishee mixin, giving them the 'close' method.
*/

define(["src/libs/jquery/jquery"],function($){
	return {
		publishView: function(){
			for (var cname in this.viewContainers){
				this.viewContainers[cname] = {$el: $(this.viewContainers[cname])};
			}
			this.publishView = function(containername,view){
				if (!view){
					view = containername;
					containername = "main";
				}
				if (this.authorize && !this.authorize(view)){
					return;
				};
				cur = this.viewContainers[containername];
				if (cur.view){
					cur.view.close();
				}
				cur.view = view;
				view.render();
				cur.$el.empty().append(view.el);
				this.trigger("publish:"+containername,view);
			};
			this.publishView.apply(this,arguments);
		}
	};
});