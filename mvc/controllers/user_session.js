var crypto = require('crypto');
var UserSession = require('../model/user_session.js');
var _ = require('underscore');

var salt = "e7db7b5a995460e0870d9dd5a0fc1698";

exports.add = function(param, callback) {
    var hash = param.user_id + param.start_time + salt;
    hash = crypto.createHash('sha1').update(hash).digest('hex');
    param.csrf = hash;
    var session = new UserSession(param);
    console.log(session)
    session.save(function(err, session) {
        console.log('...............', session);
        if (_.isNull(err)) {
            callback(true, 200, "session added", session)
        } else {
            callback(false, 304, "error : " + err, null)
        }
    });
}

exports.end = function(session_id, callback) {
    var end_time = Date();
    UserSession.findByIdAndUpdate(session_id, {
        'end_time': end_time,
        'active': false
    }, function(err, session) {
        if (_.isNull(err)) {
            callback(true, 200, "session ended successfully", null)
        } else {
            callback(false, 304, "error : " + err, null)
        }
    });
}

exports.get = function(param, callback) {
    UserSession.find(param, function(err, session) {
        if (_.isNull(err)) {
            callback(true, 200, "success", session)
        } else {
            callback(false, 304, "error : " + err, null)
        }
    });
}
