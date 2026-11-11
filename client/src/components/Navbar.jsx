import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Activity,
  Phone,
  Clock,
  MapPin,
  Calendar,
  Menu,
  X,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isLinkActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      {/* Top Notification / Contact Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1.5 text-teal-400 font-medium">
              <Phone className="w-3.5 h-3.5" />
              <span>Helpline: (555) 234-CARE (2273)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-400 hidden md:inline-flex">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>Mon – Sat: 8:00 AM – 8:00 PM | Sun: 9:00 AM – 2:00 PM</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-400 hidden lg:inline-flex">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>742 Evergreen Medical Blvd, Suite 300</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-teal-950 text-teal-300 border border-teal-800/80">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
              Accepting New Patients
            </span>
            <Link
              to="/admin"
              className="text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1 underline underline-offset-2"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Demo Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 text-white flex items-center justify-center shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                  Apex<span className="text-teal-600">Care</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                  Clinic
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium tracking-wide">
                Family & Specialty Medicine
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors ${
                isLinkActive('/')
                  ? 'text-teal-600'
                  : 'text-slate-600 hover:text-teal-600'
              }`}
            >
              Home
            </Link>
            <a
              href="/#services"
              className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors"
            >
              Medical Services
            </a>
            <a
              href="/#doctors"
              className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors"
            >
              Our Doctors
            </a>
            <a
              href="/#about"
              className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors"
            >
              About Clinic
            </a>
            <a
              href="/#timings"
              className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors"
            >
              Hours & Contact
            </a>
          </nav>

          {/* Actions: Demo Admin + Book Appointment CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all"
              title="Demonstration Admin Interface"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Admin Portal</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-bold">
                Demo
              </span>
            </Link>

            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 shadow-md shadow-teal-600/25 hover:shadow-lg hover:shadow-teal-600/35 transition-all transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-teal-50 hover:text-teal-700"
            >
              Home
            </Link>
            <a
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-teal-50 hover:text-teal-700"
            >
              Medical Services
            </a>
            <a
              href="/#doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-teal-50 hover:text-teal-700"
            >
              Our Doctors
            </a>
            <a
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-teal-50 hover:text-teal-700"
            >
              About Clinic
            </a>
            <a
              href="/#timings"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-teal-50 hover:text-teal-700"
            >
              Hours & Contact
            </a>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <Link
              to="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-base font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-md"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200"
            >
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Demo Admin Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

