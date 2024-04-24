const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Userschema = new Schema({
  username: { type: String, required: true, min: 4, unique: true },
  passeword: { type: String, required: true },
});
const UserModel = model("User", Userschema);

module.exports = UserModel;
