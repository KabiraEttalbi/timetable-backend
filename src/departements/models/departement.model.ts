import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type DepartementDocument = Departement & Document;

@Schema()
export class Departement {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, unique: true })
    description: string;
}

export const DepartementSchema = SchemaFactory.createForClass(Departement);
   