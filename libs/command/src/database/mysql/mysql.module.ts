import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { MYSQL_CONFIG, NODE_ENV } from '@app/common/configs';
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MysqlService } from './mysql.service';

@Module({})
export class MysqlModule {
  static register(
    options: ReturnType<typeof MYSQL_CONFIG>,
    entities?: EntityClassOrSchema[],
  ): DynamicModule {
    return {
      module: MysqlModule,
      imports: [
        TypeOrmModule.forRoot({
          entities,
          ...options,
          type: 'mysql',
          synchronize: !NODE_ENV().IS_PRODUCTION,
        }),
        TypeOrmModule.forFeature(entities),
      ],
      providers: [MysqlService],
      exports: [MysqlService],
    };
  }
}
