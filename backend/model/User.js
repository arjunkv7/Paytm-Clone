const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
}, { timestamps: true });

const UserModel =  mongoose.model('Users', userSchema);

module.exports = UserModel;