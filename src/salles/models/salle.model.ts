import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

// Déclaration du type SalleDocument, qui étend de Document (pour que Mongoose ajoute les méthodes et propriétés par défaut)
export type SalleDocument = Salle & Document;

@Schema()
export class Salle {
  _id: Types.ObjectId;
  
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  capacite: number;

  @Prop({ required: true, enum: ["amphi", "normal", "haull"] })
  type: string;

  @Prop({ type: Types.ObjectId, ref: 'Module', required: false })
  module: Types.ObjectId;  

  @Prop({ default: true })
  disponible: boolean;  
}

// Génération du schéma basé sur la classe Salle
export const SalleSchema = SchemaFactory.createForClass(Salle);
