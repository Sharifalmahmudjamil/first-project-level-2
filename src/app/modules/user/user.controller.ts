import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// create data
const createStudent = catchAsync(async (req, res, next) => {
  try {
    const { password, student: StudentData } = req.body;

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
});
export const UserControllers = {
  createStudent,
};
