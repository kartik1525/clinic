import axios from 'axios';

// Create Axios instance with base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Doctor API methods
export const fetchDoctors = async (params = {}) => {
  const response = await API.get('/doctors', { params });
  return response.data;
};

export const fetchDoctorById = async (id) => {
  const response = await API.get(`/doctors/${id}`);
  return response.data;
};

// Appointment API methods
export const fetchAppointments = async (params = {}) => {
  const response = await API.get('/appointments', { params });
  return response.data;
};

export const fetchAppointmentById = async (id) => {
  const response = await API.get(`/appointments/${id}`);
  return response.data;
};

export const fetchBookedSlots = async (doctorId, date) => {
  const response = await API.get('/appointments/booked-slots', {
    params: { doctorId, date },
  });
  return response.data;
};

export const bookAppointment = async (appointmentData) => {
  const response = await API.post('/appointments', appointmentData);
  return response.data;
};

export const updateAppointmentStatus = async (id, status) => {
  const response = await API.patch(`/appointments/${id}/status`, { status });
  return response.data;
};

export const checkHealth = async () => {
  const response = await API.get('/health');
  return response.data;
};

export default API;

