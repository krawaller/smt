SeeMyTree Server
================

The server is currently made up of MongoDB hosted at [MongoHQ](https://mongohq.com/databases) and NodeJS hosted at [Heroku](https://api.heroku.com/myapps/smt-dev). The login details for these can be found in our DropBox. The url to the server is http://smt-dev.herokuapp.com.

NodeJS
------

The NPM modules used are ExpressJS, MongooseJS and Express-Mongoose. Express provides routing and middlewares, Mongoose has a beatuiful interface to the MongoDB and Express-Mongoose make them play nice. The API provides a direct CRUD interface to the defined Mongoose Schemas, currently completely without authentication.

Running
-------

You can run the server locally if you wish, though it will still point to the MongoHQ Database instance. If you run it locally, it will fire up on port 3000. If you append `?localAPI=true` when loading the app in the browser, it will make all API calls to http://localhost:3000 instead of http://smt-dev.herokuapp.com. Also, which MongoDB server is used is specified using the NODE_ENV variable. If it is set to development, the server tries to connect to your local MongoDB server.

From above, you'll see that to run the server locally with the server pointing to a local database and the app using the local API, you start the server with the command `NODE_ENV=development node server/index.js` and then go to `http://localhost:3000/?localAPI` in your browser, and everything will work without an internet connection.

Deploy
------

To deploy the app to Heroku, you first need to install the [Heroku Toolbelt](https://toolbelt.herokuapp.com/). When done, login using the `heroku login` command. You can either log in using our main account, dev@seemytree.se, or create you own account. If you create your own account, you must add yourself as a collaborator on our dev@seemytree.se-account [here](https://api.heroku.com/myapps/smt-dev). When logging in, you're asked to upload your public ssh key. Do so. If you haven't cloned this repo yet, do so. When done, you should be able to add the Heroku remote repo using `git remote add heroku git@heroku.com:smt-dev.git` and then push to it using `git push heroku master`. Voila!