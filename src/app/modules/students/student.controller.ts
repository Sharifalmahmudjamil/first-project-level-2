import { Request, Response } from 'express';
import { StudentService } from './student.service';

// get all data

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDb();
    res.status(200).json({
      success: true,
      message: 'student data get successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

// get single data
const getSingleStudentData = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getAllSingleStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'Single student data get successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

// delete student data
const deleteStudentData = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.deleteStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: ' student data is delete successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudentData,
  deleteStudentData,
};
