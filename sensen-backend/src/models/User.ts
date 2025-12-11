import mongoose, { Schema, model, Document, CallbackError } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the interface for a User document
export interface IUser extends Document {
  username: string;
  password?: string; // Password is optional when fetching user data
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the Mongoose schema for a User
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Do not return password by default when querying for users
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to hash password before saving
userSchema.pre<IUser>('save', async function (this: IUser) { // Make the function async and remove next parameter
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return; // No next(), just return if not modified
  }
  
  // No explicit try/catch around bcrypt.hash here. Errors from async hooks will automatically be caught by Mongoose.
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
}) as any;

// Method to compare candidate password with the user's password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password as string);
};


// Create and export the User model
const User = model<IUser>('User', userSchema);

export default User;
