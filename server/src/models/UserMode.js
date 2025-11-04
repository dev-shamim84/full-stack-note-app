import mongoose from "mongoose";
const DataSchema = mongoose.Schema([
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
]);

const UserModel = mongoose.model("users", DataSchema);

export default UserModel;
