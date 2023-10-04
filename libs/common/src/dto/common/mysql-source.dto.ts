import { IsNotEmpty, IsObject } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MysqlSourceDto {
  @Expose()
  @IsObject()
  @IsNotEmpty()
  payload: Record<string, any>;
}
