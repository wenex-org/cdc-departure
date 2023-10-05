import { buildSchema, Prop } from '@typegoose/typegoose';
import type { Document } from 'mongoose';

import { RefInterface } from '../interfaces';

export class Ref implements RefInterface {
  @Prop({ type: String, required: true, index: true })
  id: string;

  @Prop({ type: Number, required: true, index: true })
  ref: number;
}

export type RefDocument = Document & Ref;
export const RefSchema = buildSchema(Ref);
