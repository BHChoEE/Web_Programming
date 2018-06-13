const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  updateTime: Date
});
userSchema.plugin(uniqueValidator);

module.exports = userSchema;