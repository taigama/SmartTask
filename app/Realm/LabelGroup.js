import uuid from 'react-native-uuid';
import realm from './Realm';


import LabelLink from './LabelLink';

export default class LabelGroup {
  static create = () => {
    return realm.create('LabelGroup', {
      id: uuid.v4(),
      links: LabelLink.createLinks(),
    });
  }
}

LabelGroup.schema = {
  name: 'LabelGroup',
  primaryKey: 'id',
  properties: {
    id: 'string',
    links: 'LabelLink[]',
    card: { type: 'linkingObjects', objectType: 'Card', property: 'labelGroup' },
  },
};
