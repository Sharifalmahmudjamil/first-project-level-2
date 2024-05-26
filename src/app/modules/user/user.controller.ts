import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// create data
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: StudentData } = req.body;

    // data validation using zod
    //   const zodParseData = studentValidationSchema.parse(StudentData);

    //   will call service func to send this data
    const result = await UserServices.createStudentIntoDb(
      password,
      StudentData,
    );

    // send response

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student is create successfully',
      data: result,
    });
    // res.status(200).json({
    //   success: true,
    //   message: 'student is create successfully',
    //   data: result,
    // });
  } catch (err) {
    next(err);
  }
};
export const UserControllers = {
  createStudent,
};
