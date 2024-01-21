const { Schema, model, Types } = require('mongoose');

const accountSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: "User"
    },
    balance: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Account = model('Account', accountSchema);

module.exports = Account;