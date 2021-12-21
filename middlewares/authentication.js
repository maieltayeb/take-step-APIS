const businessOwner = require("../models/businessOwner");
const volunteer = require("../models/Volunteer");
const CustomError = require("../helpers/customErorr");
require("express-async-errors");

module.exports = async (req, res, next) => {

const token = req.headers.authorization;
console.log("token",token)
  const userId = req.params.id;
  const businessOwnerid = await businessOwner.findById(userId);
  let User;
  if (businessOwnerid == null) {
    User = volunteer;
    console.log(User);
  } else {
    User = businessOwner;
    console.log(User);
  }
  if (!token) throw CustomError("Login first", 401, "Login faild ");
  const currentUser = await User.getUserFromToken(token);
  req.user = currentUser;
  next();
};
    // const [, token] = req.headers.authorization.split(" ");
  // console.log(token);