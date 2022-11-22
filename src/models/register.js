const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        reqired: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phone:
    {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    confirmpassword: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
});
const Register = mongoose.model('Register', userSchema);
module.exports = Register;