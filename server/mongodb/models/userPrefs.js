import mongoose from "mongoose";

const UserPreferenceSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    cleanliness: String,
    studyTime: String,
    petFriendly: String,
    gender: String,
    smoking: String,
    drinking: String,
    sleepingHabits: String,
    okayWithFriendsOver: String,

  })
  
const userPrefModel = mongoose.model('UserPrefs', UserPreferenceSchema);

export default userPrefModel;