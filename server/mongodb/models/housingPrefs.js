import mongoose from "mongoose";

const HousingPreferenceSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    budget: String,
    moveInDate: String,
    moveOutDate: String,
    location: String,
    apartmentPref: String,
    size: String,
    petFriendly: String

  })
  
const housingPrefModel = mongoose.model('HousingPrefs', HousingPreferenceSchema);

export default housingPrefModel;