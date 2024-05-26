import { NextFunction, Request, Response } from 'express';
import { StudentService } from './student.service';

// get all data

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentService.getAllStudentsFromDb();
    res.status(200).json({
      success: true,
      message: 'student data get successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get single data
const getSingleStudentData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getAllSingleStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'Single student data get successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// delete student data
const deleteStudentData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.deleteStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: ' student data is delete successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudentData,
  deleteStudentData,
};
