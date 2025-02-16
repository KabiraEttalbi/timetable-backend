import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type NiveauDocument = Niveau & Document;

@Schema()
export class Niveau {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    cycle: number;
    
    @Prop({ type: Types.ObjectId, ref: "Option", required: true })
    option: Types.ObjectId;
}

export const NiveauSchema = SchemaFactory.createForClass(Niveau);