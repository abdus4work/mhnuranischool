import mongoose from 'mongoose';

const studentFeesSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12
    },
    year: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['PAID', 'NA', 'DUE'],
      default: 'NA'
    },
    monthlyFees: {
      type: Number,
      required: true
    },
    paymentRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
      default: null
    },
    generated: {
      type: Boolean,
      default: false
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);
studentFeesSchema.index(
  { studentId: 1, month: 1, year: 1 },
  { unique: true, partialFilterExpression: { deleted: false } }
);
const FeesModel = mongoose.model('StudentFees', studentFeesSchema);
export default FeesModel;
