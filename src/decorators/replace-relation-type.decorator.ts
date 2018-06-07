import { getMetadataArgsStorage, ObjectType } from 'typeorm';

/**
 * Replaces the relation type reference in the meta data storage. Useful for replacing inherited base entities.
 * @param typeFunction The type function to use to return the object reference.
 */
export const ReplaceRelationType = <T>(typeFunction: (type?: any) => ObjectType<T>) => (
  target: object,
  propertyName: string,
  descriptor?,
) => {
  const metadata = getMetadataArgsStorage();
  for (const relation of metadata.relations) {
    if (relation.propertyName === propertyName) {
      const newRelation = Object.assign(relation, {type: typeFunction});
      metadata.relations.splice(metadata.relations.indexOf(relation), 1, newRelation);
    }
  }
};
