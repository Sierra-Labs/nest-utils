import { createRouteParamDecorator } from '@nestjs/common';

export const RequestProperty = createRouteParamDecorator((data, req) => {
  return req[data];
});
