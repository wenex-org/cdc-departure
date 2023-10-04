import { toKebabCase } from 'naming-conventions-modeler';
import { date, logger } from '@app/common/utils';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { Model } from 'mongoose';

import { FortestService } from './fortest.service';
import { Fortest, FortestDocument } from './schema';
import { ChangeStreamDocument } from 'mongodb';

@Injectable()
export class FortestSchedule {
  private readonly log = logger(FortestSchedule.name);

  constructor(
    readonly fortestService: FortestService,
    @InjectModel(Fortest.name) readonly model: Model<FortestDocument>,
  ) {}

  @Timeout(1000)
  async handleTimeout() {
    this.log
      .get(toKebabCase(this.handleTimeout.name))
      .info(date(`timeout handler started forever.`));

    while (true) {
      try {
        const changeStream = this.model.watch<
          FortestDocument,
          ChangeStreamDocument<FortestDocument & { _id: string }>
        >([], { fullDocument: 'updateLookup', hydrate: true });

        do {
          const change = await changeStream.next();

          switch (change.operationType) {
            case 'insert':
              await this.fortestService.create(change.fullDocument);
              break;
            case 'delete':
              break;
          }

          console.log(change);
        } while (await changeStream.hasNext());

        await changeStream.close();
      } catch (error) {
        this.log
          .get(toKebabCase(this.handleTimeout.name))
          .error(date(`exception occurred while watching.`));
        this.log
          .get(toKebabCase(this.handleTimeout.name))
          .debug(date(`exception occurred while watching with error %j`), error);
      }
    }
  }
}
