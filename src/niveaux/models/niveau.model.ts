import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type NiveauDocument = Niveau & Document;

@Schema()
export class Niveau {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    cycle: number;
}

export const NiveauSchema = SchemaFactory.createForClass(Niveau);