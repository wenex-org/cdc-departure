import { buildSchema, Prop } from '@typegoose/typegoose';
import type { Document } from 'mongoose';

export class Ref {
  @Prop({ type: String, required: true, index: true })
  id: string;

  @Prop({ type: Number, required: true, index: true })
  ref: number;
}

export type RefDocument = Document & Ref;
export const RefSchema = buildSchema(Ref);
