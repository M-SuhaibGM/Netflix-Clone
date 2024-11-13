import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    email:
    {
        type: String,
        require: true,
    },
    username: {

        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});


const users = mongoose.models.users|| mongoose.model('users', Schema);
export default users

