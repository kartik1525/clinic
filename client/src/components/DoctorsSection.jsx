import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchDoctors } from '../services/api';
import { formatINR } from '../services/formatters';
import {
  Star,
  Calendar,
  Clock,
  Award,
  GraduationCap,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Search,
  CheckCircle2,
} from 'lucide-react';

export const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const loadDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchDoctors();
      if (res && res.data) {
        setDoctors(res.data);
      }
    } catch (err) {
      console.error('Failed to load doctors:', err);
      setError('Unable to load doctors from the backend server. Please verify the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const departments = [
    'All',
    'General Medicine',
    'Cardiology',
    'Pediatrics',
    'Dermatology',
    'Orthopedics',
    'Neurology',
  ];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesDept = selectedDept === 'All' || doc.department === selectedDept;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <section id="doctors" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Medical Faculty
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Meet Our Board-Certified Specialists
            </h2>
            <p className="text-slate-600 text-base max-w-2xl mt-2">
              Our multidisciplinary clinical staff brings world-class medical training,
              empathetic care, and decades of collective clinical excellence.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search doctor or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Department Filter Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDept === dept
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {dept === 'All' ? 'All Specialties' : dept}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm font-medium text-slate-600">Retrieving medical team from database...</p>
          </div>
        ) : error ? (
          <div className="my-12 p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-center max-w-lg mx-auto">
            <AlertCircle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
            <p className="font-semibold text-sm">{error}</p>
            <button
              onClick={loadDoctors}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="py-20 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 mt-8">
            <p className="text-slate-500 text-sm">No doctors match your search criteria.</p>
            <button
              onClick={() => {
                setSelectedDept('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-teal-600 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc) => (
              <div
                key={doc._id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-teal-300 transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Doctor Image Header */}
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img
                      src={doc.imageUrl}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                    {/* Department badge on top left */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-sm border border-slate-200">
                      {doc.department}
                    </span>

                    {/* Rating badge on top right */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-900/80 backdrop-blur-md text-white shadow-sm border border-slate-700">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{doc.rating}</span>
                      <span className="text-slate-400 text-[10px]">({doc.reviewCount})</span>
                    </div>

                    {/* Name & Specialization overlay at bottom of photo */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="text-lg font-bold drop-shadow-xs">{doc.name}</h3>
                      <p className="text-xs text-teal-300 font-medium line-clamp-1">
                        {doc.specialization}
                      </p>
                    </div>
                  </div>

                  {/* Doctor Details Body */}
                  <div className="p-6 space-y-4">
                    {/* Education / Credentials */}
                    <div className="flex items-start gap-2.5 text-xs text-slate-600">
                      <GraduationCap className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{doc.qualification}</span>
                    </div>

                    {/* Experience & Fee */}
                    <div className="flex items-center justify-between text-xs py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <Award className="w-4 h-4 text-teal-600" />
                        <span>Experience: {doc.experience}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 text-[11px]">Consultation: </span>
                        <span className="font-bold text-teal-700 text-sm">
                          {formatINR(doc.consultationFee)}
                        </span>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {doc.bio}
                    </p>

                    {/* Available Days */}
                    <div className="pt-2">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold mb-1.5">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        <span>Available Days:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {doc.availableDays.map((day) => (
                          <span
                            key={day}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-teal-50 text-teal-800 border border-teal-100"
                          >
                            {day.slice(0, 3)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action: Direct Book Link */}
                <div className="p-6 pt-0">
                  <Link
                    to={`/book?doctorId=${doc._id}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 shadow-sm hover:shadow-md transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book with {doc.name.split(' ')[0]} {doc.name.split(' ')[1]}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

