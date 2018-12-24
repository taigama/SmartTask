import uuid from 'react-native-uuid';
import realm from './Realm';

export default class CheckItem {
  static create = (content?) => {
    content = content || 'Check item';
    return realm.create('Check', {
      id: uuid.v4(),
      content: content,
      isCheck: false,
    });
  }
}

CheckItem.schema = {
  name: 'Check',
  primaryKey: 'id',
  properties: {
    id: 'string',
    content: 'string',
    isCheck: { type: 'bool', default: false },
    card: { type: 'linkingObjects', objectType: 'Card', property: 'checkList' },
  },
};