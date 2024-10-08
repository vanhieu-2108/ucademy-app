import { EUserRole, EUserStatus } from "@/types/enum";
import { Document, Schema, model, models } from "mongoose";

// clerkId
export interface IUser extends Document {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  courses: Schema.Types.ObjectId[];
  status: EUserStatus;
  role: EUserRole;
  created_at: Date;
}

const userSchema = new Schema<IUser>({
  clerkId: { type: String },
  name: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  status: {
    type: String,
    enum: Object.values(EUserStatus),
    default: EUserStatus.ACTIVE,
  },
  role: {
    type: String,
    enum: Object.values(EUserRole),
    default: EUserRole.USER,
  },
  created_at: { type: Date, default: Date.now },
});

const User = models.User || model("User", userSchema);
export default User;
