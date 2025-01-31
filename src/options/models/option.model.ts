import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type OptionDocument = Option & Document;

@Schema()
export class Option {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ type: Types.ObjectId, ref: "Department", required: true })
  department: Types.ObjectId;
}

export const OptionSchema = SchemaFactory.createForClass(Option);
