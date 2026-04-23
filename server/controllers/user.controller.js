import { response } from 'express';
import User from '../mongodb/models/user.js';
import Profile from '../mongodb/models/profile.js';
import HousingPrefs from '../mongodb/models/housingPrefs.js';
import RoomiePrefs from '../mongodb/models/roomiePrefs.js';
import UserPrefs from '../mongodb/models/userPrefs.js';

const getUserInfoByID = async (req, res) => {
  try {
    console.log(req.user);

    const userId = req.params.id; // Get the user ID from the request parameters

    const user = await User.findById(userId);

    if (!user) {
      // If the user with the specified ID is not found, return a 404 Not Found response
      return res.status(404).json({ message: 'User not found' });
    }
    const responseUser = user.toObject();

    delete responseUser._id;
    delete responseUser.password;
    delete responseUser.matches;
    delete responseUser.createdAt;
    delete responseUser.updatedAt;
    delete responseUser.__v;

    return res.status(200).json(responseUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile by id
const getUserProfileByID = async (req, res) => {
  try {

    const userId = req.params.id;
    const user = await Profile.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const userProfile = user.toObject();


    return res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: 'Profile not found:', error});
  }
};

// Get user preferences by id
const getUserPrefsByID = async (req, res) => {
  try {

    const userId = req.params.id;
    const prefs = await UserPrefs.findById(userId);

    if (!prefs) {
      return res.status(404).json({ message: 'User preferences not found' });
    }

    const userPrefs = prefs.toObject();


    return res.status(200).json(userPrefs);
  } catch (error) {
    res.status(500).json({ message: 'User preferences not found:', error });
  }
};

// Get roomie preferences by id
const getRoomiePrefsByID = async (req, res) => {
  try {

    const userId = req.params.id;
    const prefs = await RoomiePrefs.findById(userId);

    if (!prefs) {
      return res.status(404).json({ message: 'Roomie preferences not found' });
    }

    const userPrefs = prefs.toObject();


    return res.status(200).json(userPrefs);
  } catch (error) {
    res.status(500).json({ message: 'Roomie preferences not found:', error });
  }
};
// Get housing preferences by id
const getHousingPrefsByID = async (req, res) => {
  try {

    const userId = req.params.id;
    const prefs = await HousingPrefs.findById(userId);

    if (!prefs) {
      return res.status(404).json({ message: 'Housing preferences not found' });
    }

    const userPrefs = prefs.toObject();


    return res.status(200).json(userPrefs);
  } catch (error) {
    res.status(500).json({ message: 'Housing preferences not found:', error });
  }
};

// Update user info by id
const updateUserInfoByID = async (req, res) => {
  try{
    const userId = req.params.id;
    const updatedInfo = req.body;

    const user = await User.findByIdAndUpdate(userId, updatedInfo, {
      new: true,
    });

    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('User information update failed:', err);
  }
};

// Update profile info by id
const updateProfileInfoByID = async (req, res) => {
  try{
    const user_Id = req.params.id;
    const updatedInfo = req.body;
    

    const profileExists = await Profile.findById(user_Id);

    if (!profileExists){ // if the profile does not exist, create a new one
      
      const newProfile = new Profile({
        userId: user_Id,
        first_name: updatedInfo.firstName,
        middle_name: updatedInfo.middleName,
        last_name: updatedInfo.lastName,
        phone_number: updatedInfo.phoneNumber,
        email: updatedInfo.email,
        gender: updatedInfo.gender,
        major: updatedInfo.major,
        graduation_year: updatedInfo.year,
        age: updatedInfo.age

      })
      const savedProfile = await newProfile.save();
      return res.json(savedProfile);
    }
    const user = await Profile.findByIdAndUpdate(user_Id, updatedInfo, {
      new: true,
    });

    if(!user){
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('User profile update failed:', err);
  }
};

// Update user prefs by id
const updateUserPrefsByID = async (req, res) => {
  try{
    const user_Id = req.params.id;
    const updatedInfo = req.body;
    

    const dataExists = await UserPrefs.findById(user_Id);

    if (!dataExists){ // if the prefs does not exist, create a new one
      
      const newData = new UserPrefs({
        userId: user_Id,
        cleanliness: updatedInfo.cleanliness,
        studyTime: updatedInfo.studyTime,
        petFriendly: updatedInfo.petFriendly,
        gender: updatedInfo.gender,
        smoking: updatedInfo.smoking,
        drinking: updatedInfo.drinking,
        sleepingHabits: updatedInfo.sleepingHabits,
        okayWithFriendsOver: updatedInfo.okayWithFriendsOver

      })
      const savedData = await newData.save();
      return res.json(savedData);
    }
    const user = await UserPrefs.findByIdAndUpdate(user_Id, updatedInfo, {
      new: true,
    });

    if(!user){
      return res.status(404).json({ message: 'User preferences not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('User preferences update failed:', err);
  }
};

// Update roomie prefs by id
const updateRoomiePrefsByID = async (req, res) => {
  try{
    const user_Id = req.params.id;
    const updatedInfo = req.body;
    

    const dataExists = await RoomiePrefs.findById(user_Id);

    if (!dataExists){ // if the prefs does not exist, create a new one
      
      const newData = new RoomiePrefs({
        userId: user_Id,
        college: updatedInfo.college,
        yearInCollege: updatedInfo.yearInCollege,
        cleanliness: updatedInfo.cleanliness,
        studyTime: updatedInfo.studyTime,
        petFriendly: updatedInfo.petFriendly,
        gender: updatedInfo.gender,
        smoking: updatedInfo.smoking,
        drinking: updatedInfo.drinking,
        sleepingHabits: updatedInfo.sleepingHabits,
        okayWithFriendsOver: updatedInfo.okayWithFriendsOver,


      })
      const savedData = await newData.save();
      return res.json(savedData);
    }
    const user = await RoomiePrefs.findByIdAndUpdate(user_Id, updatedInfo, {
      new: true,
    });

    if(!user){
      return res.status(404).json({ message: 'Roomie preferences not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Roomie preferences update failed:', err);
  }
};

// Update housing prefs by id
const updateHousingPrefsByID = async (req, res) => {
  try{
    const user_Id = req.params.id;
    const updatedInfo = req.body;
    

    const dataExists = await HousingPrefs.findById(user_Id);

    if (!dataExists){ // if the prefs does not exist, create a new one
      
      const newData = new HousingPrefs({
        userId: user_Id,
        budget: updatedInfo.budget,
        moveInDate: updatedInfo.moveInDate,
        moveOutDate: updatedInfo.moveOutDate,
        location: updatedInfo.location,
        apartmentPref: updatedInfo.apartmentPref,
        size: updatedInfo.size

      })
      const savedData = await newData.save();
      return res.json(savedData);
    }
    const user = await HousingPrefs.findByIdAndUpdate(user_Id, updatedInfo, {
      new: true,
    });

    if(!user){
      return res.status(404).json({ message: 'Housing preferences not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Housing preferences update failed:', err);
  }
};

// Delete user by id
const deleteUserByID = async (req, res) => {
  try{
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Successfully deleted user profile'});
  } catch(err) {
    console.error(err);
    res.status(500).send('User profile delete failed', err);
  }
};

// Delete profile by id
const deleteProfileByID = async (req, res) => {
  try{
    const userId = req.params.id;
    const user = await Profile.findByIdAndDelete(userId);

    if(!user){
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({ message: 'Successfully deleted user profile'});
  } catch(err) {
    console.error(err);
    res.status(500).send('User profile delete failed:', err);
  }
};

// Delete profile by id
const deleteUserPrefsByID = async (req, res) => {
  try{
    const userId = req.params.id;
    const user = await UserPrefs.findByIdAndDelete(userId);

    if(!user){
      return res.status(404).json({ message: 'User preferences not found' });
    }

    res.json({ message: 'Successfully deleted user preferences'});
  } catch(err) {
    console.error(err);
    res.status(500).send('User preferences delete failed:', err);
  }
};

// Delete roomie preferences by id
const deleteRoomiePrefsByID = async (req, res) => {
  try{
    const userId = req.params.id;
    const user = await RoomiePrefs.findByIdAndDelete(userId);

    if(!user){
      return res.status(404).json({ message: 'Roomie preferences not found' });
    }

    res.json({ message: 'Successfully deleted roomie preferences'});
  } catch(err) {
    console.error(err);
    res.status(500).send('Roomie preferences delete failed:', err);
  }
};

// Delete housing preferences by id
const deleteHousingPrefsByID = async (req, res) => {
  try{
    const userId = req.params.id;
    const user = await HousingPrefs.findByIdAndDelete(userId);

    if(!user){
      return res.status(404).json({ message: 'Housing preferences not found' });
    }

    res.json({ message: 'Successfully deleted housing preferences'});
  } catch(err) {
    console.error(err);
    res.status(500).send('Housing preferences delete failed:', err);
  }
};


// Find user matches by id
const findMatchesByID = async(req, res) => {
  try{
    const userId = req.params.id;
    const user = await Profile.findById(userId);

    if(user){
      const userProfile = await Profile.findOne({userId: user._id});
    }
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    
    const gradYearDifference = 2;
    const minGraduationDate = userProfile.graduation_year - 2;
    const maxGraduationDate = userProfile.graduation_year - 2;
    
    const ageYearDifference = 2;
    const minAgeDate = userProfile.graduation_year - 2;
    const maxAgeDate = userProfile.graduation_year - 2;
    
    const matches = await Profile.find({
      _id: { $ne: userId },  
      major: user.major,
      gender: user.gender,
      graduationDate: { $gte: minGraduationDate, $lte: maxGraduationDate },
      age: { $gte: minAge, $lte: maxAge }
    });
  
    return matches;
  } catch(err) {
    console.error(err);
    res.status(500).send('Find Matches Error:', err);
  }
};
export {
  getUserInfoByID, updateUserInfoByID, deleteUserByID, findMatchesByID, getUserProfileByID, updateProfileInfoByID, deleteProfileByID, getUserPrefsByID, updateUserPrefsByID, deleteUserPrefsByID, getRoomiePrefsByID, updateRoomiePrefsByID, deleteRoomiePrefsByID, getHousingPrefsByID, updateHousingPrefsByID, deleteHousingPrefsByID
}