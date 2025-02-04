import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) 
  userId: Types.ObjectId; 
  
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string; 

  @Prop({ default: false })
  lue: boolean; 

  @Prop({ default: Date.now })
  date: Date; 
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);