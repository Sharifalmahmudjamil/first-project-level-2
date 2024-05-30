import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const AcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  const result = await AcademicSemesterModel.create(payload);
  return result;
};

export const AcademicSemesterService = {
  AcademicSemesterIntoDb,
};
