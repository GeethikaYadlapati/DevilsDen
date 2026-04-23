import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: false, // set name as not required for now, as frontend signup only takes email and password.
    min: 2, 
    max: 50, 
  },
  email: { 
    type: String, 
    required: true, 
    max: 50, 
    unique: true ,
  },
  password: {
    type: String, 
    required: true, 
    min: 5,
  }, // User contains an array for matches
  matches: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    default: [],
  }],
  location: String,
}, {
  timestamps: true // Create automatic data for dates
})

const userModel = mongoose.model('User', UserSchema);

export default userModel;