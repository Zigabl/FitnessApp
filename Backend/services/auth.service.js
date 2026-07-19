const bcrypt = require("bcrypt");
const Users = require("../models/user");

async function registerUser(email, password) {

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const existingUser = await Users.findOne({ email });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new Users({ email, password: hashedPassword });
  await user.save();
  return user;
}

async function loginUser(email, password) {

  if (!email || !password) {
    throw new Error("Email or password is missing");
  }

  const user = await Users.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  return user;
}

module.exports = {
  registerUser,
  loginUser
};