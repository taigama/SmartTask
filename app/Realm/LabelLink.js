import uuid from 'react-native-uuid';
import realm from './Realm';

import LabelItem from './LabelItem';

export default class LabelLink {
  static create = (label, isCheck) => {
    label = label.id;
    isCheck = isCheck || false;
    return realm.create('LabelLink', {
      id: uuid.v4(),
      labelId: label,
      isCheck: isCheck
    });
  };

  /** @return {[]} */
  static createLinks = () => {
    var links = [];
    var labels = realm.objects('Label');

    labels.forEach((label) => {
      links.push(LabelLink.create(label))
    });

    return links;
  };
}

LabelLink.schema = {
  name: 'LabelLink',
  primaryKey: 'id',
  properties: {
    id: 'string',
    labelId: 'string',
    isCheck: 'bool',
    labelGroup: { type: 'linkingObjects', objectType: 'LabelGroup', property: 'links' },
  },
};
