import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

// year , semesterCode, 4 digit student id
export const generatedStudentId = (payload: TAcademicSemester) => {
  const currentID = (0).toString();
  let incrementID = (Number(currentID) + 1).toString().padStart(4, '0');

  incrementID = `${payload.year}${payload.code}${incrementID}`;
  return incrementID;
};
