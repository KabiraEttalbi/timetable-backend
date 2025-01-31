import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type StudentDocument = Student & Document;

@Schema()
export class Student {
    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    user: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: "Niveau", required: true })
    niveau: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: "Option", required: true })
    option: Types.ObjectId;

    @Prop({ required: true })
    gender: string; 

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true })
    anneeBaccalaureat: number; 

    @Prop({ required: true }) 
    image: string; 
}

export const StudentSchema = SchemaFactory.createForClass(Student);