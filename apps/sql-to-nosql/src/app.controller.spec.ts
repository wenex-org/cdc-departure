import { Test, TestingModule } from '@nestjs/testing';
import { SqlToNosqlController } from './sql-to-nosql.controller';
import { SqlToNosqlService } from './sql-to-nosql.service';

describe('SqlToNosqlController', () => {
  let sqlToNosqlController: SqlToNosqlController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SqlToNosqlController],
      providers: [SqlToNosqlService],
    }).compile();

    sqlToNosqlController = app.get<SqlToNosqlController>(SqlToNosqlController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sqlToNosqlController.getHello()).toBe('Hello World!');
    });
  });
});
