import mongoose from 'mongoose';

const updateUserSchema =  mongoose.Schema({
    firstName: String,
    lastName: String,
    age: String,
    city: String
})

export default mongoose.model('users', updateUserSchema);