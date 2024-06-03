import { StudentModel } from './student.model';

// const createStudentIntoDb = async (studentData: Student) => {
//   // const result = await StudentModel.create(student); //built in static method

//   const student = new StudentModel(studentData);
//   const result = student.save(); //built in instance method
//   return result;
// };

const getAllStudentsFromDb = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getAllSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentService = {
  getAllStudentsFromDb,
  getAllSingleStudentFromDb,
  deleteStudentFromDb,
};
