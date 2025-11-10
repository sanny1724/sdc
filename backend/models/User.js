import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say', ''],
    default: ''
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  heightCm: {
    type: Number,
    min: 0,
    default: undefined
  },
  weightKg: {
    type: Number,
    min: 0,
    default: undefined
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']
  },
  medicalHistory: {
    type: String,
    default: ''
  },
  currentMedications: {
    type: String,
    default: ''
  },
  chronicConditions: {
    type: String,
    default: ''
  },
  allergies: {
    type: String,
    default: ''
  },
  emergencyContact: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    relationship: {
      type: String,
      default: ''
    }
  },
  primaryPhysician: {
    name: { type: String, default: '' },
    phone: { type: String, default: '' },
    hospital: { type: String, default: '' }
  },
  address: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

export default User;

