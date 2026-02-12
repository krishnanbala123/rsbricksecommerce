import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, unique: true }, // Firebase / Auth UID

    name: String,
    email: String,
    phone: String,
    photoURL: String,
     dob: String,
    address: String,

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
