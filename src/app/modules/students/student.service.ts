import { StudentModel } from '../student.model';
import { Student } from './student.interface';

const createStudentIntoDb = async (studentData: Student) => {
  // const result = await StudentModel.create(student); //built in static method

  const student = new StudentModel(studentData);
  const result = student.save(); //built in instance method
  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await StudentModel.find();
  return result;
};

const getAllSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentService = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getAllSingleStudentFromDb,
  deleteStudentFromDb,
};
