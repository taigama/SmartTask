import uuid from 'react-native-uuid';
import realm from './Realm';
import LabelItem from './LabelItem';

export default class Config {
  static create = () => {

    // initialize
    let labels = [];
    let defaultLabelColors = ['red', 'green', 'blue', 'yellow', 'orange', 'grey' ];
    for (let i = 0; i < defaultLabelColors.length; i++) {
      labels.push(LabelItem.create('', defaultLabelColors[i]));
    }





    return realm.create('Config', {
      id: uuid.v4(),
    });
  };
}

Config.schema = {
  name: 'Config',
  primaryKey: 'id',
  properties: {
    id: 'string'
  }
};