import { RequestHandler } from 'express';
import { StudentService } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// get all data
const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentsFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student data get successfully',
    data: result,
  });
});

// get single data
const getSingleStudentData: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.getAllSingleStudentFromDb(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single student data get successfully',
    data: result,
  });
});

// update  student data
const updateStudentData: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentService.updateStudentIntoDb(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' student data is update successfully',
    data: result,
  });
});

// delete student data
const deleteStudentData: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.deleteStudentFromDb(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' student data is delete successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudentData,
  deleteStudentData,
  updateStudentData,
};
