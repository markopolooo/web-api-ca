// User MongoDB schema with password hashing and authentication methods
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

// Define User schema with username and password
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true }
});

// Instance method to compare plaintext password with hashed password
UserSchema.methods.comparePassword = async function (passw) {
    return await bcrypt.compare(passw, this.password);
};

// Static method to find user by username
UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

// Middleware to hash password before saving (on register or password update)
UserSchema.pre('save', async function() {
  const saltRounds = 12;
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
    } catch (error) {
      throw new Error(error);
    }
  }
});

export default mongoose.model('User', UserSchema);