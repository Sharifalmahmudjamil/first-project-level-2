import { Request, Response } from 'express';
import { UserServices } from './user.service';

// create data
const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: StudentData } = req.body;

    // data validation using zod
    //   const zodParseData = studentValidationSchema.parse(StudentData);

    //   will call service func to send this data
    const result = await UserServices.createStudentIntoDb(
      password,
      StudentData,
    );

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
export const UserControllers = {
  createStudent,
};
