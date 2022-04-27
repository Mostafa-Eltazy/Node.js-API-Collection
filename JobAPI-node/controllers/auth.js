const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const jwt = require('jsonwebtoken')
////////////////////
// import db scehmas
/////////////////////
const User = require("../models/User");
////////////////////////
// implement controllers
////////////////////////
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT()
  res.status(StatusCodes.ACCEPTED).json({ user:{name: user.name},token });
};
const login = async (req, res) => {
  const {email, password} = req.body
  if (!email||!password){
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({email})
  if(!user){
    throw new UnauthenticatedError('Invalid Email')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect){
    throw new UnauthenticatedError("The email and password don't match")
  }
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({user: {name:user.name}, token})
};
module.exports = {
  register,
  login,
};
