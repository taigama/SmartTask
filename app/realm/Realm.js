const Realm = require('realm');

class Board {
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
    cardGroups: 'CardGroup[]',
  }
};

class CardGroup {
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
    board:  {type: 'linkingObjects', objectType: 'Board', property: 'cardGroups'}
  }
};


class Card {
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
    cardGroup: {type: 'linkingObjects', objectType: 'CardGroup', property: 'cards'},
  }
};


export default realm = new Realm({
  schema: [Board, CardGroup, Card], 
  schemaVersion: 6, 
  migration: (oldRealm, newRealm) => {
    newRealm.deleteAll();
  }
});