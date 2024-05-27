// import Joi from 'joi';

// // creating a schema validation using joi
// const userNameValidationSchema = Joi.object({
//   firstName: Joi.string()
//     .trim()
//     .max(20)
//     .regex(/^[A-Z][a-z]*$/, 'capitalize format')
//     .required()
//     .messages({
//       'string.base': 'First Name must be a string',
//       'string.empty': 'First Name must be required',
//       'string.max': 'First Name can not be more than 20 characters',
//       'string.pattern.name': '{#label} is not in capitalize format',
//     }),
//   middleName: Joi.string().optional(),
//   lastName: Joi.string()
//     .pattern(/^[A-Za-z]+$/, 'alpha')
//     .required()
//     .messages({
//       'string.base': 'Last Name must be a string',
//       'string.empty': 'Last Name must be required',
//       'string.pattern.name': '{#label} is not valid',
//     }),
// });

// // Guardian Schema
// const guardianValidationSchema = Joi.object({
//   fatherName: Joi.string().required().messages({
//     'string.base': 'Father Name must be a string',
//     'string.empty': 'Father Name must be required',
//   }),
//   fatherOccupation: Joi.string().required().messages({
//     'string.base': 'Father Occupation must be a string',
//     'string.empty': 'Father Occupation must be required',
//   }),
//   fatherContactNo: Joi.string().required().messages({
//     'string.base': 'Father Contact No must be a string',
//     'string.empty': 'Father Contact No must be required',
//   }),
//   motherName: Joi.string().required().messages({
//     'string.base': 'Mother Name must be a string',
//     'string.empty': 'Mother Name must be required',
//   }),
//   motherOccupation: Joi.string().required().messages({
//     'string.base': 'Mother Occupation must be a string',
//     'string.empty': 'Mother Occupation must be required',
//   }),
//   motherContactNo: Joi.string().required().messages({
//     'string.base': 'Mother Contact No must be a string',
//     'string.empty': 'Mother Contact No must be required',
//   }),
// });

// // LocalGuardian Schema
// const localGuardianValidationSchema = Joi.object({
//   name: Joi.string().required().messages({
//     'string.base': 'Local Guardian Name must be a string',
//     'string.empty': 'Local Guardian Name must be required',
//   }),
//   occupation: Joi.string().required().messages({
//     'string.base': 'Local Guardian Occupation must be a string',
//     'string.empty': 'Local Guardian Occupation must be required',
//   }),
//   contactNo: Joi.string().required().messages({
//     'string.base': 'Local Guardian Contact No must be a string',
//     'string.empty': 'Local Guardian Contact No must be required',
//   }),
//   address: Joi.string().required().messages({
//     'string.base': 'Local Guardian Address must be a string',
//     'string.empty': 'Local Guardian Address must be required',
//   }),
// });

// // Student Schema
// const studentValidationSchema = Joi.object({
//   id: Joi.string().required().messages({
//     'string.base': 'ID must be a string',
//     'string.empty': 'ID must be required',
//   }),
//   name: userNameValidationSchema.required(),
//   gender: Joi.string().valid('male', 'female').required().messages({
//     'string.base': 'Gender must be a string',
//     'string.empty': 'Gender must be required',
//     'any.only': '{#value} is not valid',
//   }),
//   dateOfBirth: Joi.string().optional(),
//   email: Joi.string().email().required().messages({
//     'string.base': 'Email must be a string',
//     'string.empty': 'Email must be required',
//     'string.email': '{#value} is not a valid email type',
//   }),
//   contactNo: Joi.string().required().messages({
//     'string.base': 'Contact No must be a string',
//     'string.empty': 'Contact No must be required',
//   }),
//   emergencyContactNo: Joi.string().required().messages({
//     'string.base': 'Emergency Contact No must be a string',
//     'string.empty': 'Emergency Contact No must be required',
//   }),
//   bloodGroup: Joi.string()
//     .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
//     .optional(),
//   presentAddress: Joi.string().required().messages({
//     'string.base': 'Present Address must be a string',
//     'string.empty': 'Present Address must be required',
//   }),
//   permanentAddress: Joi.string().required().messages({
//     'string.base': 'Permanent Address must be a string',
//     'string.empty': 'Permanent Address must be required',
//   }),
//   guardian: guardianValidationSchema.required(),
//   localGuardian: localGuardianValidationSchema.required(),
//   profileImage: Joi.string().optional(),
//   isActive: Joi.string().valid('active', 'blocked').default('active').messages({
//     'string.base': 'Status must be a string',
//     'any.only': '{#value} is not valid',
//   }),
// });

// // export default studentValidationSchema;
