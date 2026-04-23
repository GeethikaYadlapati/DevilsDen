import * as SecureStore from 'expo-secure-store';

// function to store session token
const storeToken = async (token) => {
    try{
        await SecureStore.setItemAsync('userToken', token);
    }
    catch (e){
        console.error('Error storing session token:', e);
    }
};
// function to retrieve session token
const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');

      return token;

    } catch (error) {
      console.error('Error retrieving session token:', error);
    }
  };
// Account Operations
// Login function for frontend
const login = async (email, password) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if(!response.ok){
        throw new Error(data.message || 'Login Failed');
    }
    
    const { token } = data;

    await storeToken(token);

    return data;

    }
    catch (e){
        console.error('Login error:', e);
        throw e;
    }
};

// SignUp function for frontend
const signUp = async (email, password) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if(!response.ok){
        throw new Error(data.message || 'Login Failed');
    }
    
    const { token } = data;

    await storeToken(token);

    return data;

    }
    catch (e){
        console.error('Login error:', e);
        throw e;
    }
};
// User Info Operations
// Fetch user information function for frontend
const fetchUserInfo = async () => {
    try{
        const token = await getToken();

        const response = await fetch('http://localhost:8080/api/v1/users/user', {
            method: 'GET',
            headers: {
                'Authentication': `Bearer ${token}`,
            },
        });

        if (!response.ok){
            throw new Error('Failed to fetch user information');
        }
        
        const userInfo = await response.json();

        return userInfo;

    } catch(error) {
        console.error('Error fetching the user info:', error);
        throw error;
    } 
};

