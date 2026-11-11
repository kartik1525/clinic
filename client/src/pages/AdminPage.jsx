import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchAppointments,
  fetchDoctors,
  updateAppointmentStatus,
} from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { formatINR, formatIndianDate } from '../services/formatters';
import {
  ShieldAlert,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Search,
  Filter,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  ChevronRight,
  MoreVertical,
  Activity,
  Layers,
  ArrowUpDown,
  Download,
} from 'lucide-react';

export const AdminPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
  });
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [notification, setNotification] = useState(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState('All');
  const [doctorFilter, setDoctorFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [apptsRes, doctorsRes] = await Promise.all([
        fetchAppointments({
          status: statusFilter !== 'All' ? statusFilter : undefined,
          doctorId: doctorFilter !== 'All' ? doctorFilter : undefined,
          date: dateFilter || undefined,
          search: searchQuery || undefined,
        }),
        fetchDoctors(),
      ]);

      if (apptsRes && apptsRes.data) {
        setAppointments(apptsRes.data);
        if (apptsRes.stats) {
          setStats(apptsRes.stats);
        }
      }

      if (doctorsRes && doctorsRes.data) {
        setDoctors(doctorsRes.data);
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
      showNotification('error', 'Failed to retrieve appointments from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, doctorFilter, dateFilter]);

  // Debounced search trigger or manual search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadData();
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      setUpdatingId(appointmentId);
      const res = await updateAppointmentStatus(appointmentId, newStatus);
      if (res && res.success) {
        showNotification('success', `Appointment status updated to ${newStatus}`);
        // Reload all data to refresh statistics counters
        await loadData();
      }
    } catch (err) {
      console.error('Error updating appointment status:', err);
      const msg = err.response?.data?.message || 'Failed to update appointment status.';
      showNotification('error', msg);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExportCSV = () => {
    if (!appointments.length) {
      showNotification('error', 'No appointments to export.');
      return;
    }

    const headers = [
      'Booking ID',
      'Patient Name',
      'Mobile Number (+91)',
      'Email Address',
      'Doctor Name',
      'Department',
      'Consultation Fee (INR)',
      'Appointment Date',
      'Appointment Time',
      'Status',
      'Reason for Visit',
    ];

    const rows = appointments.map((a) => [
      `"${a._id}"`,
      `"${a.patientName}"`,
      `"${a.phone}"`,
      `"${a.email || ''}"`,
      `"${a.doctorId?.name || 'Unassigned'}"`,
      `"${a.doctorId?.department || ''}"`,
      `"${a.doctorId?.consultationFee ? `₹${a.doctorId.consultationFee}` : '₹500'}"`,
      `"${formatIndianDate(a.appointmentDate)}"`,
      `"${a.appointmentTime} IST"`,
      `"${a.status}"`,
      `"${(a.reason || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `apexcare_appointments_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('success', 'Exported appointments table to CSV file.');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Demonstration MVP Disclaimer Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900">
                  Demonstration Interface Only
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900">
                  ApexCare Lucknow MVP
                </span>
              </div>
              <p className="text-xs text-amber-800 mt-0.5">
                This dashboard is provided for prototype demonstration for ApexCare Multispeciality Clinic (Gomti Nagar, Lucknow). In a production healthcare system, access is restricted by Ayushman Bharat Digital Mission (ABDM) compliance and role-based staff authorization.
              </p>
            </div>
          </div>

          <Link
            to="/book"
            className="shrink-0 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            Test Booking Form
          </Link>
        </div>

        {/* Page Title & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <Link to="/" className="hover:text-teal-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-semibold text-slate-800">Demo Admin Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Appointment Management Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Live inspection and status orchestration of clinic patient bookings stored in MongoDB.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              disabled={loading || appointments.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all shadow-xs disabled:opacity-50"
              title="Download appointments as CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Records</span>
            </button>
          </div>
        </div>

        {/* Toast Notification Alert */}
        {notification && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-150 ${
              notification.type === 'success'
                ? 'bg-teal-50 border border-teal-200 text-teal-900'
                : 'bg-rose-50 border border-rose-200 text-rose-900'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Total Appointments */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Bookings
              </span>
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900">{stats.total}</p>
            <p className="text-[11px] text-slate-500">All registered appointments</p>
          </div>

          {/* Pending Appointments */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Pending
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-amber-600">{stats.pending}</p>
            <p className="text-[11px] text-slate-500">Awaiting clinical review</p>
          </div>

          {/* Confirmed Appointments */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                Confirmed
              </span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-teal-600">{stats.confirmed}</p>
            <p className="text-[11px] text-slate-500">Scheduled & active slots</p>
          </div>

          {/* Completed Appointments */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Completed
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-blue-600">{stats.completed}</p>
            <p className="text-[11px] text-slate-500">Consultations fulfilled</p>
          </div>

          {/* Cancelled Appointments */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                Cancelled
              </span>
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-rose-600">{stats.cancelled}</p>
            <p className="text-[11px] text-slate-500">Freed slots available</p>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Search Patient / Phone
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Patient name, +91 mobile, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Status Filter
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Doctor Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Doctor Filter
              </label>
              <select
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
              >
                <option value="All">All Doctors</option>
                {doctors.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name} ({d.department} - {formatINR(d.consultationFee)})
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Filter by Date
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
                {dateFilter && (
                  <button
                    type="button"
                    onClick={() => setDateFilter('')}
                    className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Appointments Table Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Scheduled Appointments ({appointments.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time booking records synchronized with MongoDB
              </p>
            </div>
          </div>

          {loading ? (
            <div className="py-24 text-center">
              <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs font-semibold text-slate-600">Loading appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="py-20 text-center text-slate-500 space-y-3">
              <p className="text-sm">No appointments found matching your filters.</p>
              <button
                onClick={() => {
                  setStatusFilter('All');
                  setDoctorFilter('All');
                  setSearchQuery('');
                  setDateFilter('');
                }}
                className="text-xs text-teal-600 font-semibold hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-6">Patient Details</th>
                    <th className="py-3.5 px-6">Doctor / Specialty</th>
                    <th className="py-3.5 px-6">Appointment Slot</th>
                    <th className="py-3.5 px-6">Reason / Complaint</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {appointments.map((appt) => {
                    const doc = appt.doctorId || {};
                    const isUpdating = updatingId === appt._id;

                    return (
                      <tr
                        key={appt._id}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        {/* Patient Name & Contacts */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-900 text-sm">
                            {appt.patientName}
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-0.5">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{appt.phone}</span>
                          </div>
                          {appt.email && (
                            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span className="truncate max-w-[160px]">{appt.email}</span>
                            </div>
                          )}
                        </td>

                        {/* Doctor */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2.5">
                            {doc.imageUrl && (
                              <img
                                src={doc.imageUrl}
                                alt={doc.name || 'Doctor'}
                                className="w-9 h-9 rounded-lg object-cover object-top border border-slate-200 shrink-0"
                              />
                            )}
                            <div>
                              <div className="font-semibold text-slate-900">
                                {doc.name || 'Unknown Doctor'}
                              </div>
                              <div className="text-[11px] text-teal-700 font-medium">
                                {doc.specialization || doc.department || 'General Medicine'} • {formatINR(doc.consultationFee || 500)}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Schedule Date & Time */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 font-bold text-slate-900">
                            <Calendar className="w-3.5 h-3.5 text-teal-600" />
                            <span>
                              {formatIndianDate(appt.appointmentDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-teal-700 font-bold text-xs mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-teal-600" />
                            <span>{appt.appointmentTime} (IST)</span>
                          </div>
                        </td>

                        {/* Reason */}
                        <td className="py-4 px-6 max-w-xs">
                          <p className="text-slate-600 line-clamp-2 leading-relaxed">
                            {appt.reason || 'General Consultation'}
                          </p>
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <StatusBadge status={appt.status} />
                        </td>

                        {/* Status Action Dropdown */}
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <select
                            disabled={isUpdating}
                            value={appt.status}
                            onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:border-teal-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 shadow-2xs"
                          >
                            <option value="Pending">Set Pending</option>
                            <option value="Confirmed">Set Confirmed</option>
                            <option value="Completed">Set Completed</option>
                            <option value="Cancelled">Set Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

