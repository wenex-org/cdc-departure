import { SourcePayloadInterface } from '@app/common/interfaces';
import { IsNotEmpty, IsObject } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MongoSourceDto<T = any> {
  @Expose()
  @IsObject()
  @IsNotEmpty()
  payload: SourcePayloadInterface<T>;
}
