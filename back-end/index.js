var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var morgan      = require('morgan');
var config = require('./config');
var cors = require('cors');

// Create the application.
var app = express();

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(morgan('dev'));


app.set('superSecret', 'samrat');

var routes = require('./routes');
_.each(routes, function(controller, route) {
    app.use(route, controller(app, route));
});
var port = 3000;

console.log('Listening on port ' + port +'...');
app.listen(port);


// CORS Support
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.whiteList);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'authToken, Content-Type');
    next();
});

/*

 app.use(cors());

// Connect to MongoDB
//mongoose.connect('mongodb://localhost:3333/spp');
var connectionString = 'mongodb://' + config.envDb.ipAddress +':'+ config.envDb.port + '/' + config.envDb.dbName;
mongoose.connect(connectionString);
// mongoose.connect('mongodb://oes:oes123@ds033036.mlab.com:33036/oes');
mongoose.connection.once('open', function() {

    // Load the models.
    app.models = require('./models/index');

    var crudMiddleware = require('./middlewares/crudAuthorize');
    var businessMiddleWare = require('./middlewares/businessAuthorize')
    var superAdminChecker = require('./middlewares/superAdminChecker')
    app.use('/crud', crudMiddleware);
    app.use('/business', businessMiddleWare);
    app.use('/createAccount', superAdminChecker);
    // Load the routes.
    var routes = require('./routes');
    _.each(routes, function(controller, route) {
        app.use(route, controller(app, route));
    });

    console.log('Listening on port ' + config.envCommon.port +'...');
    app.listen(config.envCommon.port);
});
*/
