export interface SourcePayload<T = any> {
  before?: T;
  after?: T;
}
export type SourcePayloadInterface<T = any> = SourcePayload<T>;
