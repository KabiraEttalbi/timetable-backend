import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type EventDocument = Event & Document;

@Schema()
export class Event {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    organizer: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: "Reservation", required: true })
    reservation: Types.ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(Event);