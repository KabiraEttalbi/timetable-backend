import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher {
    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    user: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: "Departement", required: true })
    department: Types.ObjectId;

    @Prop({ required: true })
    gender: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: "Module" }] })
    modules: Types.ObjectId[];

    @Prop({ required: true }) 
    image: string; 
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);