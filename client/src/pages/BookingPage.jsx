import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  fetchDoctors,
  fetchBookedSlots,
  bookAppointment,
} from '../services/api';
import { BookingConfirmation } from '../components/BookingConfirmation';
import { formatINR, formatIndianDate } from '../services/formatters';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  Stethoscope,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Loader2,
  DollarSign,
  Info,
  Sparkles,
} from 'lucide-react';

export const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const preSelectedDoctorId = searchParams.get('doctorId');

  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    doctorId: preSelectedDoctorId || '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
  });

  // Slot Management State
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // UI Flow State
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);

  // Calculate minimum selectable date (today in YYYY-MM-DD)
  const todayStr = new Date().toISOString().split('T')[0];

  // Load all doctors on mount
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoadingDoctors(true);
        const res = await fetchDoctors();
        if (res && res.data) {
          setDoctors(res.data);
          // If pre-selected doctor passed via query param, verify it exists
          if (preSelectedDoctorId) {
            const match = res.data.find((d) => d._id === preSelectedDoctorId);
            if (match) {
              setFormData((prev) => ({ ...prev, doctorId: preSelectedDoctorId }));
            }
          } else if (res.data.length > 0 && !formData.doctorId) {
            // Default select the first doctor
            setFormData((prev) => ({ ...prev, doctorId: res.data[0]._id }));
          }
        }
      } catch (err) {
        console.error('Failed to load doctors for booking form:', err);
        setServerError('Unable to load doctors list. Please check your connection.');
      } finally {
        setLoadingDoctors(false);
      }
    };

    loadDoctors();
  }, [preSelectedDoctorId]);

  // Set default appointment date to tomorrow if none selected
  useEffect(() => {
    if (!formData.appointmentDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      setFormData((prev) => ({ ...prev, appointmentDate: tomorrowStr }));
    }
  }, []);

  // Fetch booked slots whenever doctorId or appointmentDate changes
  useEffect(() => {
    const checkBookedSlots = async () => {
      if (!formData.doctorId || !formData.appointmentDate) {
        setBookedSlots([]);
        return;
      }

      try {
        setLoadingSlots(true);
        const res = await fetchBookedSlots(formData.doctorId, formData.appointmentDate);
        if (res && res.bookedTimes) {
          setBookedSlots(res.bookedTimes);
          // If current selected time is already booked on this newly selected date, clear it
          if (res.bookedTimes.includes(formData.appointmentTime)) {
            setFormData((prev) => ({ ...prev, appointmentTime: '' }));
          }
        }
      } catch (err) {
        console.error('Error checking booked slots:', err);
      } finally {
        setLoadingSlots(false);
      }
    };

    checkBookedSlots();
  }, [formData.doctorId, formData.appointmentDate]);

  // Selected Doctor object
  const selectedDoctor = doctors.find((d) => d._id === formData.doctorId);

  // Available time slots for the selected doctor
  const availableSlotsList = selectedDoctor?.timeSlots || [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
  ];

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient full name is required';
    } else if (formData.patientName.trim().length < 2) {
      newErrors.patientName = 'Name must be at least 2 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact mobile number is required';
    } else {
      const phoneRegex = /^(\+?91[\-\s]?)?[6789]\d{9}$|^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = 'Please enter a valid Indian mobile number (e.g. +91 98765 43210 or 9876543210)';
      }
    }

    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.doctorId) {
      newErrors.doctorId = 'Please select a doctor';
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Please select an appointment date';
    } else if (formData.appointmentDate < todayStr) {
      newErrors.appointmentDate = 'Appointment date cannot be in the past';
    }

    if (!formData.appointmentTime) {
      newErrors.appointmentTime = 'Please select a preferred time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (serverError) {
      setServerError(null);
    }
  };

  const handleSlotSelect = (slot) => {
    if (bookedSlots.includes(slot)) return; // Disallow selecting booked slots
    setFormData((prev) => ({ ...prev, appointmentTime: slot }));
    if (errors.appointmentTime) {
      setErrors((prev) => ({ ...prev, appointmentTime: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      // Scroll to first error
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    try {
      setSubmitting(true);
      const res = await bookAppointment(formData);
      if (res && res.success && res.data) {
        setConfirmedAppointment(res.data);
        window.scrollTo({ top: 100, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      const message =
        err.response?.data?.message ||
        'Unable to complete booking. Please try again or choose an alternate time.';
      setServerError(message);

      // If it was a duplicate slot conflict (409), refresh booked slots immediately!
      if (err.response?.status === 409) {
        try {
          const slotsRes = await fetchBookedSlots(formData.doctorId, formData.appointmentDate);
          if (slotsRes && slotsRes.bookedTimes) {
            setBookedSlots(slotsRes.bookedTimes);
          }
        } catch (ignored) {}
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleAutoFillDemo = () => {
    const demoPatients = [
      {
        name: 'Rahul Sharma',
        phone: '+91 98765 43210',
        email: 'rahul.sharma@example.com',
        reason: 'Annual preventive physical and routine fasting blood sugar review',
      },
      {
        name: 'Priya Verma',
        phone: '+91 91234 56780',
        email: 'priya.verma@example.com',
        reason: 'Cardiology follow-up and blood pressure monitoring',
      },
      {
        name: 'Arjun Gupta',
        phone: '+91 94500 12345',
        email: 'arjun.gupta@example.com',
        reason: 'Persistent skin allergy, dust rash, and prescription review',
      },
      {
        name: 'Sneha Mishra',
        phone: '+91 93350 98765',
        email: 'sneha.mishra@example.com',
        reason: 'Knee joint stiffness and discomfort after morning walks',
      },
      {
        name: 'Ananya Singh',
        phone: '+91 87654 32109',
        email: 'ananya.singh@example.com',
        reason: 'Childhood vaccination booster and pediatric growth assessment',
      },
    ];
    const chosen = demoPatients[Math.floor(Math.random() * demoPatients.length)];
    setFormData((prev) => ({
      ...prev,
      patientName: chosen.name,
      phone: chosen.phone,
      email: chosen.email,
      reason: chosen.reason,
    }));
    setErrors({});
  };

  const handleReset = () => {
    setConfirmedAppointment(null);
    setFormData({
      patientName: '',
      phone: '',
      email: '',
      doctorId: doctors[0]?._id || '',
      appointmentDate: todayStr,
      appointmentTime: '',
      reason: '',
    });
    setErrors({});
    setServerError(null);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-teal-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-800">Book Appointment</span>
        </div>

        {/* If Confirmation is active, show confirmation screen */}
        {confirmedAppointment ? (
          <BookingConfirmation
            appointment={confirmedAppointment}
            onBookAnother={handleReset}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 8 Cols: Main Appointment Form */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md">
              <div className="border-b border-slate-200 pb-6 mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                  Online Scheduling
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                  Book Your Clinic Consultation
                </h1>
                <p className="text-slate-600 text-sm mt-1">
                  Fill out the patient details below and select your preferred doctor and time slot.
                </p>
              </div>

              {/* Server-side Error Banner */}
              {serverError && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider">Booking Notice</p>
                    <p className="text-sm font-medium mt-0.5">{serverError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                {/* Section 1: Patient Information */}
                <div>
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <User className="w-4 h-4 text-teal-600" />
                      <span>Step 1: Patient Contact Information</span>
                    </h3>
                    <button
                      type="button"
                      onClick={handleAutoFillDemo}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all shadow-2xs"
                      title="Quickly fill realistic sample data for client demonstration"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                      <span>Autofill Demo Patient</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Patient Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Patient Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        placeholder="e.g. Liam Henderson"
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all ${
                          errors.patientName
                            ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-500'
                            : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                        }`}
                      />
                      {errors.patientName && (
                        <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.patientName}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 98765 43210"
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all ${
                          errors.phone
                            ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-500'
                            : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Email (Optional) */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email Address <span className="text-slate-400 font-normal lowercase">(optional)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. rahul@example.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all ${
                          errors.email
                            ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-500'
                            : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 2: Doctor Selection */}
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <Stethoscope className="w-4 h-4 text-teal-600" />
                    <span>Step 2: Select Physician</span>
                  </h3>

                  {loadingDoctors ? (
                    <div className="py-6 flex items-center gap-3 text-slate-500 text-sm">
                      <Loader2 className="w-5 h-5 animate-spin text-teal-600" />
                      <span>Loading available doctors...</span>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Choose Specialty Physician <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="doctorId"
                        value={formData.doctorId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                      >
                        {doctors.map((doc) => (
                          <option key={doc._id} value={doc._id}>
                            {doc.name} — {doc.specialization} ({formatINR(doc.consultationFee)})
                          </option>
                        ))}
                      </select>

                      {/* Doctor mini-preview card */}
                      {selectedDoctor && (
                        <div className="mt-3 p-4 rounded-2xl bg-teal-50/50 border border-teal-100 flex items-center gap-4">
                          <img
                            src={selectedDoctor.imageUrl}
                            alt={selectedDoctor.name}
                            className="w-12 h-12 rounded-xl object-cover object-top border border-teal-200 shadow-2xs"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-bold text-slate-900">
                                {selectedDoctor.name}
                              </h4>
                              <span className="text-xs font-bold text-teal-700">
                                {formatINR(selectedDoctor.consultationFee)} fee
                              </span>
                            </div>
                            <p className="text-xs text-teal-700 font-medium">
                              {selectedDoctor.specialization} • {selectedDoctor.department}
                            </p>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              Available: {selectedDoctor.availableDays.join(', ')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Section 3: Date & Time Slot Selection */}
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <span>Step 3: Appointment Date & Time Slot</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Date Picker */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Appointment Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="appointmentDate"
                        min={todayStr}
                        value={formData.appointmentDate}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all ${
                          errors.appointmentDate
                            ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-500'
                            : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                        }`}
                      />
                      {errors.appointmentDate && (
                        <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.appointmentDate}</span>
                        </p>
                      )}
                    </div>

                    {/* Date Information Notice */}
                    <div className="flex items-center">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                        <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>
                          Time slots update automatically based on real-time doctor availability and existing bookings.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Time Slots Pills Selector */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Available Time Slots <span className="text-rose-500">*</span>
                      </label>
                      {loadingSlots && (
                        <span className="flex items-center gap-1.5 text-xs text-teal-600 font-medium">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Checking slots...</span>
                        </span>
                      )}
                    </div>

                    {errors.appointmentTime && (
                      <p className="mb-2 text-xs text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.appointmentTime}</span>
                      </p>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                      {availableSlotsList.map((slot) => {
                        const isBooked = bookedSlots.includes(slot);
                        const isSelected = formData.appointmentTime === slot;

                        return (
                          <button
                            type="button"
                            key={slot}
                            disabled={isBooked}
                            onClick={() => handleSlotSelect(slot)}
                            className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center relative ${
                              isBooked
                                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
                                : isSelected
                                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 ring-2 ring-teal-600 ring-offset-2'
                                : 'bg-white text-slate-700 border border-slate-200 hover:border-teal-400 hover:bg-teal-50/50'
                            }`}
                          >
                            <span>{slot}</span>
                            {isBooked ? (
                              <span className="text-[10px] text-rose-500 font-semibold mt-0.5">
                                Booked
                              </span>
                            ) : isSelected ? (
                              <span className="text-[10px] text-teal-100 font-semibold mt-0.5">
                                Selected
                              </span>
                            ) : (
                              <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                                Available
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Section 4: Visit Reason (Optional) */}
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4 text-teal-600" />
                    <span>Step 4: Visit Purpose (Optional)</span>
                  </h3>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Reason for Consultation / Symptoms
                    </label>
                    <textarea
                      name="reason"
                      rows={3}
                      value={formData.reason}
                      onChange={handleInputChange}
                      placeholder="e.g. Annual physical exam, ongoing knee stiffness, persistent headache for two weeks..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    ></textarea>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-500">
                    By submitting, you confirm you are booking a demonstration appointment.
                  </p>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 disabled:bg-teal-400 shadow-md shadow-teal-600/30 transition-all transform hover:-translate-y-0.5"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Confirming Reservation...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Appointment</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right 4 Cols: Live Booking Summary Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md sticky top-28 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-base font-bold text-slate-900">
                    Appointment Summary
                  </h3>
                  <p className="text-xs text-slate-500">Live preview of your booking details</p>
                </div>

                {/* Doctor Preview */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                    Selected Physician
                  </span>
                  {selectedDoctor ? (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <img
                        src={selectedDoctor.imageUrl}
                        alt={selectedDoctor.name}
                        className="w-10 h-10 rounded-lg object-cover object-top border border-slate-200"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{selectedDoctor.name}</p>
                        <p className="text-[11px] text-teal-700 font-medium">
                          {selectedDoctor.specialization}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No doctor selected</p>
                  )}
                </div>

                {/* Date & Time Preview */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                    Schedule Slot
                  </span>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Date:</span>
                      <span className="font-bold text-slate-900">
                        {formData.appointmentDate
                          ? formatIndianDate(formData.appointmentDate)
                          : 'Not set'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Time Slot:</span>
                      <span className={`font-bold ${formData.appointmentTime ? 'text-teal-700' : 'text-slate-400'}`}>
                        {formData.appointmentTime ? `${formData.appointmentTime} (IST)` : 'Select time slot'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Patient Preview */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                    Patient Name
                  </span>
                  <p className="text-xs font-semibold text-slate-800 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    {formData.patientName || 'Enter patient name above'}
                  </p>
                </div>

                {/* Fee Preview */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-600">Consultation Fee:</span>
                  <span className="text-base font-extrabold text-teal-700">
                    {formatINR(selectedDoctor?.consultationFee || 500)}
                  </span>
                </div>

                {/* Clinic Guarantee Card */}
                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 text-xs text-teal-900 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-teal-700" />
                    <span>Zero Waiting Policy</span>
                  </div>
                  <p className="text-[11px] text-teal-800 leading-normal">
                    Your appointment slot is immediately locked upon booking. No double-booking and no unexpected waiting room delays.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

