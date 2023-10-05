import { ObjectId } from 'mongodb';

export const MongoId = (id?: string): ObjectId => new ObjectId(id);

export const toJSON = (value: any) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
