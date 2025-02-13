import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from '../../models/student.model';
import { CreateStudentDto } from '../../dto/create-student.dto';
import { UpdateStudentDto } from '../../dto/update-student.dto';
import { UserService } from 'src/users/services/user/user.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
    private userService: UserService,
  ) {}

  // Create a new student and user at the same time
  async create(createStudentDto: CreateStudentDto) {
    const { user, ...studentData } = createStudentDto;

    if (!user || !user.email || !user.password) {
      throw new BadRequestException('User details are required');
    }

    // Create User first
    const createdUser = await this.userService.create(user);

    // Create Student linked to the User
    const createdStudent = new this.studentModel({
      ...studentData,
      user: createdUser._id,
    });

    return createdStudent.save();
  }

  // Find all students with user details populated
  async findAll(): Promise<Student[]> {
    return this.studentModel.find().populate('option').populate('niveau').populate('user').exec();
  }

  // Find a specific student by ID
  async findOne(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id).populate('user').populate('niveau').populate('option');
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  // Update student and their associated user
  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const { user, ...studentData } = updateStudentDto;

    const student = await this.studentModel.findById(id).populate('option').populate('niveau');
    if (!student) throw new NotFoundException('Student not found');

    // Update User if user data is provided
    if (user) {
      await this.userService.update(student.user.toString(), user);
    }

    // Update Student
    return this.studentModel.findByIdAndUpdate(id, studentData, { new: true });
  }

  // Delete student and their associated user
  async delete(id: string) {
    const student = await this.studentModel.findById(id);
    if (!student) throw new NotFoundException('Student not found');

    // Delete associated User
    await this.userService.delete(student.user.toString());

    // Delete Student
    return this.studentModel.findByIdAndDelete(id);
  }
}