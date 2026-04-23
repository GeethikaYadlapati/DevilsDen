import express from 'express';

// Import Controllers
import { getUserInfoByID, updateUserInfoByID, deleteUserByID, findMatchesByID, getUserProfileByID, updateProfileInfoByID, deleteProfileByID, getUserPrefsByID, updateUserPrefsByID, deleteUserPrefsByID, getRoomiePrefsByID, updateRoomiePrefsByID, deleteRoomiePrefsByID, getHousingPrefsByID, updateHousingPrefsByID, deleteHousingPrefsByID } from '../controllers/user.controller.js';

const router = express.Router();

// user operation routes
router.route('/user').get(getUserInfoByID);
router.route('/user').put(updateUserInfoByID);
router.route('/user').delete(deleteUserByID);
// find matches operation route
router.route('/user/findMatches').get(findMatchesByID);
// profile operation routes
router.route('/user/profile').get(getUserProfileByID);
router.route('/user/profile').put(updateProfileInfoByID);
router.route('/user/profile').delete(deleteProfileByID);
// user preferences operations routes
router.route('/user/userPrefs').get(getUserPrefsByID);
router.route('/user/userPrefs').put(updateUserPrefsByID);
router.route('/user/userPrefs').delete(deleteUserPrefsByID);
// roomie preferences operations routes
router.route('/user/roomiePrefs').get(getRoomiePrefsByID);
router.route('/user/roomiePrefs').put(updateRoomiePrefsByID);
router.route('/user/roomiePrefs').delete(deleteRoomiePrefsByID);
// housing preferences operations routes
router.route('/user/housingPrefs').get(getHousingPrefsByID);
router.route('/user/housingPrefs').put(updateHousingPrefsByID);
router.route('/user/housingPrefs').delete(deleteHousingPrefsByID);


export default router;