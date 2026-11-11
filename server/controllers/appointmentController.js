import { Appointment } from '../models/Appointment.js';
import { Doctor } from '../models/Doctor.js';

// @desc    Get all appointments (with optional filters)
// @route   GET /api/appointments
// @access  Public (Demo Admin)
export const getAppointments = async (req, res) => {
  try {
    const { status, doctorId, date, search } = req.query;
    const filter = {};

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (doctorId && doctorId !== 'All') {
      filter.doctorId = doctorId;
    }

    if (date) {
      filter.appointmentDate = date;
    }

    if (search) {
      filter.$or = [
        { patientName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const appointments = await Appointment.find(filter)
      .populate('doctorId', 'name specialization department imageUrl consultationFee')
      .sort({ appointmentDate: -1, appointmentTime: -1, createdAt: -1 });

    // Calculate quick statistics for demo dashboard
    const totalAppointments = await Appointment.countDocuments();
    const pendingCount = await Appointment.countDocuments({ status: 'Pending' });
    const confirmedCount = await Appointment.countDocuments({ status: 'Confirmed' });
    const cancelledCount = await Appointment.countDocuments({ status: 'Cancelled' });
    const completedCount = await Appointment.countDocuments({ status: 'Completed' });

    res.status(200).json({
      success: true,
      count: appointments.length,
      stats: {
        total: totalAppointments,
        pending: pendingCount,
        confirmed: confirmedCount,
        cancelled: cancelledCount,
        completed: completedCount,
      },
      data: appointments,
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching appointments',
      error: error.message,
    });
  }
};

// @desc    Get single appointment by ID
// @route   GET /api/appointments/:id
// @access  Public
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      'doctorId',
      'name specialization department qualification experience imageUrl consultationFee'
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching appointment details',
      error: error.message,
    });
  }
};

// @desc    Get booked slots for a specific doctor and date
// @route   GET /api/appointments/booked-slots
// @access  Public
export const getBookedSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({
        success: false,
        message: 'doctorId and date query parameters are required',
      });
    }

    // Only active (non-cancelled) appointments occupy a time slot
    const appointments = await Appointment.find({
      doctorId,
      appointmentDate: date,
      status: { $ne: 'Cancelled' },
    }).select('appointmentTime');

    const bookedTimes = appointments.map((appt) => appt.appointmentTime);

    res.status(200).json({
      success: true,
      bookedTimes,
    });
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while checking booked time slots',
      error: error.message,
    });
  }
};

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Public
export const createAppointment = async (req, res) => {
  try {
    const { patientName, phone, email, doctorId, appointmentDate, appointmentTime, reason } = req.body;

    // 1. Validation
    if (!patientName || !patientName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Patient name is required',
      });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required',
      });
    }

    // Indian mobile phone validation (e.g. +91 98765 43210, 9876543210, with optional +91 country code)
    const phoneRegex = /^(\+?91[\-\s]?)?[6789]\d{9}$|^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
    if (!phoneRegex.test(phone.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid Indian mobile number (e.g. +91 98765 43210 or 9876543210)',
      });
    }

    if (email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address or leave it blank',
        });
      }
    }

    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: 'Doctor selection is required',
      });
    }

    if (!appointmentDate) {
      return res.status(400).json({
        success: false,
        message: 'Appointment date is required',
      });
    }

    if (!appointmentTime) {
      return res.status(400).json({
        success: false,
        message: 'Appointment time slot is required',
      });
    }

    // Check if doctor exists and is active
    const doctor = await Doctor.findById(doctorId);
    if (!doctor || !doctor.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Selected doctor is not available or does not exist',
      });
    }

    // Pre-check for duplicate booking to provide immediate friendly 409 Conflict
    const conflictingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate,
      appointmentTime,
      status: { $ne: 'Cancelled' },
    });

    if (conflictingAppointment) {
      return res.status(409).json({
        success: false,
        message: `The ${appointmentTime} slot on ${appointmentDate} for ${doctor.name} is already booked. Please select an alternate time slot.`,
      });
    }

    // Create appointment
    const newAppointment = new Appointment({
      patientName: patientName.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      doctorId,
      appointmentDate,
      appointmentTime,
      reason: reason && reason.trim() ? reason.trim() : 'General Consultation',
      status: 'Confirmed', // Demo MVP defaults to Confirmed booking
    });

    const savedAppointment = await newAppointment.save();
    await savedAppointment.populate('doctorId', 'name specialization department imageUrl consultationFee');

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully!',
      data: savedAppointment,
    });
  } catch (error) {
    // Database duplicate key error (code 11000 from unique compound index)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This appointment slot was just booked by another patient. Please choose another time slot.',
      });
    }

    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while booking appointment',
    });
  }
};

// @desc    Update appointment status
// @route   PATCH /api/appointments/:id/status
// @access  Public (Demo Admin)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowedStatuses.join(', ')}`,
      });
    }

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    // If changing from Cancelled to Confirmed/Pending, verify slot hasn't been re-taken
    if (appointment.status === 'Cancelled' && (status === 'Confirmed' || status === 'Pending')) {
      const conflict = await Appointment.findOne({
        _id: { $ne: appointment._id },
        doctorId: appointment.doctorId,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        status: { $ne: 'Cancelled' },
      });

      if (conflict) {
        return res.status(409).json({
          success: false,
          message: 'Cannot restore appointment: that slot has already been booked by another patient.',
        });
      }
    }

    appointment.status = status;
    const updatedAppointment = await appointment.save();
    await updatedAppointment.populate('doctorId', 'name specialization department imageUrl');

    res.status(200).json({
      success: true,
      message: `Appointment status updated to ${status}`,
      data: updatedAppointment,
    });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating appointment status',
      error: error.message,
    });
  }
};

