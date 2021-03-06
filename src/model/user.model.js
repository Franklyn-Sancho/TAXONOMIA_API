const mongoose = require("mongoose");

const user = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  token: {type: String}
});

module.exports = mongoose.model("User", user);
