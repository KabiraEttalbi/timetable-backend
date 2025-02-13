import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Departement, DepartementDocument } from 'src/departements/models/departement.model';
import { CreateTeacherDto } from 'src/teachers/dto/create-teacher.dto';
import { Teacher, TeacherDocument } from 'src/teachers/models/teacher.model';
import { UpdateTeacherDto } from 'src/teachers/dto/update-teacher.dto';
import { User, UserDocument } from 'src/users/models/user.model';
import { UserService } from 'src/users/services/user/user.service';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name)
    private teacherModel: Model<TeacherDocument>,
    private userService: UserService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Departement.name)
    private departementModel: Model<DepartementDocument>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    // Check if the referenced user exists
    const user = await this.userModel.findById(createTeacherDto.user).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the referenced department exists
    const department = await this.departementModel
      .findById(createTeacherDto.department)
      .exec();
    if (!department) {
      throw new NotFoundException('Department not found');
    }

    const createdTeacher = new this.teacherModel(createTeacherDto);
    return createdTeacher.save();
  }

  async findAll(): Promise<Teacher[]> {
    return this.teacherModel.find().populate('user').populate('department').populate('module').exec();
  }

  async findOne(id: string): Promise<Teacher | null> {
    return this.teacherModel
      .findById(id)
      .populate('user')
      .populate('department')
      .populate('module')
      .exec();
  }

  async update(
    id: string,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher | null> {
    const { user, ...teacherData } = updateTeacherDto;

    const teacher = await this.teacherModel.findById(id).populate('user').populate('departement').populate('module');
    if (!teacher) throw new NotFoundException('Teacher not found');

    // Update User if user data is provided
    if (user) {
      await this.userService.update(teacher.user.toString(), user);
    }

    // Update Teacher
    return this.teacherModel.findByIdAndUpdate(id, teacherData, { new: true });

  }

  async delete(id: string): Promise<Teacher | null> {
    const teacher = await this.teacherModel.findById(id);
    if (!teacher) throw new NotFoundException('Teacher not found');

        // Delete associated User
    await this.userService.delete(teacher.user.toString());
    return this.teacherModel.findByIdAndDelete(id).exec();
  }
}