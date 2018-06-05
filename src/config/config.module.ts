import { Global, Module, DynamicModule, Provider } from '@nestjs/common';
import { ConfigService } from './config.service';
import { Schema } from 'convict';
import Convict from 'convict';
import * as convictAlias from 'convict';

let convict = convictAlias;
if (typeof convict !== 'function') convict = Convict; // Jest won't run without this (conflict with Node and Jest)

@Global()
@Module({})
export class ConfigModule {
  static forRoot<T = any>(schema?: Schema<T> | string): DynamicModule {
    const config = schema ? convict(schema).validate() : undefined;
    const providers: Provider[] = [
      { provide: ConfigService, useValue: new ConfigService<T>(config) },
    ];
    return {
      module: ConfigModule,
      providers,
      exports: providers,
    };
  }
}
