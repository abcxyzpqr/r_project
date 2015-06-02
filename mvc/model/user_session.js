var mongoose = require('mongoose');
require('mongoose-long')(mongoose);

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
var ObjectId = Schema.ObjectId;
var CONFIG = require('../../config.js')
var connection = mongoose.createConnection(CONFIG.TEST.URI);

var UserSessionSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String
    },
    user_email: {
        type: String
    },
    user_pic: {
        type: String,
        default: ""
    },
    contact_number: String,
    start_time: {
        type: String,
        required: true
    },
    end_time: String,
    active: {
        type: Boolean,
        default: true
    },
    csrf: {
        type: String,
        required: true
    }
}, {
    collection: 'UserSession'
});

module.exports = connection.model('UserSession', UserSessionSchema);
