import React from 'react';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { DoctorsSection } from '../components/DoctorsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ContactTimingsSection } from '../components/ContactTimingsSection';

export const HomePage = () => {
  return (
    <div className="space-y-0">
      <Hero />
      <ServicesSection />
      <DoctorsSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactTimingsSection />
    </div>
  );
};

