SeeMyTree Server
================

The server is currently made up of MongoDB hosted at [MongoHQ](https://mongohq.com/databases) and NodeJS hosted at [Heroku](https://api.heroku.com/myapps/smt-dev). The login details for these can be found in our DropBox. The url to the server is http://smt-dev.herokuapp.com.

NodeJS
------

The NPM modules used are ExpressJS, MongooseJS and Express-Mongoose. Express provides routing and middlewares, Mongoose has a beatuiful interface to the MongoDB and Express-Mongoose make them play nice. The API provides a direct CRUD interface to the defined Mongoose Schemas, currently completely without authentication.

Running
-------

You can run the server locally if you wish, though it will still point to the MongoHQ Database instance. If you run it locally, it will fire up on port 3000. If you append `?debug=true` when loading the app in the browser, it will connect to http://localhost:3000 instead of http://smt-dev.herokuapp.com

Deploy
------

To deploy the app to Heroku, you first need to install the [Heroku Toolbelt](https://toolbelt.herokuapp.com/). When done, login using the `heroku login` command. You can either log in using our main account, dev@seemytree.se, or create you own account. If you create your own account, you must add yourself as a collaborator on our dev@seemytree.se-account [here](https://api.heroku.com/myapps/smt-dev). When logging in, you're asked to upload your public ssh key. Do so. If you haven't cloned this repo yet, do so. When done, you should be able to add the Heroku remote repo using `git remote add heroku git@heroku.com:smt-dev.git` and then push to it using `git push heroku master`. Voila!