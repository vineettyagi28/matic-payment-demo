//Require Mongoose
var mongoose = require('mongoose');
const {coins} = require('../config/coinList')
const {TransactionType} = require('../config')
const User = require('../models/user')
//Define a schema
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    id: Schema.Types.ObjectId,
    coin: {
        type: String,
        enum: coins
    },
    account: String,
    address: String,
    type: {
        type: String,
        enum: TransactionType
    },
    confirmations: Number,
    bcConfirmations: Number,
    txId: {
        type: String,
        unique: true,
        index: true,
        sparse: true
    },
    time: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    timeReceived: Number,
    amount: Number,
    rateOfFee: Number,
    fee: Number,
    feeUnit: {
        type: String,
        enum: coins
    },
    isBlockchainTran: {
        type: Boolean,
        default: false
    },
    parentTran: {
        type: Schema.Types.ObjectId,
        ref: this,
        default: null
    },
    createdAt: {
        type : Number,
        default: new Date().getTime()
    },
    blockNumber: Number,
    status: {
        type: String,
        enum: ["PENDING", "COMPLETED", "CONFIRMED"]
    },
    confirmedAt: {
        type : Number,
        default: new Date().getTime()
    }
},{ minimize: false });

module.exports = mongoose.model('Transaction', TransactionSchema);