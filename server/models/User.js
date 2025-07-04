import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;