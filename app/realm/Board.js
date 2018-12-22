import uuid from 'react-native-uuid';
import realm from './Realm';
import Label from './Label';

export default class Board {
  static create = (title?) => {
    title = title || 'New board';
    
    let labels = [];
    let defaultLabelColors = ['red', 'green', 'blue', 'yellow', 'orange', 'grey' ];
    for (let i = 0; i < defaultLabelColors.length; i++) {
      labels.push(Label.create('', defaultLabelColors[i]));  
    }
    
    return realm.create('Board', {
      id: uuid.v4(),
      title: title,
      archived: false,
      bookmarked: false,
      cardGroups: [],
      labels: labels,
    });
  }

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
    labels: 'Label[]',
  }
};