// Update user information function for front end
const updateUserInfo = async (userData) => {
    try{
        const token = await getToken();

        const response = await fetch('http://localhost:8080/api/v1/users/user', {
            method: 'PUT',
            headers: {
                'Authentication': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok){
            throw new Error('Failed to update user information');
        }
        
        const userInfo = await response.json();

        return userInfo;

    } catch(error) {
        console.error('Error updating the user info:', error);
        throw error;
    } 
};

// Delete user info function for frontend
const deleteUserInfo = async () => {
    try{
        const token = await getToken();

        const response = await fetch('http://localhost:8080/api/v1/users/user', {
            method: 'DELETE',
            headers: {
                'Authentication': `Bearer ${token}`,
            },
        });

        if (!response.ok){
            throw new Error('Failed to delete user.');
        }
        
        

        return "User succesfully deleted.";

    } catch(error) {
        console.error('Error deleting the user info:', error);
        throw error;
    } 
};

// User Profile Operations
// Fetch user profile function for frontend
const fetchUserProfile = async () => {
    try{
        const token = await getToken();

        const response = await fetch('http://localhost:8080/api/v1/users/user/profile', {
            method: 'GET',
            headers: {
                'Authentication': `Bearer ${token}`,
            },
        });

        if (!response.ok){
            throw new Error('Failed to fetch user profile');
        }
        
        const userProfile = await response.json();

        return userProfile;

    } catch(error) {
        console.error('Error fetching the user profile:', error);
        throw error;
    } 
};

// Update user profile frontend function
const updateUserProfile = async (profileData) => {
    try{
        const token = await getToken();

        const response = await fetch('http://localhost:8080/api/v1/users/user/profile', {
            method: 'PUT',
            headers: {
                'Authentication': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok){
            throw new Error('Failed to update profile information');
        }
        
        const userProfile = await response.json();

        return userProfile;

    } catch(error) {
        console.error('Error updating the profile info:', error);
        throw error;
    } 
};

// Delete user profile function for frontend
const deleteUserProfile = async () => {
    try{
        const token = await getToken();

        const response = await fetch('http://localhost:8080/api/v1/users/user/profile', {
            method: 'DELETE',
            headers: {
                'Authentication': `Bearer ${token}`,
            },
        });

        if (!response.ok){
            throw new Error('Failed to delete profile.');
        }
        
        

        return "Profile succesfully deleted.";

    } catch(error) {
        console.error('Error deleting the profile info:', error);
        throw error;
    } 
};
// User Preferences Operations
// Fetch personal preferences function for frontend
const fetchPersonalPrefs = async () => {
    try{
        const token = await getToken();

        const response = await fetch('http://localhost:8080/api/v1/users/user/userPrefs', {
            method: 'GET',
            headers: {
                'Authentication': `Bearer ${token}`,
            },
        });

        if (!response.ok){
            throw new Error('Failed to fetch user preferences');
        }
        
        const userProfile = await response.json();

        return userProfile;

    } catch(error) {
        console.error('Error fetching the user preferences:', error);
        throw error;
    } 
};

// Update personal preferences frontend function
const updatePersonalPrefs = async (profileData) => {
    try{
        const token = await getToken();

        const response = await fetch('http://localhost:8080/api/v1/users/user/userPrefs', {
            method: 'PUT',
            headers: {
                'Authentication': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok){
            throw new Error('Failed to update user preferences');
        }
        
        const userProfile = await response.json();

        return userProfile;

    } catch(error) {
        console.error('Error updating the user preferences:', error);
        throw error;
    } 
};

// Delete personal preferences function for frontend
const deletePersonalPrefs = async () => {
    try{
        const token = await getToken();

        const response = await fetch('http://localhost:8080/api/v1/users/user/userPrefs', {
            method: 'DELETE',
            headers: {
                'Authentication': `Bearer ${token}`,
            },
        });

        if (!response.ok){
            throw new Error('Failed to delete user preferences.');
        }
        
        

        return "User preferences succesfully deleted.";

    } catch(error) {
        console.error('Error deleting the user preferences:', error);
        throw error;
    } 
};
// Roomie Preferences Operations
// Fetch roomie preferences function for frontend
const fetchRoomiePrefs = async () => {
    try{
        const token = await getToken();

        const response = await fetch('http://localhost:8080/api/v1/users/user/rooomiePrefs', {
            method: 'GET',
            headers: {
                'Authentication': `Bearer ${token}`,
            },
        });

        if (!response.ok){
            throw new Error('Failed to fetch roomie preferences');
        }
        
        const userProfile = await response.json();

        return userProfile;

    } catch(error) {
        console.error('Error fetching the roomie preferences:', error);
        throw error;
    } 
};

// Update roomie preferences frontend function
const updateRoomiePrefs = async (profileData) => {
    try{
        const token = await getToken();

        const response = await fetch('http://localhost:8080/api/v1/users/user/roomiePrefs', {
            method: 'PUT',
            headers: {
                'Authentication': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok){
            throw new Error('Failed to update roomie preferences');
        }
        
        const userProfile = await response.json();

        return userProfile;

    } catch(error) {
        console.error('Error updating the roomie preferences:', error);
        throw error;
    } 
};

// Delete roomie profile function for frontend
const deleteRoomiePrefs = async () => {
    try{
        const token = await getToken();

        const response = await fetch('http://localhost:8080/api/v1/users/user/roomiePrefs', {
            method: 'DELETE',
            headers: {
                'Authentication': `Bearer ${token}`,
            },
        });

        if (!response.ok){
            throw new Error('Failed to delete roomie preferences.');
        }
        
        

        return "Roomie preferences succesfully deleted.";

    } catch(error) {
        console.error('Error deleting the roomie preferences:', error);
        throw error;
    } 
};

// Housing Preferences Operations
// Fetch housing preferences function for frontend
const fetchHousingPrefs = async () => {
    try{
        const token = await getToken();

        const response = await fetch('http://localhost:8080/api/v1/users/user/housingPrefs', {
            method: 'GET',
            headers: {
                'Authentication': `Bearer ${token}`,
            },
        });

        if (!response.ok){
            throw new Error('Failed to fetch housing preferences');
        }
        
        const userProfile = await response.json();

        return userProfile;

    } catch(error) {
        console.error('Error fetching the housing preferences:', error);
        throw error;
    } 
};

// Update housing preferences frontend function
const updateHousingPrefs = async (profileData) => {
    try{
        const token = await getToken();

        const response = await fetch('http://localhost:8080/api/v1/users/user/housingPrefs', {
            method: 'PUT',
            headers: {
                'Authentication': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok){
            throw new Error('Failed to update housing preferences');
        }
        
        const userProfile = await response.json();

        return userProfile;

    } catch(error) {
        console.error('Error updating the housing preferences:', error);
        throw error;
    } 
};

// Delete housing preferences function for frontend
const deleteHousingPrefs = async () => {
    try{
        const token = await getToken();

        const response = await fetch('http://localhost:8080/api/v1/users/user/housingPrefs', {
            method: 'DELETE',
            headers: {
                'Authentication': `Bearer ${token}`,
            },
        });

        if (!response.ok){
            throw new Error('Failed to delete housing preferences.');
        }
        
        

        return "Housing preferences succesfully deleted.";

    } catch(error) {
        console.error('Error deleting the housing preferences:', error);
        throw error;
    } 
};

// export modules
export {
    login, signUp, fetchUserInfo, updateUserInfo, deleteUserInfo, fetchUserProfile, updateUserProfile, deleteUserProfile, fetchPersonalPrefs, updatePersonalPrefs, deletePersonalPrefs, fetchRoomiePrefs, updateRoomiePrefs, deleteRoomiePrefs, fetchHousingPrefs, updateHousingPrefs, deleteHousingPrefs
}
