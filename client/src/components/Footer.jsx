import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldAlert,
  Heart,
  ArrowUpRight,
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Clinic Brand & Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-teal-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
                <Activity className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Apex<span className="text-teal-400">Care</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-teal-900/60 text-teal-300 border border-teal-700">
                Multispeciality
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              ApexCare Multispeciality Clinic provides accessible, compassionate, and comprehensive outpatient healthcare for families in Gomti Nagar, Lucknow. Experienced specialists committed to clinical excellence.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-teal-400">
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                Official Clinic Demonstration Platform
              </span>
            </div>
          </div>

          {/* Col 2: Medical Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Medical Specialties
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="/#services" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>General & Family Medicine</span>
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Cardiology & Heart Wellness</span>
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Pediatrics & Adolescent Care</span>
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Dermatology & Skin Health</span>
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Orthopedics & Sports Medicine</span>
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Neurology & Headache Clinic</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Operating Hours */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Clinic Working Hours
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>Monday – Friday:</span>
                <span className="text-white font-medium">8:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>Saturday:</span>
                <span className="text-white font-medium">8:30 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>Sunday:</span>
                <span className="text-teal-400 font-medium">9:00 AM – 2:00 PM</span>
              </div>
              <div className="pt-2 text-xs text-slate-500">
                <p>24/7 Phone Consultation triage available for registered members.</p>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-1" />
                <span>Plot 14, Vibhuti Khand, Gomti Nagar, Lucknow, UP 226010</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>+91 98765 43210 / +91 91234 56780</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>contact@apexcare.example.com</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/book"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-sm transition-colors shadow-sm"
              >
                <span>Schedule Online Visit</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Disclaimer & Copyright Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <p>
              <strong className="text-slate-400">MVP Demonstration Disclaimer:</strong> This application is a functional prototype built for demonstration. All doctors, patient reviews, and clinic specifics are fictional demo representations.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link to="/admin" className="text-slate-400 hover:text-teal-400">
              Admin Portal (Demo)
            </Link>
            <span>•</span>
            <span>&copy; {new Date().getFullYear()} ApexCare Clinic MVP.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

