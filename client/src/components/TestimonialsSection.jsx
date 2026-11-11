import React from 'react';
import { Star, Quote, CheckCircle2, ShieldAlert } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Eleanor Sterling',
    location: 'Metro City Resident',
    specialty: 'Internal Medicine (Dr. Sarah Jenkins)',
    rating: 5,
    text: '“Dr. Jenkins took forty minutes to examine my chronic fatigue and actually read my previous lab records. Her diagnosis was accurate and the treatment plan has completely restored my day-to-day energy. The online appointment booking was delightfully painless.”',
    date: 'Verified Demo Review',
  },
  {
    id: 2,
    name: 'David & Emily Ross',
    location: 'Parents of 4-year-old Lucas',
    specialty: 'Pediatrics (Dr. Priya Patel)',
    rating: 5,
    text: '“Finding a pediatrician who makes young children feel at ease is invaluable. Dr. Patel is immensely kind, reassuring, and thorough. Our son actually looked forward to his booster shot appointment because of how gentle the entire clinic staff is.”',
    date: 'Verified Demo Review',
  },
  {
    id: 3,
    name: 'Michael Chang',
    location: 'Amateur Marathoner',
    specialty: 'Orthopedics & Sports (Dr. Robert Chen)',
    rating: 5,
    text: '“I injured my knee three weeks before the marathon. Dr. Chen’s diagnostic precision, immediate imaging, and targeted rehabilitation regimen got me back on my feet safely without surgery. The punctuality of ApexCare is unlike any other clinic.”',
    date: 'Verified Demo Review',
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/60 px-3 py-1 rounded-full border border-teal-200">
            Patient Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Thousands of Healthy Families
          </h2>
          <p className="text-slate-600 text-sm">
            Read real feedback from patients who experienced our attentive care and punctuality.
          </p>
        </div>

        {/* Demo Disclaimer notice */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 py-1.5 px-4 rounded-full max-w-fit mx-auto">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
          <span>Fictional sample patient testimonials created for MVP demonstration purposes.</span>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-teal-200" />
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  {t.text}
                </p>
              </div>

              {/* Patient Info Footer */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs text-slate-500">{t.location}</p>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                    <CheckCircle2 className="w-3 h-3 text-teal-600" />
                    Verified
                  </span>
                </div>
                <p className="text-[11px] text-teal-600 font-medium mt-2">
                  {t.specialty}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

