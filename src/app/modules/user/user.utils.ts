import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { UserModel } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

// year , semesterCode, 4 digit student id
export const generatedStudentId = async (payload: TAcademicSemester) => {
  const currentID = (await findLastStudentId()) || (0).toString();
  let incrementID = (Number(currentID) + 1).toString().padStart(4, '0');

  incrementID = `${payload.year}${payload.code}${incrementID}`;
  return incrementID;
};
