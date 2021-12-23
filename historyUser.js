import mongoose from 'mongoose';

const historyUsersSchema = mongoose.Schema(
    {
        idUser: String,
        typeMovement: String,
        content: String,
        date: String
    }
)

export default mongoose.model('history', historyUsersSchema);