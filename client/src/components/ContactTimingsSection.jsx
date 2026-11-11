import React from 'react';
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  AlertTriangle,
  Compass,
  Car,
  Building,
} from 'lucide-react';

export const ContactTimingsSection = () => {
  return (
    <section id="timings" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Hours & Timings */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                Clinic Timings & Access
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Opening Hours & Walk-In Availability
              </h2>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                We accommodate scheduled appointments and urgent outpatient visits
                six days a week with convenient morning and evening slots.
              </p>
            </div>

            {/* Timings Table Card */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200 text-slate-800 font-bold text-sm">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Weekly Operational Schedule</span>
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-200/60">
                  <span className="font-semibold text-slate-800">Monday – Thursday</span>
                  <span className="font-medium text-slate-700">8:00 AM – 8:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-200/60">
                  <span className="font-semibold text-slate-800">Friday</span>
                  <span className="font-medium text-slate-700">8:00 AM – 7:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-200/60">
                  <span className="font-semibold text-slate-800">Saturday</span>
                  <span className="font-medium text-slate-700">8:30 AM – 6:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-1.5 text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-800">Sunday</span>
                    <span className="text-xs text-amber-700 block">Triage & Urgent Care only</span>
                  </div>
                  <span className="font-medium text-teal-700">9:00 AM – 2:00 PM</span>
                </div>
              </div>
            </div>

            {/* Emergency Hotline Notice */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold">Medical Emergency Notice:</p>
                <p className="text-amber-800 leading-relaxed">
                  For life-threatening emergencies, severe chest pain, or acute respiratory distress, please call <strong>911</strong> or visit the nearest hospital emergency department immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Details & Location Card */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                Clinic Location
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Convenient, Accessible Facilities
              </h2>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Centrally located in Metro City Medical District with dedicated
                patient parking and full wheelchair accessibility.
              </p>
            </div>

            {/* Location & Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Physical Address
                </h4>
                <p className="text-sm font-semibold text-slate-900 leading-snug">
                  742 Evergreen Medical Blvd, Suite 300, Metro City, MC 94016
                </p>
                <p className="text-xs text-slate-500">Building 4, 3rd Floor East Wing</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Telephone Contact
                </h4>
                <p className="text-sm font-semibold text-slate-900">
                  (555) 234-CARE (2273)
                </p>
                <p className="text-xs text-slate-500">Direct booking & prescription line</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Email Support
                </h4>
                <p className="text-sm font-semibold text-slate-900">
                  care@apexcareclinic.com
                </p>
                <p className="text-xs text-slate-500">Inquiries answered within 2 hours</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Parking & Transit
                </h4>
                <p className="text-sm font-semibold text-slate-900">
                  Free 2-Hour Validated Parking
                </p>
                <p className="text-xs text-slate-500">Metro Station directly opposite (Exit 2)</p>
              </div>
            </div>

            {/* Directions Card */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3">
                <Compass className="w-6 h-6 text-teal-400 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Visiting us for the first time?</p>
                  <p className="text-xs text-slate-400">
                    Get turn-by-turn driving directions or public transit arrival guides.
                  </p>
                </div>
              </div>
              <a
                href="#timings"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Demo Navigation: ApexCare Clinic is located at 742 Evergreen Medical Blvd, Suite 300, Metro City.');
                }}
                className="shrink-0 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors"
              >
                Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

