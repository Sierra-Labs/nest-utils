import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

/**
 * TypeORM default naming strategy doesn't conform to industry best practices. The following is an override for
 * postgres naming convention.
 *
 * To use, modify the NestJS module imports to include the `namingStrategy` property:
 *
 * ```javascript
 * TypeOrmModule.forRoot({
 *    ...
 *    namingStrategy: new PostgresNamingStrategy()
 * })
 * ```
 */
export class PostgresNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName?: string): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName);
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join('_'));
  }

  columnNameCustomized(customName: string): string {
    return customName;
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  uniqueConstraintName(tableOrName: Table|string, columnNames: string[]): string {
    const clonedColumnNames = [...columnNames];
    clonedColumnNames.sort();
    const tableName = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const replacedTableName = tableName.replace('.', '_');
    const key = `${replacedTableName}__${clonedColumnNames.join('__')}`;
    return key + '__uq';
  }

  primaryKeyName(tableOrName: Table|string, columnNames: string[]): string {
    // sort incoming column names to avoid issue when ['id', 'name'] and ['name', 'id'] arrays
    const clonedColumnNames = [...columnNames];
    clonedColumnNames.sort();
    const tableName = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const replacedTableName = tableName.replace('.', '__');
    const key = `${replacedTableName}__${clonedColumnNames.join('__')}`;
    return key + '__pk';
  }

  foreignKeyName(tableOrName: Table|string, columnNames: string[]): string {
    // sort incoming column names to avoid issue when ['id', 'name'] and ['name', 'id'] arrays
    const clonedColumnNames = [...columnNames];
    clonedColumnNames.sort();
    const tableName = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const replacedTableName = tableName.replace('.', '_');
    const key = `${replacedTableName}__${clonedColumnNames.join('__')}`;
    return key + '__fk';
  }

  indexName(tableOrName: Table|string, columnNames: string[], where?: string): string {
    // sort incoming column names to avoid issue when ['id', 'name'] and ['name', 'id'] arrays
    const clonedColumnNames = [...columnNames];
    clonedColumnNames.sort();
    const tableName = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const replacedTableName = tableName.replace('.', '_');
    let key = `${replacedTableName}__${clonedColumnNames.join('__')}`;
    if (where)
        key += `__${where}`;

    return key + '__idx';
  }

  joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
    return snakeCase(tableName + '_' + (columnName ? columnName : propertyName));
}

}
