import config from '../../config';
import { Student } from '../students/student.interface';
import { StudentModel } from '../students/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createStudentIntoDb = async (password: string, studentData: Student) => {
  // const result = await StudentModel.create(student); //built in static method

  //   create a user object
  const userData: Partial<TUser> = {};

  //   if password is not given ,use default password

  userData.password = password || (config.default_password as string);

  //   set student role

  userData.role = 'student';

  //  set manually generated id
  userData.id = '2030100001';

  // create a user
  const newUser = await UserModel.create(userData);
  // const student = new UserModel(user);
  // const result = student.save(); //built in instance method

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as a user
    studentData.id = newUser.id; //embed id
    studentData.user = newUser._id; //reference id

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDb,
};
