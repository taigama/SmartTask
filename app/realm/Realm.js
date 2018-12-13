const Realm = require('realm');

export const BoardSchema = {
  name: 'Board',
  properties: {
    title: 'string',
    cardGroups: 'CardGroup[]',
  }
};

export const CardGroupSchema = {
  name: 'CardGroup',
  properties: {
    title: 'string?',
    cards: 'Card[]',
    board:  {type: 'linkingObjects', objectType: 'Board', property: 'cardGroups'}
  }
};

export const CardSchema = {
  name: 'Card',
  properties: {
    title: 'string?',
    cardGroup: {type: 'linkingObjects', objectType: 'CardGroup', property: 'cards'},
  }
};

export default realm = new Realm({schema: [CardSchema, CardGroupSchema, BoardSchema], schemaVersion: 3});

export const getNewId = (collect, primaryKey) => {
  let maxId = Math.max.apply(null, collection.map((item) => item[primaryKey]));
  maxId = maxId === undefined ? 1 : (maxId + 1);
  return maxId;
}