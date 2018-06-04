import { Test } from '@nestjs/testing';
import { PostgresNamingStrategy } from './postgres-naming-strategy';

describe('PostgresNamingStrategy', () => {

  const postgresNamingStrategy = new PostgresNamingStrategy();

  describe('tableName', () => {
    it('should convert camelCase to snake_case', () => {
      const tableName = postgresNamingStrategy.tableName('someTableName');
      expect(tableName).toBe('some_table_name');
    });
  });

  describe('columnName', () => {
    it('should convert camelCase to snake_case', () => {
      const columnName = postgresNamingStrategy.columnName('someColumnName', undefined, []);
      expect(columnName).toBe('some_column_name');
    });
  });

  describe('columnNameCustomized', () => {
    it('should return custom name', () => {
      const columnName = postgresNamingStrategy.columnNameCustomized('some_column_name');
      expect(columnName).toBe('some_column_name');
    });
  });

  describe('relationName', () => {
    it('should convert camelCase to snake_case', () => {
      const relationName = postgresNamingStrategy.relationName('someRelationName');
      expect(relationName).toBe('some_relation_name');
    });
  });

  describe('uniqueConstraintName', () => {
    it('should conform to postgres sql best practices [table_name]__[column_names]__uq', () => {
      const uniqueConstraintName = postgresNamingStrategy.uniqueConstraintName('user', ['email']);
      expect(uniqueConstraintName).toBe('user__email__uq');
    });
  });

  describe('primaryKeyName', () => {
    it('should conform to postgres sql best practices [table_name]__[column_names]__pk', () => {
      const primaryKeyName = postgresNamingStrategy.primaryKeyName('user', ['id']);
      expect(primaryKeyName).toBe('user__id__pk');
    });
  });

  describe('foreignKeyName', () => {
    it('should conform to postgres sql best practices [table_name]__[column_names]__fk', () => {
      const foreignKeyName = postgresNamingStrategy.foreignKeyName('inventory', ['user_id']);
      expect(foreignKeyName).toBe('inventory__user_id__fk');
    });
  });

  describe('indexName', () => {
    it('should conform to postgres sql best practices [table_name]__[column_names]__idx', () => {
      const indexName = postgresNamingStrategy.indexName('state', ['state_code']);
      expect(indexName).toBe('state__state_code__idx');
    });
  });

  describe('joinTableColumnName', () => {
    it('should create a snake_case join table column name', () => {
      const joinTableColumnName = postgresNamingStrategy.joinTableColumnName('user', 'id');
      expect(joinTableColumnName).toBe('user_id');
    });
  });
});
