import { buildSchema, Prop } from '@typegoose/typegoose';
import type { Document } from 'mongoose';

import { FortestInterface } from '../interfaces';

export class Fortest implements FortestInterface {
  @Prop()
  ref: number;

  @Prop()
  name?: string;

  @Prop()
  email?: string;
}

export type FortestDocument = Document & Fortest;
export const FortestSchema = buildSchema(Fortest);
