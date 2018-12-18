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
    return realm.create('Board', {
      id: uuid.v4(), 
      title: this.title,
      archived: false,
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


export default realm = new Realm({
  schema: [Board, CardGroup, Card], 
  schemaVersion: 8, 
  migration: (oldRealm, newRealm) => {
    newRealm.deleteAll();
  }
});