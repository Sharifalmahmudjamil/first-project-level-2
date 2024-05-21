import { Request, Response } from 'express';
import { StudentService } from './student.service';
import studentValidationSchema from './student.validation';

// create data
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: StudentData } = req.body;

    // validation joi
    // const { error, value } = studentValidationSchema.validate(StudentData);
    // console.log({ error }, { value });

    // data validation using zod
    const zodParseData = studentValidationSchema.parse(StudentData);

    //   will call service func to send this data
    const result = await StudentService.createStudentIntoDb(zodParseData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'something went wrong',
    //     error: error.details,
    //   });
    // }

    // send response

    res.status(200).json({
      success: true,
      message: 'student is create successfully',
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
  createStudent,
  getAllStudents,
  getSingleStudentData,
  deleteStudentData,
};
