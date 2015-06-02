var mongoose = require('mongoose');
require('mongoose-long')(mongoose);

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
var ObjectId = Schema.ObjectId;
var CONFIG = require('../../config.js')
var connection = mongoose.createConnection(CONFIG.TEST.URI);



var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Number
    },
    created_on: {
        type: SchemaTypes.Long
    },
    contact_number: {
        type: String,
        required: true,
        unique: true
    },
    wish_list: [{
        contact_number: {
            type: String
        },
        name: {
            type: String
        }
    }],
    Request_pending: [{

        contact_number: {
            type: String
        },
        name: {
            type: String
        },
        amount: Number,
        timestamp: {
            type: SchemaTypes.Long
        },
        request_number: Number
    }],

    Android_device_info: [{
        device_id: {
            type: String
        },
        device_token: {
            type: String
        }
    }],

    history: [{
        name: {
            type: String
        },
        contact_number: {
            type: String
        },
        Amount: Number,
        status: {
            type: String
        },
        timestamp: {
            type: SchemaTypes.Long
        }
    }]


}, {
    collection: 'user'
});

UserSchema.index({
    email: 1,
    contact: 1
}, {
    unique: true,
    dropDups: true
});

module.exports = connection.model('User', UserSchema);
