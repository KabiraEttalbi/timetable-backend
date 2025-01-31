import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type EmploiDuTempsDocument = EmploiDuTemps & Document;

export enum ScheduleType {
  STUDENT = "student",
  TEACHER = "teacher",
}

@Schema({ timestamps: true })
export class EmploiDuTemps {
  @Prop({ required: true })
  jour: string;

  @Prop({ required: true })
  heureDebut: string;

  @Prop({ required: true })
  heureFin: string;

  @Prop({ type: Types.ObjectId, ref: "Module", required: true })
  module: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Salle", required: true })
  salle: Types.ObjectId;

  @Prop({ required: true, enum: ScheduleType })
  type: ScheduleType; // Indicates whether this is a student or teacher schedule

  @Prop({ type: Types.ObjectId, refPath: "type", required: true })
  user: Types.ObjectId; // Links to either Student or Teacher based on `type`

}

export const EmploiDuTempsSchema = SchemaFactory.createForClass(EmploiDuTemps);