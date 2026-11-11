import express from 'express';
import {
  getAppointments,
  getAppointmentById,
  getBookedSlots,
  createAppointment,
  updateAppointmentStatus,
} from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/', getAppointments);
router.get('/booked-slots', getBookedSlots);
router.get('/:id', getAppointmentById);
router.post('/', createAppointment);
router.patch('/:id/status', updateAppointmentStatus);

export default router;

