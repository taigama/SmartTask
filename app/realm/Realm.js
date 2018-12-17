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

export const LabelSchema = {
  name: 'Label',
  primaryKey: 'key',
  properties: {
    key: {type: 'int', default: 0},
    color: {type: 'string', default: '#ff0000'},
    content: {type: 'string', default: ''}
  },
};

export const LabelLinkSchema = {
    name: 'LabelLink',
    primaryKey: 'key',
    properties: {
        key: {type: 'int', default: 0},
        idLabel: 'int',
        isCheck: {type: 'bool', default: false},
        labelGroup: {type: 'linkingObjects', objectType: 'LabelGroup', property: 'links'},
    }
};

export const LabelGroupSchema = {
    name: 'LabelGroup',
    primaryKey: 'key',
    properties: {
        key: {type: 'int', default: 0},
        links: 'LabelLink[]',
    },
};



export default realm = new Realm({schema: [
        CardSchema, CardGroupSchema, BoardSchema,
        LabelSchema, LabelLinkSchema, LabelGroupSchema
    ], schemaVersion: 3});

/**
 *
 * @param {[]}collection
 * @param {string}primaryKeyName
 * @return {number} unique new id
 */
export const getNewId = (collection, primaryKey) => {
  let maxId = Math.max.apply(null, collection.map((item) => item[primaryKey]));
  maxId = maxId === undefined ? 1 : (maxId + 1);
  return maxId;
};