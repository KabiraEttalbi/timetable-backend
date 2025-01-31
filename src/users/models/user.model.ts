import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  prenom: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isAuthenticated: boolean;

  // Ajout de la validation pour le rôle avec un tableau des valeurs possibles
  @Prop({
    required: true,
    enum: ["admin", "enseignant", "etudiant"],
    default: "etudiant",
  })
  role: "admin" | "enseignant" | "etudiant";
}

export const UserSchema = SchemaFactory.createForClass(User);
