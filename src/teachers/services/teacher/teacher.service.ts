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
    
    const { user, department, modules, ...teacherData } = createTeacherDto;

    if (!user || !user.email || !user.password) {
      throw new BadRequestException('User details are required');
    }
    // Assurer que le rôle est bien "enseignant"
    user.role = 'enseignant';

    // Création de l'utilisateur
    const createdUser = await this.userService.create(user);
    if (!createdUser || !createdUser._id) {
      throw new InternalServerErrorException('Failed to create user');
    }
  
    // Vérification de l'existence du département
    const existingDepartment = await this.departementModel.findById(department).exec();
    if (!existingDepartment) {
      throw new NotFoundException('Department not found');
    }
  
    // Vérification de l'existence des modules
    if (modules && modules.length > 0) {
      const existingModules = await this.moduleModel.find({ _id: { $in: modules } }).exec();
      if (existingModules.length !== modules.length) {
        throw new NotFoundException('One or more modules not found');
      }
    }
  
    // Création de l'enseignant
    const createdTeacher = new this.teacherModel({
      ...teacherData,
      user: createdUser._id,  // Stocker uniquement l'ObjectId de l'utilisateur
      department: existingDepartment._id,
      modules, // Stocker les ObjectId des modules
    });
  
    return createdTeacher.save();  }

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

  async update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<Teacher | null> {
    const teacher = await this.teacherModel.findById(id).populate('user').populate('departement').populate('module').exec();
    if (!teacher) throw new NotFoundException('Teacher not found');

    // If user data is provided, update the user as well
    if (updateTeacherDto.user) {
        updateTeacherDto.user.role = 'enseignant'; // Ensure role remains 'enseignant'
        await this.userService.update(teacher.user.toString(), updateTeacherDto.user);
    }

    // Update Teacher
    return this.teacherModel.findByIdAndUpdate(id, updateTeacherDto, { new: true });
}
  async delete(id: string): Promise<Teacher | null> {
    const teacher = await this.teacherModel.findById(id);
    if (!teacher) throw new NotFoundException('Teacher not found');

        // Delete associated User
    await this.userService.delete(teacher.user.toString());
    return this.teacherModel.findByIdAndDelete(id).exec();
  }
}