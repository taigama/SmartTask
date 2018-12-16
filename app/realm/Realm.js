const Realm = require('realm');

export class Board {
  cascadeDelete() {
    for (let i = this.cardGroups.length - 1; i >= 0; i--) {
      this.cardGroups[i].cascadeDelete();
    }
    realm.delete(this);
  }
}

Board.schema = {
  name: 'Board',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    archived: {type: 'bool', default: false},
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
  schemaVersion: 7, 
  migration: (oldRealm, newRealm) => {
    newRealm.deleteAll();
  }
});