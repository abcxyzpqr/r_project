var User = require('../model/user.js')
var UserSession = require('./user_session.js')
var _ = require('underscore')

doc = {
    email: 'anuradha.yadav.anu@gmail.com',
    name: 'anu',
    password: '12345',
    active: 1,
    created_on: new Date().getTime(),
    contact_number: '7506987699',
    wish_list: [{
        contact_number: '8601352701'
    }],
    Request_pending: {

    },

    Android_device_info: {

    },

    history: {

    }

}

console.log(doc)

function create(doc, cb) {

    User.create(doc, function(err, result) {
        console.log('result', err, result)
        if (err) cb(false, 304, 'ERROR', result);
        else cb(true, 200, 'SUCCESS', result);
    });

}

//create(doc, function(s, c, m, d) {})

exports.login = function(contact_number, password, callback) {
    //  password = crypto.createHash('sha1').update(password).digest('hex');
    console.log(contact_number, password)
    User.findOne({
        'contact_number': contact_number,
        'password': password
    }, function(err, user) {

        console.log(user, err);
        if (_.isNull(err) && !_.isNull(user)) {
            // if(user.active){
            var session_obj = {
                'user_id': user._id,
                'user_name': user.name,
                'user_email': user.email,
                'user_pic': '',
                'contact_number': user.contact_number,
                'start_time': Date(),
                'active': user.active
            };

            var message = '';
            console.log('status ', user.active)
            switch (user.active) {

                case 0:
                    callback(false, 304, 'In active USER please verify your email address', session_obj)
                    break

                case 1:
                    UserSession.add(session_obj, function(s, c, m, session) {

                        if (s) {
                            callback(true, 200, "Logged in", session)
                        } else {
                            callback(false, 304, "error:" + m, null)
                        }

                    })
                    break

                    // }else{
                    //  callback(false,403,"Email account not verified. Please verify before login.",null)
                    // }                            
            }
        } else {
            callback(false, 304, "Invalid Username or Password", null)
        }
    })

}



exports.createNewUser = function(params, callback) {

    //var password = crypto.createHash('sha1').update('123456').digest('hex');
    User.findOne({
        'contact_number': params.contact_number
    }, function(err, u) {
        //console.log(user,err);
        if (_.isNull(err) && !_.isNull(u)) {
            callback(false, 200, "contact_number already in use", u)
        } else {
            var user = new User(params);
            create(params, function(err, user) {
                console.log(user);
                if (err) {
                    callback(false, 304, "error " + err, null)
                } else {
                    callback(true, 200, "user added ", user)
                }
            })
        }
    })
}


exports.add_to_Wishlist = function(user_id, doc, callback) {

    User.findOne({
        '_id': user_id,
        'wishlist': {
            $elemMatch: {
                'contact_number': doc.contact_number
            }
        }
    }, function(err, result) {

        if (result) {
            callback(false, 304, "error " + " number already exists ", null)
        } else {

            User.update({
                '_id': user_id
            }, {
                $push: {
                    'wish_list': doc
                }
            }, function(err, data) {
                if (err) {
                    callback(false, 304, "error " + err, null)
                } else {
                    callback(true, 200, "added to the wishlist", data)
                }
            })
        }

    })
}

exports.show_History = function(user_id, callback) {
    User.findOne({
        '_id': user_id
    }, 'history', function(err, data) {
        if (err) {
            callback(false, 304, "error " + err, null)
        } else {
            callback(true, 200, "list of history items", data)
        }
    })
}

exports.remove_from_wishlist = function(user_id, contact_number, callback) {

    User.update({
        '_id': user_id
    }, {
        $pull: {
            'wish_list': {
                'contact_number': contact_number
            }
        }
    }, function(err, data) {
        if (err) {
            callback(false, 304, "error " + err, null)
        } else {
            callback(true, 200, "removed from the wishlist", data)
        }
    })
}

exports.pending_request = function(user_id, callback) {
    User.findOne({
        '_id': user_id
    }, 'Request_pending', function(err, data) {
        if (err) {
            callback(false, 304, "error " + err, null)
        } else {
            callback(true, 200, "list of Request_pending items", data)
        }
    })
}

exports.remove_request = function(user_id, request_number, callback) {

    User.update({
        '_id': user_id
    }, {
        $pull: {
            'Request_pending': {
                'request_number': request_number
            }
        }
    }, function(err, data) {
        if (err) {
            callback(false, 304, "error " + err, null)
        } else {
            callback(true, 200, "removed from the wishlist", data)
        }
    })
}

exports.add_to_pending = function(user_id, doc, callback) {
    User.findOne({
        '_id': user_id,
        'Request_pending': {
            $elemMatch: {
                'request_number': doc.request_number
            }
        }
    }, function(err, result) {

        if (result) {
            callback(false, 304, "error " + " request already exists ", null)
        } else {

            User.update({
                '_id': user_id
            }, {
                $push: {
                    'Request_pending': doc
                }
            }, function(err, data) {
                if (err) {
                    callback(false, 304, "error " + err, null)
                } else {
                    callback(true, 200, "added to the wishlist", data)
                }
            })
        }

    })

}
