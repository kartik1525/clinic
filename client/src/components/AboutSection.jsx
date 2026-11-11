import React from 'react';
import {
  HeartHandshake,
  Stethoscope,
  Microscope,
  CheckCircle,
  Building2,
  Clock4,
} from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image Mosaic */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                alt="ApexCare Medical Clinic Facilities"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase font-bold tracking-widest text-teal-300">
                  ApexCare Foundation
                </span>
                <h4 className="text-xl font-bold mt-1">
                  Compassion Meets Modern Clinical Precision
                </h4>
                <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                  Established with a commitment to unhurried, personalized family medicine and rapid specialist access.
                </p>
              </div>
            </div>

            {/* Overlapping Stat Pill */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-teal-700 text-white p-5 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs">
              <Building2 className="w-8 h-8 text-teal-200 shrink-0" />
              <div>
                <p className="text-sm font-bold">Comprehensive Care</p>
                <p className="text-xs text-teal-100">Diagnostic lab, imaging & consultation under one roof</p>
              </div>
            </div>
          </div>

          {/* Right Column: Mission and Core Values */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                About ApexCare Multispeciality Clinic • Lucknow
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                Dedicated to Raising the Standard of Outpatient Healthcare
              </h2>
            </div>

            <p className="text-slate-600 leading-relaxed text-base">
              At ApexCare, we believe healthcare is built on deep listening, genuine empathy, and evidence-based clinical rigor. Our clinic was founded to remove the friction of traditional medical appointments—eliminating long waiting times, rushed consultations, and fragmented care.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Unhurried Consultations</h3>
                <p className="text-xs text-slate-600 mt-1 leading-normal">
                  Our doctors dedicate adequate time to listen to your health history, symptoms, and questions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                  <Microscope className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Advanced Diagnostic Tech</h3>
                <p className="text-xs text-slate-600 mt-1 leading-normal">
                  Modern onsite diagnostics, ultrasound, and point-of-care lab work for fast, reliable answers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center mb-3">
                  <Clock4 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Punctual Scheduling</h3>
                <p className="text-xs text-slate-600 mt-1 leading-normal">
                  Guaranteed appointment times backed by our intelligent slot management system.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Collaborative Team</h3>
                <p className="text-xs text-slate-600 mt-1 leading-normal">
                  Cardiologists, pediatricians, and specialists collaborate seamlessly on your health roadmap.
                </p>
              </div>
            </div>

            {/* Quick Accreditation Notes */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-6 flex-wrap text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                NABH Accredited Clinical Facility
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                NABL Certified Diagnostic Laboratory
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                ABDM Compliant Digital Health Systems
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

