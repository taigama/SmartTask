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

export const ImageObjectSchema = {
    name: 'ImageObject',
    primaryKey: 'id',
    properties: {
        id: {type: 'int', default: 0},
        width: {type: 'int', default: 100},
        height: {type: 'int', default: 100},
        uri: {type: 'string', default: ""},
        task: {type: 'linkingObjects', objectType: 'Task', property: 'images'},
    },
};

export const CheckSchema = {
    name: 'Check',
    primaryKey: 'id',
    properties: {
        id: {type: 'int', default: 0},
        isCheck: {type: 'bool', default: false},
        content: {type: 'string', default: ""},
        checkList: {type: 'linkingObjects', objectType: 'CheckList', property: 'checks'},
    },
};

export const CheckListSchema = {
    name: 'CheckList',
    primaryKey: 'id',
    properties: {
        id: {type: 'int', default: 0},
        title: {type: 'string', default: 'CheckList'},
        checks: 'Check[]',
        task: {type: 'linkingObjects', objectType: 'Task', property: 'checkList'},
    },
};


export const LabelSchema = {
  name: 'Label',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', default: 0},
    color: {type: 'string', default: '#ff0000'},
    content: {type: 'string', default: ''}
  },
};

export const LabelLinkSchema = {
    name: 'LabelLink',
    primaryKey: 'id',
    properties: {
        id: {type: 'int', default: 0},
        idLabel: 'int',
        isCheck: {type: 'bool', default: false},
        labelGroup: {type: 'linkingObjects', objectType: 'LabelGroup', property: 'links'},
    }
};

export const LabelGroupSchema = {
    name: 'LabelGroup',
    primaryKey: 'id',
    properties: {
        id: {type: 'int', default: 0},
        links: 'LabelLink[]',
        task: {type: 'linkingObjects', objectType: 'Task', property: 'labelGroup'},
    },
};


export const DueTimeSchema = {
    name: 'DueTime',
    primaryKey: 'id',
    properties: {
        id: {type: 'int', default: 0},
        time: {type: 'date', default: new Date()},
        isCheck: {type: 'bool', default: false},
        task: {type: 'linkingObjects', objectType: 'Task', property: 'dueTime'},
    },
};

export const TaskSchema = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
        id: {type: 'int', default: 0},
        title: {type: 'string', default: 'New task'},
        description: {type: 'string', default: ''},
        lastImageId: {type: 'int', default: 0},
        labelGroup: 'LabelGroup',
        dueTime: 'DueTime',
        checkList: 'CheckList',
        images: 'ImageObject[]'
    },
};

export default realm = new Realm({schema: [
        CardSchema, CardGroupSchema, BoardSchema,
        LabelSchema, LabelLinkSchema, LabelGroupSchema,
        DueTimeSchema, CheckSchema, CheckListSchema, CommentSchema, ImageObjectSchema, TaskSchema
    ], schemaVersion: 3});

/**
 *
 * @param {Realm.Collection}collection
 * @param {string}primaryKeyName
 * @return {number} unique new id
 */
export const getNewId = (collection, primaryKey) => {
  let maxId = Math.max.apply(null, collection.map((item) => item[primaryKey]));
  maxId = maxId === undefined ? 1 : (maxId + 1);
  return maxId;
};