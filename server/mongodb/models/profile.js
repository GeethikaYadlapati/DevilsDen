import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    first_name: String,
    middle_name: String,
    last_name: String,
    phone_number: String,
    email: String,
    gender: String,
    major: String,
    graduation_year: Number,
    age: Number
  })
  
const profileModel = mongoose.model('Profile', ProfileSchema);

export default profileModel;