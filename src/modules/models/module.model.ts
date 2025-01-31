import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ModuleDocument = Module & Document;

@Schema()
export class Module {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  nbhours: number;

  @Prop({ type: Types.ObjectId, ref: "Niveau", required: true })
  niveau: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Option", required: true })
  option: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Teacher" })
  teacher: Types.ObjectId;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
