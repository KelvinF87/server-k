// models/User.model.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roles: { type: [String], default: ["user"], required: true },
  active: { type: Boolean, default: true },
  image: { type: String, default: "https://cdn-icons-png.flaticon.com/512/6676/6676023.png" },
}, { timestamps: true });  // Add timestamps

const User = mongoose.model("User", UserSchema);
module.exports = User;