import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SalleDocument = Salle & Document;

@Schema()
export class Salle {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  capacite: number;

  @Prop({ required: true, enum: ["amphi", "normal", "haull"] })
  type: string;

}

export const SalleSchema = SchemaFactory.createForClass(Salle);
