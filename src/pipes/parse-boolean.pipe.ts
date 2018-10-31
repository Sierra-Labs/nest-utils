import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ParseBooleanPipe implements PipeTransform<string, boolean> {
  transform(value: string): boolean {
    if (typeof value !== 'string') return false;
    switch (value.toLowerCase()) {
      case 'true':
      case '1':
      case 't':
        return true;
      default:
        return false;
    }
  }
}
