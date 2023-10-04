import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { date, logger } from '../utils/logger.util';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private readonly log = logger(ValidationPipe.name);

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    this.log
      .get(this.transform.name)
      .info(
        date(
          `validation of the ${metatype.name} with error length ${errors.length} called`,
        ),
      );

    if (errors.length > 0) {
      const constraints = (error: ValidationError) => {
        if (error.children.length > 0) {
          return error.children.map((child) => constraints(child)).flat();
        }

        return Object.values(error.constraints);
      };

      throw new BadRequestException(
        errors.map((error) => Object.values(constraints(error))).join(', '),
      );
    }

    this.log
      .get(this.transform.name)
      .debug(date(`validation of the ${metatype.name} with data %j returned`), object);

    return instanceToPlain(object);
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];

    return !types.includes(metatype);
  }
}
