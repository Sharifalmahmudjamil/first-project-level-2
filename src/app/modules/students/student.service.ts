import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../erros/AppError';
import { UserModel } from '../user/user.model';
import httpStatus from 'http-status';
import { Student } from './student.interface';

// const createStudentIntoDb = async (studentData: Student) => {
//   // const result = await StudentModel.create(student); //built in static method

//   const student = new StudentModel(studentData);
//   const result = student.save(); //built in instance method
//   return result;
// };

const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
  const queryObj = { ...query }; // copying req.query object so that we can mutate the copy object

  const studentSearchableField = ['email', 'name.firstName', 'presentAddress'];

  let searchTerm = ''; // SET DEFAULT VALUE

  // IF searchTerm  IS GIVEN SET IT
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const SearchQuery = StudentModel.find({
    $or: studentSearchableField.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // filtering
  const excludeFields = ['searchTerm', 'sort', 'limit'];
  excludeFields.forEach((el) => delete queryObj[el]); // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY

  const filterQuery = SearchQuery.find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  // SORTING FUNCTIONALITY:

  let sort = '-createdAt'; // SET DEFAULT VALUE

  // IF sort  IS GIVEN SET IT

  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let limit = 1; // SET DEFAULT VALUE FOR LIMIT
  // IF limit IS GIVEN SET IT

  if (query.limit) {
    limit = Number(query.limit);
  }
  const limitQuery = await sortQuery.limit(limit);
  return limitQuery;
};

const getAllSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// update student
const updateStudentIntoDb = async (id: string, payload: Partial<Student>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    { new: true, runValidators: true },
  );

  return result;
};

const deleteStudentFromDb = async (id: string) => {
  // using transaction
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to deleted student');
    }

    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to deleted user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to deleted Student');
  }
};

export const StudentService = {
  getAllStudentsFromDb,
  getAllSingleStudentFromDb,
  deleteStudentFromDb,
  updateStudentIntoDb,
};
