import express from 'express';
import { UserControllers } from './user.controller';

import { createStudentValidationSchema } from '../students/student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// will call controller function
router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
