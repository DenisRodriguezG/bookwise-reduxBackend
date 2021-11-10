import mongoose from 'mongoose';

const createUsersSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        age: String,
        city: String,
        email: String,
        password: String,
        whyReason: String,
        timeCreate: String
    }
)

export default mongoose.model('users', createUsersSchema);