import { getMetadataArgsStorage, ColumnOptions } from 'typeorm';

/**
 * Replaces the column options configuration in the meta data storage. Useful for replacing inherited base entities.
 * @param options The Column Options configuration
 */
export const ReplaceColumnOptions = (options: ColumnOptions) => (
  target: object,
  propertyName: string,
  descriptor?,
) => {
  const metadata = getMetadataArgsStorage();
  for (const column of metadata.columns) {
    if (column.propertyName === propertyName) {
      const newOptions = Object.assign(column.options, options);
      const newColumn = Object.assign(column, { options: newOptions });
      metadata.columns.splice(metadata.columns.indexOf(column), 1, newColumn);
      break;
    }
  }
};
