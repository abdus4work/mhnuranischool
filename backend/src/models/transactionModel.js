import mongoose from 'mongoose';

export const transactionSchema = mongoose.Schema(
  {
    payee: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'payeeModel',
      required: true
    },
    payeeModel: {
      type: String,
      required: true,
      enum: ['Student', 'Staff']
    },
    type: {
      type: String,
      required: true,
      enum: ['FEES', 'SALARY']
    },

    paymentId: {
      type: String,
      required: true,
      unique: true
    },
    amount: {
      type: Number,
      required: true,
      min: [0, 'Amount must be a positive number']
    },
    month: {
      type: Number,
      required: true,
      min: [1, 'Month must be between 1 and 12'],
      max: [12, 'Month must be between 1 and 12']
    },
    year: {
      type: Number,
      required: true,
      min: [2000, 'Year must be a valid year'],
      validate: {
        validator: function (v) {
          return v <= new Date().getFullYear();
        },
        message: 'Year cannot be in the future'
      }
    },
    paymentDate: {
      type: String,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ['CASH', 'BANK_TRANSFER', 'UPI'],
      required: true
    },
    paymentReference: {
      type: String,
      required: true
    },
    notes: {
      type: String,
      default: null,
      set: (v) => (v ? v.trim() : v),
      maxLength: [200, 'Notes must be at most 200 characters long']
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
transactionSchema.pre('validate', function (next) {
  if (!this.payeeModel && this.type) {
    if (this.type === 'FEES') this.payeeModel = 'Student';
    else if (this.type === 'SALARY') this.payeeModel = 'Staff';
  }
  next();
});

transactionSchema.index(
  { payee: 1, month: 1, year: 1, type: 1 },
  { unique: true }
);
export const TransactionModel = mongoose.model(
  'Transaction',
  transactionSchema
);
