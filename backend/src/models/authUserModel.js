import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userAuthSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'student', 'teacher'],
      set: (v) => v.toLowerCase()
    },
    linkedId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: function () {
        return this.role === 'student' ? 'Student' : 'Staff';
      }
    },
    refreshToken: {
      type: String,
      default: null
    },
    tokenVersion: {
      type: Number,
      default: 0
    },
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date
    },
  },
  {
    timestamps: true
  }
);

userAuthSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
userAuthSchema.index(
  { username: 1 },
  { unique: true, partialFilterExpression: { deleted: false } }
);
const AuthModel = mongoose.model('UserAuth', userAuthSchema);
export default AuthModel;
