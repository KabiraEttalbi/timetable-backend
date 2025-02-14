import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document ,Types } from "mongoose";


export type DepartementDocument = Departement & Document;

@Schema()
export class Departement {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, unique: true })
    description: string;

    // Référence vers les enseignants du département
  @Prop({ type: [{ type: Types.ObjectId, ref: "Teacher" }] })
  teachers: Types.ObjectId[];

  // Référence vers les modules du département
  @Prop({ type: [{ type: Types.ObjectId, ref: "Module" }] })
  modules: Types.ObjectId[];

  // Référence vers les niveaux du département
  @Prop({ type: [{ type: Types.ObjectId, ref: "Niveau" }] })
  niveaux: Types.ObjectId[];
}

export const DepartementSchema = SchemaFactory.createForClass(Departement);
   