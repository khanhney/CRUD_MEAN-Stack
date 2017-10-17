const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: String,
    password: String,
    fullname: String,
    age: Number,
    address: String
});


const User = mongoose.model('user', UserSchema);
module.exports = User;