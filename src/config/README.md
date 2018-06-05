# NestJS - ConfigModule and ConfigService

Configuration module for Nest.js (wraps convict module).

## Install

Installs as part of the `@sierralabs/nest-utils` package.

```bash
$ npm install @sierralabs/nest-utils --save
```

## Setup ConfigModule

Import the `ConfigModule` into your AppModule:

```javascript
import { ConfigModule } from 'nest-config';
import { Module } from '@nestjs/common';

@Module({
    imports: [ConfigModule.forRoot()],
})
export class AppModule {
}
```

By not passing any params to the `ConfigModule.forRoot()` the `ConfigService` will load the following from the current folder path:

* `config/config-schema.json` - The convict config schema file.
* `config/config.json` - The default config json.
* `config/config.[NODE_ENV].json` - The environment specific config json override.

You can pass in your convict config schema through the `ConfigModule.forRoot()` call:

```javascript
ConfigModule.forRoot({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  }
)
```

or you can pass in a path to the config schema JSON:

```javascript
ConfigModule.forRoot('/path/to/config-schema.json')
```

## ConfigService Usage

To use the `ConfigService`:

```javascript
xport class UserController {

    constructor (
        private config: ConfigService
    ) { }

    method() {
        const foo = this.config.get<string>('foo');
    }
}
```
