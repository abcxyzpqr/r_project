var User = require('../mvc/controllers/user.js')
    //var utility_validator = require('../utility/validater.js')
var helper = require('../mvc/controllers/helper.js')

exports.hello = function(req, res) {

    var response = {
        status: true,
        message: 'welcome',
        code: '',
        data: 'hello anu'
    }
    res.send(JSON.stringify(response))

}

exports.login = function(req, res) {
    res.contentType('application/json');
    var required_params = ['contact_number', 'password']
        //var missing_params = utility_validator.validate_request(req.body, required_params)

    // if (missing_params === false) {

    User.login(req.query.contact_number, req.query.password, function(s, c, m, session) {
        console.log(session)
        if (s) {
            // req.session.session_id = session._id;
            res.send(helper.create(true, 200, "login successful", session));

        } else {
            res.send(helper.create(s, c, m, session))
        }
    })

    // } else {
    //    res.send(helper.create(false, 400, missing_params.join(), null))
    //}

}

exports.addUser = function(req, res) {
    res.contentType('application/json');
    var user = req.query;
    user.active = 0
    console.log(user);
    User.createNewUser(user, function(s, c, m, user, session) {
        if (s) {

            //req.session.session_id = session._id;
            res.send(helper.create(true, 200, "login successful", session));
        } else {
            res.send(helper.create(s, c, m, {}));
        }
    });
}

exports.logoutUser = function(req, res) {
    var session = req.session_obj
    var session_id = session[0]._id;

    UserSession.end(session_id, function(s, c, m, d) {

        req.session = null
        res.send(helper.create(s, c, m, d))

    });

}

exports.add_one_to_list = function(req, res) {
    var session = req.session_obj
    var wish_item = req.query
    var doc = {
        name: wish_item.name,
        contact_number: wish_item.contact_number
    }
    var user_id = req.query.user_id
    User.add_to_Wishlist(user_id, doc, function(status, code, message, data) {
        res.send(helper.create(status, code, message, data))
    })

}


exports.show_history = function(req, res) {

    User.show_History(user_id, function(status, code, message, data) {
        res.send(helper.create(status, code, message, data))
    })


}

exports.remove_from_wishlist = function(req, res) {
    var user_id = req.query.user_id
    var contact_number = req.body.contact_number
    User.remove_From_Wishlist(user_id, contact_number, function(status, code, message, data) {
        res.send(helper.create(status, code, message, data))
    })

}

exports.pending_request_list = function(req, res) {
    User.pending_request(user_id, function(status, code, message, data) {
        res.send(helper.create(status, code, message, data))
    })
}

exports.remove_pending_request = function(req, res) {
    var user_id = req.query.user_id
    var request_number = req.query.request_number
    User.remove_request(user_id, request_number, function(status, code, message, data) {
        res.send(helper.create(status, code, message, data))
    })
}

exports.add_to_pending_list = function(req, res) {
    var doc = req.query
    var user_id = req.query.user_id

    User.add_to_pending(user_id, doc, function(status, code, message, data) {
        res.send(helper.create(status, code, message, data))
    })
}
