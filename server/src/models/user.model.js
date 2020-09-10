import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, "E-Mail address is required."]
  },
  username: {
    type: String,
    required: [true, "Username is required."],
  },
  password: {
    type: String,
    min: [8, "Must be 8 character"],
    required: [true, "Password is required."]
  },
  created_date: {
    type: Date,
  },
  last_login: {
    type: Date,
    default: Date.now(),
  }
});

export default mongoose.model("User", UserSchema);
