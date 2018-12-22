import uuid from 'react-native-uuid';
import realm from './Realm';

export default class Card {
  static create = (title?) => {
    title = title || 'New card';
    return realm.create('Card', {
      id: uuid.v4(),
      title: title,
      description: '',
      labels: [],
      checkList: [],
      dueDate: null,
      dueDateCheck: false,
      archived: false,
    });
  }
  
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
    description: 'string?',
    labels: 'Label[]',
    checkList: 'Check[]',
    dueDate: 'date?',
    dueDateCheck: {type: 'bool', default: false},
    archived: {type: 'bool', default: false},
    cardGroup: {type: 'linkingObjects', objectType: 'CardGroup', property: 'cards'},
  }
};