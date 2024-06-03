import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

// will call controller function

router.get('/', StudentController.getAllStudents);

router.get('/:studentId', StudentController.getSingleStudentData);
router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  StudentController.updateStudentData,
);

router.delete('/:studentId', StudentController.deleteStudentData);

export const StudentRoutes = router;
