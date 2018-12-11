import { model, Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
  createdAt: {
    default: Date.now,
    type: Date,
  },
  email: {
    default: '',
    required: true,
    type: String,
  },
  firstName: {
    default: '',
    required: true,
    type: String,
  },
  lastName: {
    default: '',
    required: true,
    type: String,
  },
  password: {
    default: '',
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
    default: '',
    lowercase: true,
    required: true,
    type: String,
    unique: true,
  },
});

export default model('User', UserSchema);