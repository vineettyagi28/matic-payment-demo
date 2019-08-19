//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
    id: Schema.Types.ObjectId,
    value: String,
    active: Boolean
});

module.exports = mongoose.model('Address', AddressSchema);