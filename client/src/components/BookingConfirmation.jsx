import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Printer,
  ArrowRight,
  ShieldAlert,
  Stethoscope,
  RotateCcw,
} from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export const BookingConfirmation = ({ appointment, onBookAnother }) => {
  if (!appointment) return null;

  const doctor = appointment.doctorId || {};
  const bookingRef = `#APPT-${appointment._id ? appointment._id.slice(-8).toUpperCase() : 'DEMO'}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white p-8 text-center relative">
        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-teal-100">
          Booking Confirmed
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
          Your Appointment is Scheduled!
        </h2>
        <p className="text-teal-100 text-sm mt-2 max-w-md mx-auto">
          We have reserved your consultation slot with {doctor.name || 'your physician'}. A confirmation has been logged to the clinic system.
        </p>

        {/* Reference Code Badge */}
        <div className="mt-5 inline-flex items-center gap-2 bg-slate-950/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-mono font-bold tracking-wider">
          <span>Booking Reference:</span>
          <span className="text-teal-300">{bookingRef}</span>
        </div>
      </div>

      {/* Appointment Summary Details */}
      <div className="p-8 space-y-6">
        {/* Status & Timestamp */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-slate-200">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Current Status
            </p>
            <div className="mt-1">
              <StatusBadge status={appointment.status || 'Confirmed'} />
            </div>
          </div>
          <div className="text-left sm:text-right text-xs text-slate-500">
            <span>Booked on: </span>
            <span className="font-semibold text-slate-700">
              {new Date(appointment.createdAt || Date.now()).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        {/* Two Column Grid: Doctor & Patient Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Doctor Info Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200">
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>Assigned Physician</span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              {doctor.imageUrl && (
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-12 h-12 rounded-xl object-cover object-top border border-slate-200 shadow-xs"
                />
              )}
              <div>
                <h4 className="text-sm font-bold text-slate-900">{doctor.name || 'Assigned Doctor'}</h4>
                <p className="text-xs text-teal-700 font-medium">{doctor.specialization}</p>
                <p className="text-[11px] text-slate-500">{doctor.department}</p>
              </div>
            </div>

            <div className="pt-2 text-xs flex justify-between text-slate-600 border-t border-slate-200/60">
              <span>Consultation Fee:</span>
              <span className="font-bold text-slate-900">${doctor.consultationFee || 75}</span>
            </div>
          </div>

          {/* Date & Time Slot Card */}
          <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 pb-2 border-b border-teal-200">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Schedule Details</span>
            </div>

            <div className="space-y-2 pt-1 text-sm">
              <div className="flex items-center gap-2.5 text-slate-800">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span className="font-bold">
                  {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-800">
                <Clock className="w-4 h-4 text-teal-600" />
                <span className="font-bold text-teal-800">{appointment.appointmentTime}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600 pt-1">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Suite 300, 742 Evergreen Medical Blvd</span>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Details & Reason */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200">
            <User className="w-4 h-4 text-teal-600" />
            <span>Patient Contact Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Patient Full Name:</span>
              <span className="font-bold text-slate-900 text-sm">{appointment.patientName}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Phone Number:</span>
              <span className="font-bold text-slate-900 text-sm">{appointment.phone}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Email Address:</span>
              <span className="font-bold text-slate-900 text-sm">
                {appointment.email || 'None provided'}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/60 text-xs">
            <span className="text-slate-400 font-medium">Chief Complaint / Visit Reason:</span>
            <p className="font-medium text-slate-700 mt-0.5">
              {appointment.reason || 'General Consultation'}
            </p>
          </div>
        </div>

        {/* Instructions Alert */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs space-y-1">
          <p className="font-bold">Next Steps for Your Visit:</p>
          <ul className="list-disc list-inside space-y-0.5 text-blue-800">
            <li>Please arrive 10 minutes prior to your scheduled time for vital signs check.</li>
            <li>Bring a valid government-issued photo ID and any relevant medical records.</li>
            <li>Complimentary validated parking is available in Garage B.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 text-xs font-bold transition-all shadow-xs"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print Confirmation</span>
            </button>

            <button
              onClick={onBookAnother}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-teal-200 text-teal-700 bg-teal-50 hover:bg-teal-100 text-xs font-bold transition-all"
            >
              <RotateCcw className="w-4 h-4 text-teal-600" />
              <span>Book Another</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all"
            >
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>View in Demo Admin</span>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-xs"
            >
              <span>Back to Home</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

