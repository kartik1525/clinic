import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Star,
  ShieldCheck,
  Users,
  Award,
  ArrowRight,
} from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/50 via-white to-slate-50 pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Decorative ambient background blur */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Accredited Multi-Specialty Family Clinic</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Exceptional Healthcare,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                Personalized
              </span>{' '}
              for You.
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Book consultations with top-rated board-certified specialists in
              under 60 seconds. Modern facilities, zero waiting queues, and
              compassionate care designed for your family’s wellbeing.
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </Link>

              <a
                href="#doctors"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm hover:border-slate-400 transition-all"
              >
                <span>View Our Doctors</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </a>
            </div>

            {/* Trust Highlights Checklist */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-600 border-t border-slate-200/80">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="font-medium">Same-Day Slots Available</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="font-medium">Board-Certified MDs</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="font-medium">No Wait Time Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Hero Card & Floating Stat Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image with rounded container & subtle shadow */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
                  alt="Modern ApexCare Clinic Consultation"
                  className="w-full h-[430px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

                {/* Bottom Overlay inside image */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">Dr. Sarah Jenkins & Team</p>
                    <p className="text-[11px] text-teal-700 font-medium">Head of Internal Medicine</p>
                  </div>
                  <div className="flex items-center gap-1 bg-teal-50 px-2 py-1 rounded-lg border border-teal-200">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-teal-900">4.9 / 5.0</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Instant Confirmation */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Instant Booking</p>
                  <p className="text-[11px] text-slate-500">Live slot confirmation</p>
                </div>
              </div>

              {/* Floating Badge 2: Patient Satisfaction */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">15,000+ Patients</p>
                  <p className="text-[11px] text-emerald-600 font-medium">Trusted family clinic</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clinic Quick Statistics Banner */}
        <div className="mt-16 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
            <p className="text-3xl font-extrabold text-teal-600">6+</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Medical Specialties
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
            <p className="text-3xl font-extrabold text-teal-600">15+ Yrs</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Clinical Experience
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
            <p className="text-3xl font-extrabold text-teal-600">99.4%</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Patient Satisfaction
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
            <p className="text-3xl font-extrabold text-teal-600">&lt; 10 min</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Average Wait Time
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

