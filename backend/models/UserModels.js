import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your name']
    },
    email: {
        type: String,
        required: [ true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password with min-length of 6'],
        minLength: 6
    }
}, {
    timesstamps: true,
})

const User = mongoose.model('User', userSchema)

export default User;