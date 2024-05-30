import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';

// create data
const createAcademicSemester = catchAsync(async (req, res, next) => {
  try {
    //   will call service func to send this data
    const result = await AcademicSemesterService.AcademicSemesterIntoDb(
      req.body,
    );

    // send response

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is  create successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
export const AcademicSemesterControllers = {
  createAcademicSemester,
};
