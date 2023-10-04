import { Injectable } from '@nestjs/common';

@Injectable()
export class SqlToNosqlService {
  getHello(): string {
    return 'Hello World!';
  }
}
