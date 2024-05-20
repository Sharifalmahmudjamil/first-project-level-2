/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './students/student.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First Name must be required'],
    trim: true,
    maxlength: [20, 'name can not be more than 20'],

    // custom validation
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not a capitalize format',
    // },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name must be required'],

    // Third party validation libraries

    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
});
const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name must be required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation must be required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact No must be required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name must be required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation must be required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact no must be required'],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

// create schema for student
const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, 'password cant be more than 20 char'],
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{Value} is not a valid email type',
    },
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

// pre save middleware/hook
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save data');

  // hashing pass save into db
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware/hook
studentSchema.post('save', function () {
  console.log(this, 'post hook : we saved our data');
});

// create model

export const StudentModel = model<Student>('Student', studentSchema);
