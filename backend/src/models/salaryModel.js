import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
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
    monthlySalary: {
      type: Number,
      required: true,
      default: 0
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

salarySchema.index(
  { staffId: 1, month: 1, year: 1 },
  { unique: true, partialFilterExpression: { deleted: false } }
);

const SalaryModel = mongoose.model('Salary', salarySchema);
export default SalaryModel;
