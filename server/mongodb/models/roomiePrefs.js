import mongoose from "mongoose";

const RoomiePreferenceSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    college: String,
    yearInCollege: String,
    cleanliness: String,
    studyTime: String,
    petFriendly: String,
    gender: String,
    smoking: String,
    drinking: String,
    sleepingHabits: String,
    okayWithFriendsOver: String,

  })
  
const RoomiePrefModel = mongoose.model('RoomiePrefs', RoomiePreferenceSchema);

export default RoomiePrefModel;