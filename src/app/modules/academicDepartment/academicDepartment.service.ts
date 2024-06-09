// import AppError from '../../erros/AppError';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

// create into db
const createDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  // const isDepartmentExists = await AcademicDepartmentModel.findOne({
  //   name: payload.name,
  // });

  // if (isDepartmentExists) {
  //   throw new AppError(404, 'This Department already exists');
  // }

  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

// get all into db
const getAllAcademicDepartmentFromDB = async () => {
  const result =
    await AcademicDepartmentModel.find().populate('academicFaculty');
  return result;
};

// get single academic faculty
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartmentModel.findById(id).populate('academicFaculty');
  return result;
};

// update academic faulty  into db
const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentService = {
  createDepartmentIntoDb,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
