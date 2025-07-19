import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, 'Full name must be at least 3 characters long'],
      maxLength: [50, 'Full name must be at most 50 characters long']
    },
    class: {
      type: String,
      required: true,
      trim: true,
      enum: ['Nursery', 'Lower', 'Upper', 'One', 'Two', 'Three'],
      set: (v) => {
        if (!v) return v;
        v = v.trim();
        return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
      }
    },
    section: {
      type: String,
      required: true,
      trim: true,
      enum: ['A', 'B', 'C', 'D','E'],
      set: (v) => v.toUpperCase()
    },
    rollNumber: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, 'Roll number must be at least 2 characters long']
    },
    guardianName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, 'Guardian name must be at least 3 characters long'],
      maxLength: [50, 'Guardian name must be at most 50 characters long']
    },
    guardianContact: {
      type: String,
      required: true,
      trim: true,
      minLength: [
        10,
        'Guardian contact number must be at least 10 characters long'
      ],
      maxLength: [
        15,
        'Guardian contact number must be at most 15 characters long'
      ]
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, 'Address must be at least 3 characters long'],
      maxLength: [500, 'Address must be at most 500 characters long']
    },
    email: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true; // Allow empty email
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`
      }
    },
    dateOfBirth: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v < new Date();
        },
        message: 'Date of birth cannot be in the future'
      }
    },
    admissionDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v < new Date();
        },
        message: 'Admission date cannot be in the future'
      }
    },
    academicYear: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          const year = parseInt(v, 10);
          if (isNaN(year)) return false;
          const currentYear = new Date().getFullYear();
          return year >= currentYear - 5 && year <= currentYear + 5;
        },
        message: 'Academic year must be between 2020 and the current year'
      }
    },
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

studentSchema.index(
  { class: 1, section: 1, rollNumber: 1 },
  { unique: true, partialFilterExpression: { deleted: false } }
);

const StudentModel = mongoose.model('Student', studentSchema);
export default StudentModel;
