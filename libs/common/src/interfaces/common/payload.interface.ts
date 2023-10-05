export interface SourcePayload<T = any> {
  before?: T & { _id: { $oid: string } /* MongoDB Source */ };
  after?: T & { _id: { $oid: string } /* MongoDB Source */ };

  $oid?: string; // MongoDB Source
}
export type SourcePayloadInterface<T = any> = SourcePayload<T>;
