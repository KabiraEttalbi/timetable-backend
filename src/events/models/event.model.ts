import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as moment from 'moment'; // or use date-fns if you prefer
import { Document, ObjectId, Types } from "mongoose";

export type EventDocument = Event & Document;

@Schema()
export class Event {
    
    _id: ObjectId | string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true,
        validate: {
          validator: function(value: Date) {
            // Example: Validate that the date is in 'YYYY-MM-DD' format
            return moment(value, 'YYYY-MM-DD', true).isValid();
          },
          message: (props: { value: Date }) => `${props.value} is not a valid date in the format YYYY-MM-DD!`
        }})
    date: Date;

    @Prop({ required: true })
    heureDebut: string;
  
    @Prop({ required: true })
    heureFin: string;
  
    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    organizer: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: "Reservation", required: true })
    reservation: Types.ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(Event);