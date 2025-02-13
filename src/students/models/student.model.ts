/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import * as moment from 'moment'; // or use date-fns if you prefer


export type StudentDocument = Student & Document;

@Schema()
export class Student {
    @Prop({ type: Types.ObjectId, ref: "User", required: true, unique: true })
    user: Types.ObjectId;    

    @Prop({ type: Types.ObjectId, ref: "Niveau", required: true })
    niveau: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: "Option", required: true })
    option: Types.ObjectId;

    @Prop({ required: true, unique: true })
    cne: string; 

    @Prop({ required: true, unique: true })
    cni: string;
    
    @Prop({ required: true})
    birthdate: Date;
    
    @Prop({ required: true,
        validate: {
            validator: function(value: Date) {
                // Example: Validate that the date is in 'YYYY-MM-DD' format
                return moment(value, 'YYYY-MM-DD', true).isValid();
            },
            message: (props: { value: Date }) => `${props.value} is not a valid date in the format YYYY-MM-DD!`
        } })
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