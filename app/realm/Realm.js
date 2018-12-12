const Realm = require('realm');

export const BoardSchema = {
  name: 'Board',
  properties: {
    title: 'string',
    cardGroups: {type: 'linkingObjects', objectType: 'CardGroup', property: 'project'}
  }
};

export const CardGroupSchema = {
  name: 'CardGroup',
  properties: {
    title: 'string?',
    project: 'Board',
    cards: {type: 'linkingObjects', objectType: 'Card', property: 'cardGroup'},
  }
};

export const CardSchema = {
  name: 'Card',
  properties: {
    title: 'string?',
    cardGroup: 'CardGroup',
  }
};

export default realm = new Realm({schema: [CardSchema, CardGroupSchema, BoardSchema], schemaVersion: 2});

export const getNewId = (collect, primaryKey) => {
  let maxId = Math.max.apply(null, collection.map((item) => item[primaryKey]));
  maxId = maxId === undefined ? 1 : (maxId + 1);
  return maxId;
}