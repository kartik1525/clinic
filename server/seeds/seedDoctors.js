import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Doctor } from '../models/Doctor.js';
import { Appointment } from '../models/Appointment.js';

dotenv.config();

const doctorsData = [
  {
    name: 'Dr. Arjun Gupta',
    specialization: 'General Physician & Internal Medicine',
    department: 'General Medicine',
    qualification: 'MBBS, MD (General Medicine - KGMU Lucknow)',
    experience: '14+ years',
    bio: 'Experienced in adult healthcare, diabetes and hypertension management, seasonal viral infections, and preventive wellness screenings with an empathetic, patient-first approach.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
    consultationFee: 500,
    rating: 4.9,
    reviewCount: 148,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
  {
    name: 'Dr. Ananya Sharma',
    specialization: 'Senior Cardiologist & Heart Care Specialist',
    department: 'Cardiology',
    qualification: 'MBBS, MD, DM (Cardiology - AIIMS New Delhi)',
    experience: '16+ years',
    bio: 'Renowned cardiologist specializing in preventative cardiology, hypertension control, non-invasive cardiac imaging (2D Echo/TMT), and post-angioplasty wellness.',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: [
      '09:00 AM',
      '10:00 AM',
      '11:00 AM',
      '02:00 PM',
      '03:00 PM',
      '04:00 PM',
    ],
    consultationFee: 1200,
    rating: 4.95,
    reviewCount: 192,
    imageUrl: 'https://images.unsplash.com/photo-1594824813689-53f7f897f1f2?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
  {
    name: 'Dr. Neha Srivastava',
    specialization: 'Consultant Pediatrician & Child Health Specialist',
    department: 'Pediatrics',
    qualification: 'MBBS, MD (Pediatrics - IMS, BHU Varanasi)',
    experience: '11+ years',
    bio: 'Dedicated to cheerful, attentive care for infants, children, and adolescents, specializing in the National/IAP immunization schedule, developmental milestones, and childhood respiratory care.',
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
    consultationFee: 600,
    rating: 4.9,
    reviewCount: 184,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
  {
    name: 'Dr. Priya Mishra',
    specialization: 'Dermatologist & Cosmetologist',
    department: 'Dermatology',
    qualification: 'MBBS, MD (Dermatology - King George’s Medical University)',
    experience: '12+ years',
    bio: 'Specialist in clinical dermatology, acne and pigmentation therapies, eczema, hair and scalp wellness, and preventive skin allergy evaluations.',
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
    consultationFee: 800,
    rating: 4.88,
    reviewCount: 116,
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
  {
    name: 'Dr. Rohan Verma',
    specialization: 'Orthopedic Surgeon & Joint Care Specialist',
    department: 'Orthopedics',
    qualification: 'MBBS, MS (Orthopedics - SGPGI Lucknow)',
    experience: '15+ years',
    bio: 'Leading specialist in joint preservation, arthritis care, sports injuries, knee and shoulder pain, spinal ergonomics, and non-surgical mobility restoration.',
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
    consultationFee: 1000,
    rating: 4.92,
    reviewCount: 189,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
  {
    name: 'Dr. Aditya Singh',
    specialization: 'Consultant Neurologist & Headache Specialist',
    department: 'Neurology',
    qualification: 'MBBS, MD, DM (Neurology - Sanjay Gandhi PGIMS)',
    experience: '13+ years',
    bio: 'Specialist in chronic migraines and headaches, neuropathy, vertigo, seizure disorders, and sleep health assessments with evidence-based clinical counseling.',
    availableDays: ['Tuesday', 'Wednesday', 'Friday'],
    timeSlots: [
      '10:00 AM',
      '11:00 AM',
      '02:00 PM',
      '03:00 PM',
      '04:00 PM',
    ],
    consultationFee: 1500,
    rating: 4.96,
    reviewCount: 126,
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
];

const seedDatabase = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/clinic_db';
    console.log(`[Seed] Connecting to MongoDB: ${connUri}`);
    await mongoose.connect(connUri);

    console.log('[Seed] Updating Doctors collection with Indian medical specialists...');
    await Doctor.deleteMany({});
    const createdDoctors = await Doctor.insertMany(doctorsData);
    console.log(`[Seed] Successfully inserted ${createdDoctors.length} Indian doctors.`);

    console.log('[Seed] Refreshing demo appointments with realistic Indian patient records...');
    await Appointment.deleteMany({});

    // Generate dates offset from today (in IST YYYY-MM-DD)
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
        patientName: 'Rahul Sharma',
        phone: '+91 98765 43210',
        email: 'rahul.sharma@example.com',
        doctorId: createdDoctors[0]._id, // Dr. Arjun Gupta
        appointmentDate: date1,
        appointmentTime: '09:00 AM',
        reason: 'Annual preventive physical and routine fasting blood sugar review',
        status: 'Confirmed',
      },
      {
        patientName: 'Priya Verma',
        phone: '+91 91234 56780',
        email: 'priya.verma@example.com',
        doctorId: createdDoctors[1]._id, // Dr. Ananya Sharma
        appointmentDate: date1,
        appointmentTime: '10:00 AM',
        reason: 'Cardiology follow-up and blood pressure monitoring',
        status: 'Confirmed',
      },
      {
        patientName: 'Ananya Singh',
        phone: '+91 87654 32109',
        email: 'ananya.singh@example.com',
        doctorId: createdDoctors[2]._id, // Dr. Neha Srivastava
        appointmentDate: date2,
        appointmentTime: '10:00 AM',
        reason: 'Childhood vaccination booster and pediatric growth assessment',
        status: 'Pending',
      },
      {
        patientName: 'Arjun Gupta',
        phone: '+91 94500 12345',
        email: 'arjun.gupta@example.com',
        doctorId: createdDoctors[3]._id, // Dr. Priya Mishra
        appointmentDate: date2,
        appointmentTime: '11:00 AM',
        reason: 'Persistent skin allergy, dust rash, and prescription review',
        status: 'Confirmed',
      },
      {
        patientName: 'Sneha Mishra',
        phone: '+91 93350 98765',
        email: 'sneha.mishra@example.com',
        doctorId: createdDoctors[4]._id, // Dr. Rohan Verma
        appointmentDate: date3,
        appointmentTime: '02:30 PM',
        reason: 'Knee joint stiffness and discomfort after morning walks',
        status: 'Pending',
      },
      {
        patientName: 'Rohan Agarwal',
        phone: '+91 98111 23456',
        email: 'rohan.agarwal@example.com',
        doctorId: createdDoctors[5]._id, // Dr. Aditya Singh
        appointmentDate: date3,
        appointmentTime: '03:00 PM',
        reason: 'Chronic migraine management and tension headache review',
        status: 'Confirmed',
      },
      {
        patientName: 'Neha Srivastava',
        phone: '+91 99360 87654',
        email: 'neha.s@example.com',
        doctorId: createdDoctors[0]._id, // Dr. Arjun Gupta
        appointmentDate: date1,
        appointmentTime: '02:00 PM',
        reason: 'Scheduled routine checkup (rescheduled by patient)',
        status: 'Cancelled',
      },
      {
        patientName: 'Aman Saxena',
        phone: '+91 94150 11223',
        email: 'aman.saxena@example.com',
        doctorId: createdDoctors[4]._id, // Dr. Rohan Verma
        appointmentDate: date2,
        appointmentTime: '01:30 PM',
        reason: 'Follow-up consultation for shoulder muscle strain and physiotherapy check',
        status: 'Completed',
      },
    ];

    await Appointment.insertMany(sampleAppointments);
    console.log(`[Seed] Seeded ${sampleAppointments.length} realistic Indian demo appointments.`);

    console.log('[Seed] Database seeding completed successfully with Indian healthcare data!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
