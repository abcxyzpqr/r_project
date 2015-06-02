var _ = require('underscore');

var CONTROLLERS = '../mvc/controllers'

var UserSession = require(CONTROLLERS + '/user_session.js');
var helper = require(CONTROLLERS + '/helper.js')

var invalid_auth_error = "Invalid session : auth failed";
var invalid_auth_type = "Invalid session : not allowed";


exports.check = function(req, res, next) {
    res.contentType('application/json');
    var session_id, csrf_token;
    if (req.method === "GET") {
        session_id = req.query.session_id;
        csrf_token = req.query.csrf_token;
    } else {
        session_id = req.body.session_id;
        csrf_token = req.body.csrf_token;
    }
    if (_.isUndefined(session_id)) {
        session_id = req.session.session_id;
    }
    if (!_.isUndefined(session_id) && !_.isUndefined(csrf_token)) {
        var obj = {
            '_id': session_id
        }
        UserSession.get(obj, function(s, c, m, session) {
            if (s && session.length > 0 && session[0].active && csrf_token === session[0].csrf) {
                req.session_obj = session;
                next()
            } else {
                res.send(helper.create(false, 401, invalid_auth_error, null))
            }

        })

    } else {
        res.send(helper.create(false, 401, invalid_auth_error, null))
    }

}
