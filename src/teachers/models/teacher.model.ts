/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import * as moment from 'moment'; // or use date-fns if you prefer


export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher {
    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    user: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: "Departement", required: true })
    department: Types.ObjectId;

    @Prop({ required: true, unique: true })
        cni: string;
        
    @Prop({ required: true,
        validate: {
            validator: function(value: Date) {
                // Example: Validate that the date is in 'YYYY-MM-DD' format
                return moment(value, 'YYYY-MM-DD', true).isValid();
            },
            message: (props: { value: Date }) => `${props.value} is not a valid date in the format YYYY-MM-DD!`
        }})
    birthdate: Date;

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