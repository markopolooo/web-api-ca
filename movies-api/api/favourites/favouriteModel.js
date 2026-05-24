// Favourite movie MongoDB schema - stores user's favorite movies
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Define Favourite schema linking movies to users
const FavouriteSchema = new Schema({
  movieId: { type: Number, required: true }, // TMDB movie ID
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User
});

export default mongoose.model('Favourite', FavouriteSchema);