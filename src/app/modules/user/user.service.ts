import mongoose from 'mongoose';
import config from '../../config';

import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { Student } from '../students/student.interface';
import { StudentModel } from '../students/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generatedStudentId } from './user.utils';
import AppError from '../../erros/AppError';
import httpStatus from 'http-status';

const createStudentIntoDb = async (password: string, payload: Student) => {
  // const result = await StudentModel.create(student); //built in static method

  //   create a user object
  const userData: Partial<TUser> = {};

  //   if password is not given ,use default password

  userData.password = password || (config.default_password as string);

  //   set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  // transaction
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    if (admissionSemester !== null) {
      // Now typescript knows admission semester is not null
      userData.id = await generatedStudentId(admissionSemester);
    }

    // create a user(transaction - 1)
    const newUser = await UserModel.create([userData], { session }); // array for using transaction

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create user');
    }
    // set id, _id as a user
    payload.id = newUser[0].id; //embed id
    payload.user = newUser[0]._id; //reference id

    // create a student(transaction - 2)
    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create Student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create Student');
  }
};

export const UserServices = {
  createStudentIntoDb,
};
