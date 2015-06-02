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
    },
    name: {
        type: String,
    }

}, {
    collection: 'user_new'
});

UserSchema.index({
    email: 1,
    name: 1
}, {
    unique: true,
    dropDups: true
});

var this1 = connection.model('User_new', UserSchema);

var doc = {
    'email': 'anu@gamil.com',
    'name': 'anu'
}
this1.create(doc, function(err, data) {
    console.log(err, data)
})
