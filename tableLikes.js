import mongoose from 'mongoose';

const listLikesSchema = mongoose.Schema(
    {
        _id: String,
        _idBook: String,
        urlBook: String,
        title: String,
        author: String
    }
)

export default mongoose.model('likes', listLikesSchema);