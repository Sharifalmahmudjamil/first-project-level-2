import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// will call controller function

router.get('/', StudentController.getAllStudents);

router.get('/:studentId', StudentController.getSingleStudentData);

router.delete('/:studentId', StudentController.deleteStudentData);

export const StudentRoutes = router;
