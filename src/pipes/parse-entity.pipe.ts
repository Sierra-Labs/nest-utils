import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  Injectable
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ParseEntityPipe implements PipeTransform<any> {
  constructor(private readonly options: any) {}

  public async transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toParse(metatype)) {
      return value;
    }
    const entity = plainToClass(metatype, value);

    if (this.options.validate) {
      const errors = await validate(entity, this.options.validate);
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
    }
    return entity;
  }

  private toParse(metatype): boolean {
    const types = [Object];
    return !types.find(type => metatype === type);
  }
}
