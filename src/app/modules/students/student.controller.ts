import { Request, Response } from 'express';
import { StudentService } from './student.service';

// create data
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: StudentData } = req.body;

    //   will call service func to send this data
    const result = await StudentService.createStudentIntoDb(StudentData);
    // send response

    res.status(200).json({
      success: true,
      message: 'student is create successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

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
    console.log(err);
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
    console.log(err);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudentData,
};
