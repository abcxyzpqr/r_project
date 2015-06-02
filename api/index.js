var api = require('./apiRoutes');
var errorhandler = require('errorhandler');

var express = require('express');
//var Auth_script = require('./auth')

var app = express()



//var auth = express.Router();
//auth.use(Auth_script.check);




var no_auth = express.Router()
no_auth.use(function(req, res, next) {
    next()
})

no_auth.get('/hello', api.hello);
no_auth.get('/login', api.login)
no_auth.get('/signup', api.addUser)
no_auth.get('/logout', api.logoutUser)
no_auth.get('/add_one_to_list', api.add_one_to_list)
no_auth.get('/show_history', api.show_history)
no_auth.get('/remove_from_wishlist', api.remove_from_wishlist)
no_auth.get('/pending_request_list', api.pending_request_list)
no_auth.get('/remove_pending_request', api.remove_pending_request)
no_auth.get('/add_to_pending_list', api.add_to_pending_list)



app.use('/api', no_auth);
//app.use('/', auth)
module.exports = app
