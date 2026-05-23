import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
  movieId: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('Favourite', FavouriteSchema);