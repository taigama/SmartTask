import uuid from 'react-native-uuid';
import realm from './Realm';

export default class CardGroup {
  static create = (title?) => {
    title = title || 'New group';
    return realm.create('CardGroup', {
      id: uuid.v4(),
      title: title,
      archived: false,
      cards: [],
    });
  }

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