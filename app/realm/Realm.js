import uuid from 'react-native-uuid';
const Realm = require('realm');

export class Board {
  cascadeDelete() {
    for (let i = this.cardGroups.length - 1; i >= 0; i--) {
      this.cardGroups[i].cascadeDelete();
    }
    realm.delete(this);
  }

  deepClone() {
    let clone = this.clone();
    let groups = this.cardGroups.filtered('archived = false');
    for (let i = groups.length - 1; i >= 0; i--) {
      clone.cardGroups.push(groups[i].deepClone());
    }
    return clone;
  }

  clone() {
    return realm.create("Board", {
      id: uuid.v4(),
      title: this.title,
      archived: false
    });
  }
}

Board.schema = {
  name: 'Board',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    archived: {type: 'bool', default: false},
    bookmarked: {type: 'bool', default: false},
    cardGroups: 'CardGroup[]',
  }
};

export class CardGroup {
  cascadeDelete() {
    for (let i = this.cards.length - 1; i >= 0; i--) {
      this.cards[i].cascadeDelete();
    }
    realm.delete(this);
  }

  deepClone() {
    let clone = this.clone();
    let cards = this.cards.filtered('archived = false');
    for (let i = cards.length - 1; i >= 0; i--) {
      clone.cards.push(cards[i].deepClone());
    }
    return clone;
  }

  clone() {
    return realm.create('CardGroup', {
      id: uuid.v4(), 
      title: this.title,
      archived: false,
    });
  }
}

CardGroup.schema = {
  name: 'CardGroup',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string?',
    cards: 'Card[]',
    archived: {type: 'bool', default: false},
    board:  {type: 'linkingObjects', objectType: 'Board', property: 'cardGroups'}
  }
};


export class Card {
  cascadeDelete() {
    realm.delete(this);
  }

  deepClone() {
    return this.clone();
  }

  clone() {
    return realm.create('Card', {
      ...this,
      id: uuid.v4(),
      archived: false,
      cardGroup: null,
    });
  }
}

Card.schema = {
  name: 'Card',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string?',
    archived: {type: 'bool', default: false},
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


export default realm = new Realm({
  schema: [Board, CardGroup, Card, LabelSchema, LabelLinkSchema, LabelGroupSchema,
    DueTimeSchema, CheckSchema, CheckListSchema, ImageObjectSchema, TaskSchema], 
  schemaVersion: 9, 
  migration: (oldRealm, newRealm) => {
    newRealm.deleteAll();
  }
});

export const getNewId = (collection, primaryKey) => {
  let maxId = Math.max.apply(null, collection.map((item) => item[primaryKey]));
  maxId = maxId === undefined ? 1 : (maxId + 1);
  return maxId;
};