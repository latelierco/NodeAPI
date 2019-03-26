import { model, Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
  createdAt: {
    default: Date.now,
    type: Date,
  },
  email: {
    required: true,
    unique: true,
    type: String,
  },
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  role: {
    default: 1,
    type: Number,
  },
  updatedAt: {
    default: Date.now,
    type: Date,
  },
  username: {
    lowercase: true,
    required: true,
    type: String,
    unique: true,
  },
});

export default model('User', UserSchema);