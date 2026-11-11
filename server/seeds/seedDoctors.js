import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Doctor } from '../models/Doctor.js';
import { Appointment } from '../models/Appointment.js';

dotenv.config();

const doctorsData = [
  {
    name: 'Dr. Sarah Jenkins',
    specialization: 'Internal Medicine & Primary Care',
    department: 'General Medicine',
    qualification: 'MD, FACP (Johns Hopkins University School of Medicine)',
    experience: '14+ years',
    bio: 'Dr. Jenkins provides comprehensive adult healthcare, preventative wellness screenings, and evidence-based chronic disease management with a gentle, patient-first approach.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: [
      '09:00 AM',
      '09:30 AM',
      '10:00 AM',
      '10:30 AM',
      '11:00 AM',
      '11:30 AM',
      '02:00 PM',
      '02:30 PM',
      '03:00 PM',
      '03:30 PM',
      '04:00 PM',
      '04:30 PM',
    ],
    consultationFee: 75,
    rating: 4.9,
    reviewCount: 142,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
  {
    name: 'Dr. Marcus Vance',
    specialization: 'Cardiologist & Vascular Health',
    department: 'Cardiology',
    qualification: 'MD, FACC (Stanford University School of Medicine)',
    experience: '16+ years',
    bio: 'Specialist in non-invasive cardiac imaging, hypertension management, preventive cardiology, and lipid disorders with leading clinical research accolades.',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: [
      '09:00 AM',
      '10:00 AM',
      '11:00 AM',
      '02:00 PM',
      '03:00 PM',
      '04:00 PM',
    ],
    consultationFee: 120,
    rating: 4.95,
    reviewCount: 98,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
  {
    name: 'Dr. Priya Patel',
    specialization: 'Pediatrician & Adolescent Health',
    department: 'Pediatrics',
    qualification: 'MD, FAAP (Columbia University Irving Medical Center)',
    experience: '11+ years',
    bio: 'Dedicated to cheerful, attentive care for infants, children, and teenagers, specializing in developmental milestones, vaccinations, and childhood respiratory wellness.',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    timeSlots: [
      '09:00 AM',
      '09:30 AM',
      '10:00 AM',
      '10:30 AM',
      '11:30 AM',
      '02:00 PM',
      '02:30 PM',
      '03:30 PM',
    ],
    consultationFee: 70,
    rating: 4.9,
    reviewCount: 184,
    imageUrl: 'https://images.unsplash.com/photo-1594824813689-53f7f897f1f2?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
  {
    name: 'Dr. James Rodriguez',
    specialization: 'Dermatologist & Skin Health Specialist',
    department: 'Dermatology',
    qualification: 'MD, FAAD (UCSF School of Medicine)',
    experience: '12+ years',
    bio: 'Board-certified dermatologist focusing on medical dermatology, acne treatments, eczema, full-body skin cancer screenings, and safe aesthetic therapies.',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    timeSlots: [
      '09:30 AM',
      '10:00 AM',
      '11:00 AM',
      '11:30 AM',
      '02:00 PM',
      '03:00 PM',
      '04:00 PM',
    ],
    consultationFee: 85,
    rating: 4.88,
    reviewCount: 116,
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
  {
    name: 'Dr. Robert Chen',
    specialization: 'Orthopedic Surgeon & Sports Medicine',
    department: 'Orthopedics',
    qualification: 'MD, FAAOS (University of Pennsylvania Perelman School of Medicine)',
    experience: '15+ years',
    bio: 'Expert in sports injuries, joint preservation, knee and shoulder conditions, rehabilitation plans, and minimally invasive musculoskeletal treatments.',
    availableDays: ['Monday', 'Wednesday', 'Thursday'],
    timeSlots: [
      '09:00 AM',
      '10:00 AM',
      '11:00 AM',
      '01:30 PM',
      '02:30 PM',
      '03:30 PM',
      '04:30 PM',
    ],
    consultationFee: 110,
    rating: 4.92,
    reviewCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
  {
    name: 'Dr. Emily Thornton',
    specialization: 'Neurology & Headache Specialist',
    department: 'Neurology',
    qualification: 'MD, FAAN (Yale School of Medicine)',
    experience: '13+ years',
    bio: 'Specializing in migraines and complex headaches, neuropathy, sleep disorders, and cognitive assessments, combining clinical precision with compassionate counseling.',
    availableDays: ['Tuesday', 'Wednesday', 'Friday'],
    timeSlots: [
      '10:00 AM',
      '11:00 AM',
      '02:00 PM',
      '03:00 PM',
      '04:00 PM',
    ],
    consultationFee: 115,
    rating: 4.96,
    reviewCount: 76,
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
];

const seedDatabase = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/clinic_db';
    console.log(`[Seed] Connecting to MongoDB: ${connUri}`);
    await mongoose.connect(connUri);

    console.log('[Seed] Clearing existing Doctors collection...');
    await Doctor.deleteMany({});

    console.log('[Seed] Inserting realistic fictional doctors...');
    const createdDoctors = await Doctor.insertMany(doctorsData);
    console.log(`[Seed] Successfully inserted ${createdDoctors.length} doctors.`);

    // Check if we should seed sample demonstration appointments
    const existingAppointments = await Appointment.countDocuments();
    if (existingAppointments === 0) {
      console.log('[Seed] Seeding realistic sample demo appointments...');

      // Get dates: today, tomorrow, day after tomorrow in YYYY-MM-DD format
      const today = new Date();
      const formatOffsetDate = (offsetDays) => {
        const d = new Date(today);
        d.setDate(d.getDate() + offsetDays);
        return d.toISOString().split('T')[0];
      };

      const date1 = formatOffsetDate(1);
      const date2 = formatOffsetDate(2);
      const date3 = formatOffsetDate(3);

      const sampleAppointments = [
        {
          patientName: 'Liam Henderson',
          phone: '+1 (555) 234-5678',
          email: 'liam.henderson@example.com',
          doctorId: createdDoctors[0]._id, // Dr. Sarah Jenkins
          appointmentDate: date1,
          appointmentTime: '09:00 AM',
          reason: 'Annual preventive physical and routine blood work review',
          status: 'Confirmed',
        },
        {
          patientName: 'Clara Montgomery',
          phone: '+1 (555) 876-5432',
          email: 'clara.m@example.com',
          doctorId: createdDoctors[1]._id, // Dr. Marcus Vance
          appointmentDate: date1,
          appointmentTime: '10:00 AM',
          reason: 'Cardiology follow-up and blood pressure monitoring',
          status: 'Confirmed',
        },
        {
          patientName: 'Maya Lin',
          phone: '+1 (555) 345-6789',
          email: 'maya.lin@example.com',
          doctorId: createdDoctors[2]._id, // Dr. Priya Patel
          appointmentDate: date2,
          appointmentTime: '10:00 AM',
          reason: 'Childhood wellness checkup and vaccination booster',
          status: 'Pending',
        },
        {
          patientName: 'David Miller',
          phone: '+1 (555) 456-7890',
          email: 'david.m@example.com',
          doctorId: createdDoctors[3]._id, // Dr. James Rodriguez
          appointmentDate: date2,
          appointmentTime: '11:00 AM',
          reason: 'Persistent skin rash consultation and prescription review',
          status: 'Confirmed',
        },
        {
          patientName: 'Sophia Ramirez',
          phone: '+1 (555) 567-8901',
          email: 'sophia.r@example.com',
          doctorId: createdDoctors[4]._id, // Dr. Robert Chen
          appointmentDate: date3,
          appointmentTime: '02:30 PM',
          reason: 'Runner knee discomfort assessment and mobility check',
          status: 'Pending',
        },
        {
          patientName: 'Arthur Pendelton',
          phone: '+1 (555) 678-9012',
          email: 'arthur.p@example.com',
          doctorId: createdDoctors[0]._id, // Dr. Sarah Jenkins
          appointmentDate: date1,
          appointmentTime: '02:00 PM',
          reason: 'Scheduled routine checkup (rescheduled by patient)',
          status: 'Cancelled',
        },
      ];

      await Appointment.insertMany(sampleAppointments);
      console.log(`[Seed] Seeded ${sampleAppointments.length} sample demo appointments.`);
    }

    console.log('[Seed] Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

