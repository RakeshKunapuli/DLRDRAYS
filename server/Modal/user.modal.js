const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Make name unique
    },
    email: {
      type: String,
      required: true,
      unique: true, // Make email unique
    },
    mobileno: {
      type:String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    gender: {
      type: String, 
      required: true,
    },
    course:{
        type:[String],
        required:true
    },
    image:{
        type:String,
        required:true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userData", UsersSchema);