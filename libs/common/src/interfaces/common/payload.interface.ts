export interface MysqlSourcePayload<T = any> {
  before?: T;
  after?: T;
}
export type MysqlSourcePayloadInterface<T = any> = MysqlSourcePayload<T>;

export interface MongoSourcePayload<T = any> {
  before?: T & { _id: { $oid: string } /* MongoDB Source */ };
  after?: T & { _id: { $oid: string } /* MongoDB Source */ };

  $oid?: string; // MongoDB Source
}
export type MongoSourcePayloadInterface<T = any> = MongoSourcePayload<T>;
