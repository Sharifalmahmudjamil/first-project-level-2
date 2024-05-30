/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First Name must be required'],
    trim: true,
    maxlength: [20, 'name can not be more than 20'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name must be required'],
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
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
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
  dateOfBirth: { type: Date },
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// --------Document middleware

// --------- query middleware

studentSchema.pre('find', function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});

// create model

export const StudentModel = model<Student>('Student', studentSchema);
