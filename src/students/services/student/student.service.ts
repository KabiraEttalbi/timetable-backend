import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from '../../models/student.model';
import { User, UserDocument } from '../../../users/models/user.model';
import { CreateStudentDto } from '../../dto/create-student.dto';
import { UpdateStudentDto } from '../../dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    // Check if the referenced user exists
    const user = await this.userModel.findById(createStudentDto.user).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save();
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().populate('user').exec();
  }

  async findOne(id: string): Promise<Student | null> {
    return this.studentModel.findById(id).populate('user').exec();
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student | null> {
    return this.studentModel
      .findByIdAndUpdate(id, updateStudentDto, { new: true })
      .populate('user')
      .exec();
  }

  async delete(id: string): Promise<Student | null> {
    return this.studentModel.findByIdAndDelete(id).exec();
  }
}