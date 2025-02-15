import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Departement, DepartementDocument } from 'src/departements/models/departement.model';
import { CreateTeacherDto } from 'src/teachers/dto/create-teacher.dto';
import { Teacher, TeacherDocument } from 'src/teachers/models/teacher.model';
import { UpdateTeacherDto } from 'src/teachers/dto/update-teacher.dto';
import { User, UserDocument } from 'src/users/models/user.model';
import { UserService } from 'src/users/services/user/user.service';
import { Module, ModuleDocument } from 'src/modules/models/module.model';

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
    @InjectModel(Module.name)
    private moduleModel: Model<ModuleDocument>, // Injection du modèle Module
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    
    const { user, ...teacherData } = createTeacherDto;

    if (!user || !user.email || !user.password) {
      throw new BadRequestException('User details are required');
    }
    // Assurer que le rôle est bien "enseignant"
    user.role = 'enseignant';

    // Création de l'utilisateur
    const createdUser = await this.userService.create(user);
    
    // Création de l'enseignant
    const createdTeacher = new this.teacherModel({
      ...teacherData,
      user: createdUser._id,  // Stocker uniquement l'ObjectId de l'utilisateur
    });
  
    return createdTeacher.save();  }

  async findAll(): Promise<Teacher[]> {
    return this.teacherModel.find().populate('user').populate('department').populate('modules').exec();
  }

  async findOne(id: string): Promise<Teacher | null> {
    return this.teacherModel
      .findById(id)
      .populate('user')
      .populate('department')
      .populate('modules')
      .exec();
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {

    const { user, ...teacherData } = updateTeacherDto;

    const teacher = await this.teacherModel.findById(id).populate('department').populate('modules');
    if (!teacher) throw new NotFoundException('teacher not found');

    // Update User if user data is provided
    if (user) {
      await this.userService.update(teacher.user.toString(), user);
    }

    // Update teacher
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