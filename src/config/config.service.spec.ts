import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  describe('constructor', async () => {
    let configService: ConfigService;
    beforeAll(async () => {
      const module = await Test.createTestingModule({
        imports: [ConfigModule.forRoot({
          env: {
            doc: 'The application environment.',
            format: ['production', 'development', 'test'],
            default: 'development',
            env: 'NODE_ENV'
          },
          db: {
            host: {
              doc: 'Database host name/IP',
              format: '*',
              default: 'server1.dev.test'
            },
            name: {
              doc: 'Database name',
              format: String,
              default: 'users'
            }
          }
        })]
        })
        .compile();

      configService = module.get<ConfigService>(ConfigService);
    });

    it('should get value from the NODE_ENV environment variable', () => {
      expect(configService.get('env')).toBe('test');
    });

    it('should get default value from config schema', () => {
      expect(configService.get('db.host')).toBe('server1.dev.test');
    });
  });

});
