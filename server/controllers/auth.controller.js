import User from '../mongodb/models/user.js';
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
  try {
    const { 
      //name, temporarily commented out for signup
      email,
      password 
      //location temporarily commented out for signup
    } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists) {
      return res.status(200).json({ message: "User already exists"});
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      //name, temporarily commented out for signup
      password: passwordHash,
      email
      //location  temporarily commented out for signup
    })
    const savedUser = await newUser.save();
    // create a new jwt token for authentication
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    // return the user and token
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    // get the email and password from the request body
    const { email, password } = req.body;
    // find the user using the email
    const user = await User.findOne({ email: email });
    // if a user with the email doesn't exist then return
    if(!user) {
      return res.status(400).json({ message: "User does not exist." });
    }
    // compare the password in the database and the password sent in the request
    const isMatch = await bcrypt.compare(password, user.password);
    // if the password isn't a match then return
    if(!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }
    // create a new jwt token for authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // return the user and token
    res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  login,
  createUser
}