import { Injectable } from '@nestjs/common';
import Convict from 'convict';
import * as convictAlias from 'convict';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Config service wrapper for Convict JS. If schema is not passed in during module initialization, then
 * the constructor will attempt to load the schema from the `/config` folder where the app is being executed
 * from.
 *
 * Environment specific config files can be loaded in `/config.[env].json`.
 */
@Injectable()
export class ConfigService<T = any> {
  constructor(private readonly config?: Convict.Config<T>) {
    let convict = convictAlias;
    if (typeof convict !== 'function') convict = Convict; // Jest won't run without this (conflict with Node and Jest)

    const schemaFile = path.resolve(process.cwd(), 'config/config-schema.json');
    const env = process.env.NODE_ENV || 'development';
    const defaultConfig = path.resolve(process.cwd(), 'config/config.json');
    const envConfig = path.resolve(
      process.cwd(),
      'config/config.' + env + '.json',
    );

    const isSchemaFileExists = fs.existsSync(schemaFile);

    const configFiles = [];
    if (fs.existsSync(defaultConfig)) configFiles.push(defaultConfig);
    if (fs.existsSync(envConfig)) configFiles.push(envConfig);
    if (!this.config && isSchemaFileExists) {
      this.config = convict<T>(schemaFile).validate();
    } else if (!this.config) {
      this.config = convict<T>({} as Convict.Schema<T>);
    }
    this.loadFile(configFiles);
  }

  /**
   * Loads and merges a JavaScript object into config.
   * @param conf The javascript object config.
   */
  public load(conf: any) {
    return this.config.load(conf);
  }

  /**
   * Loads and merges one or multiple JSON configuration files into config. JSON files are loaded using
   * JSON5, so they can contain comments.
   * @param path The path to the JSON5 config file.
   */
  public loadFile(path: string | string[]) {
    return this.config.loadFile(path);
  }

  /**
   * Returns the current value of the `name` property. `name` can use dot notation to
   * reference nested values.
   * @param name The key to look up in the config.
   */
  public get<K extends keyof T | string | null | undefined = undefined>(
    name?: K,
  ): K extends null | undefined ? T : K extends keyof T ? T[K] : any {
    if (this.config.has(name)) {
      return this.config.get(name);
    } else {
      return undefined;
    }
  }
}
