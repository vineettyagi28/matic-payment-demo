//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    lastModifiedAt: {
        type : Number,
        default: new Date().getTime()
    }
});

module.exports = mongoose.model('User', UserSchema);

/*
db.coins.update({code: 'ETH'}, {$set: {balance: 0}})
db.coins.find({}) - Fetch All
db.transactions.remove({}) - Remove all
db.transactions.find({coin: 'DASH'})
db.transactions.find({coin: 'ETC', type: 'SELL'})
 */