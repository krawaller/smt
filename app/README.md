SeeMyTree App
================

The app is built using Sencha Touch 2.0.0. If you haven't used it before, take a look at their [guides](http://docs.sencha.com/touch/2-0/#!/guide/getting_started).

It uses the new MVC structure and talks to the server mainly using REST Proxies defined on the Models. I've created an abstract view and control for entity listing and creation. If you provide this view with a title, a model and a store it will create a CRUD interface for it.

The app can be served either from our Heroku app at http://smt-dev.herokuapp.com or locally. See how to do the latter properly in the server README.

The models could maybe be served from translated Mongoose Schemas from the server.