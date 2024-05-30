import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

// router.get('/', StudentController.getAllStudents);

// router.get('/:studentId', StudentController.getSingleStudentData);

// router.delete('/:studentId', StudentController.deleteStudentData);

export const AcademicSemesterRoute = router;
