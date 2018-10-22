/**
 * TypeORM Postgres column type `numeric` is returned as a string due to postgres to javascript precision.
 * This column transformer can be used to return javascript number values.
 * @example
 * @Column('numeric', {
 *   precision: 7,
 *   scale: 2,
 *   transformer: new ColumnNumericTransformer(),
 * })
 */
export class ColumnNumericTransformer {
  to(value: number): number {
    return value;
  }
  from(value: string): number {
    return parseFloat(value);
  }
}
