import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: 'First Name can not be more than 20 characters' })
    .regex(/^[A-Z][a-z]*$/, {
      message: 'First Name must be in capitalize format',
    }),
  middleName: z.string().optional(),
  lastName: z.string().regex(/^[A-Za-z]+$/, {
    message: 'Last Name must only contain alphabetic characters',
  }),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// LocalGuardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Student Schema
const studentValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female'], { message: '{VALUE} is not valid' }),
  dateOfBirth: z.string(),
  email: z.string().email({ message: 'Email must be a valid email address' }),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default studentValidationSchema;
