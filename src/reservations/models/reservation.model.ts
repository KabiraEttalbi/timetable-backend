import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ type: Types.ObjectId, ref: "Salle", required: true })
  salle: Types.ObjectId;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  heureDebut: string;

  @Prop({ required: true })
  heureFin: string;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  utilisateur: Types.ObjectId;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
