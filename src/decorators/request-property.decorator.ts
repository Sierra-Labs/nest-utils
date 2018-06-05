import { createParamDecorator, PipeTransform } from '@nestjs/common';

export const RequestProperty = createParamDecorator((data, req) => {
  return req[data];
});
