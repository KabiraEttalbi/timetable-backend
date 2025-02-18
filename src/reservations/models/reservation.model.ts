import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment'; // or use date-fns if you prefer
import { Document, Types } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ type: Types.ObjectId, ref: 'Salle', required: true })
  salle: Types.ObjectId;

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
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  heureDebut: string;

  @Prop({ required: true })
  heureFin: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({
    required: true,
    enum: ['event', 'course', 'td', 'tp'], // Allowed values for the type field
  })
  type: 'event' | 'course' | 'td' | 'tp';

  @Prop({ type: Types.ObjectId, ref: 'Module', required: false })
  module: Types.ObjectId;

}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);