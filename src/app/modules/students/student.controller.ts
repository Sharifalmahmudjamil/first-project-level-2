import { NextFunction, Request, Response } from 'express';
import { StudentService } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// get all data

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentService.getAllStudentsFromDb();

    sendResponse(res, {
      statusCode: httpStatus.OK,
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
    sendResponse(res, {
      statusCode: httpStatus.OK,
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

    sendResponse(res, {
      statusCode: httpStatus.OK,
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
