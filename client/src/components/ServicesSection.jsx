import React from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Heart,
  Baby,
  Sparkles,
  ActivitySquare,
  Brain,
  ArrowRight,
  Check,
} from 'lucide-react';

const services = [
  {
    id: 'primary-care',
    title: 'Internal Medicine & Primary Care',
    department: 'General Medicine',
    icon: Stethoscope,
    description:
      'Holistic adult healthcare focusing on preventive wellness, chronic disease management, and prompt illness care.',
    treatments: ['Annual Health Physicals', 'Hypertension & Diabetes Care', 'Preventative Screenings', 'Blood Work & Lab Panels'],
    badge: 'Popular',
  },
  {
    id: 'cardiology',
    title: 'Cardiology & Heart Health',
    department: 'Cardiology',
    icon: Heart,
    description:
      'Advanced cardiovascular diagnosis, heart disease prevention, blood pressure control, and specialized arterial assessments.',
    treatments: ['Resting & Stress ECG', 'Lipid & Cholesterol Optimization', 'Cardiac Risk Stratification', 'Hypertension Therapy'],
    badge: 'Specialized',
  },
  {
    id: 'pediatrics',
    title: 'Pediatrics & Adolescent Care',
    department: 'Pediatrics',
    icon: Baby,
    description:
      'Gentle, child-centered care from newborn milestones through teenage years in a warm, welcoming environment.',
    treatments: ['Well-Child Checkups', 'CDC Routine Vaccinations', 'Developmental Assessments', 'Asthma & Allergy Management'],
    badge: 'Family',
  },
  {
    id: 'dermatology',
    title: 'Dermatology & Skin Health',
    department: 'Dermatology',
    icon: Sparkles,
    description:
      'Expert diagnosis and modern therapies for acute and chronic skin conditions, hair disorders, and preventative screenings.',
    treatments: ['Full Body Mole & Skin Checks', 'Acne & Rosacea Programs', 'Eczema & Psoriasis Care', 'Skin Allergy Testing'],
    badge: 'Clinical',
  },
  {
    id: 'orthopedics',
    title: 'Orthopedics & Sports Medicine',
    department: 'Orthopedics',
    icon: ActivitySquare,
    description:
      'Comprehensive care for joint pain, athletic injuries, ligament strains, and functional mobility rehabilitation.',
    treatments: ['Joint Pain Diagnostics', 'Sports Injury Rehabilitation', 'Tendonitis & Sprain Care', 'Mobility Optimization'],
    badge: 'Active Care',
  },
  {
    id: 'neurology',
    title: 'Neurology & Headache Clinic',
    department: 'Neurology',
    icon: Brain,
    description:
      'Compassionate clinical investigation and evidence-based relief for chronic headaches, migraines, and nerve conditions.',
    treatments: ['Migraine Treatment Plans', 'Peripheral Neuropathy', 'Dizziness & Balance Evaluations', 'Sleep Health Reviews'],
    badge: 'Specialized',
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/60 px-3 py-1 rounded-full border border-teal-200">
            Medical Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Specialties for Every Stage of Life
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            From routine preventive checkups to focused specialty diagnostics, our
            clinical teams coordinate closely to provide holistic, continuous medical care.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-teal-600 text-teal-700 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Treatments list */}
                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Key Capabilities:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {service.treatments.map((treatment, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    to={`/book`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 group-hover:text-teal-700 group-hover:translate-x-1 transition-all"
                  >
                    <span>Schedule this specialty</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-teal-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold">Unsure which specialist you need?</h4>
            <p className="text-sm text-teal-200 mt-0.5">
              Book a consultation with our Primary Care team for an initial assessment and same-day referral.
            </p>
          </div>
          <Link
            to="/book"
            className="shrink-0 px-6 py-2.5 rounded-xl bg-white text-teal-900 font-bold text-sm hover:bg-teal-50 transition-colors shadow-sm"
          >
            Book General Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};

