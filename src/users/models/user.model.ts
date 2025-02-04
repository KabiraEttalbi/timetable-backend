import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {

  @Prop({ required: true, trim: true })
  nom: string;

  @Prop({ required: true, trim: true })
  prenom: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true, unique: true, trim: true })
  username: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ default: false })
  isAuthenticated: boolean;

  @Prop({
    required: true,
    enum: ['admin', 'enseignant', 'etudiant'],
    default: 'etudiant',
  })
  role: 'admin' | 'enseignant' | 'etudiant';
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;