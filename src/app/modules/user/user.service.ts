import config from '../../config';

import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { Student } from '../students/student.interface';
import { StudentModel } from '../students/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generatedStudentId } from './user.utils';

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

  //set  generated id
  if (admissionSemester !== null) {
    // Now typescript knows admission semester is not null
    userData.id = await generatedStudentId(admissionSemester);
  }

  // create a user
  const newUser = await UserModel.create(userData);
  // const student = new UserModel(user);
  // const result = student.save(); //built in instance method

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as a user
    payload.id = newUser.id; //embed id
    payload.user = newUser._id; //reference id

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDb,
};
