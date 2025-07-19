import mongoose from 'mongoose';


const staffSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, 'Full name must be at least 3 characters long'],
      maxLength: [50, 'Full name must be at most 50 characters long']
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
      minLength: [10, 'Contact number must be at least 10 characters long'],
      maxLength: [15, 'Contact number must be at most 15 characters long']
    },
    email: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`
      }
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, 'Address must be at least 3 characters long'],
      maxLength: [500, 'Address must be at most 500 characters long']
    },
    dateOfJoining: {
      type: Date,
      required: true,
      min: [new Date('2000-01-01'), 'Date of joining must be a valid date'],
      validate: {
        validator: function (v) {
          return v <= new Date();
        },
        message: 'Date of joining cannot be in the future'
      }
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

staffSchema.index({ employeeId: 1 }, { unique: true, partialFilterExpression: { deleted: false } });

const StaffModel = mongoose.model('Staff', staffSchema);
export default StaffModel;
