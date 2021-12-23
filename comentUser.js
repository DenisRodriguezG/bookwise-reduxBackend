import mongoose from 'mongoose';

const createUsersSchema = mongoose.Schema(
    {
        idUser: String,
        coment: String,
        date: String
    }
)

export default mongoose.model('suggerens', createUsersSchema);