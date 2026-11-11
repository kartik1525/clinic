import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
      minlength: [2, 'Patient name must be at least 2 characters'],
      maxlength: [100, 'Patient name cannot exceed 100 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: [true, 'Doctor selection is required'],
    },
    appointmentDate: {
      type: String, // Stored as YYYY-MM-DD
      required: [true, 'Appointment date is required'],
      trim: true,
    },
    appointmentTime: {
      type: String, // e.g. "10:00 AM"
      required: [true, 'Appointment time is required'],
      trim: true,
    },
    reason: {
      type: String,
      trim: true,
      default: 'General Consultation',
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Confirmed',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Database-level unique compound index to prevent double-booking for the same doctor, date and time
// accounting for cancelled appointments (partialFilterExpression ensures cancelled slots can be re-booked)
appointmentSchema.index(
  { doctorId: 1, appointmentDate: 1, appointmentTime: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $ne: 'Cancelled' } },
    name: 'unique_active_doctor_slot',
  }
);

export const Appointment = mongoose.model('Appointment', appointmentSchema);

