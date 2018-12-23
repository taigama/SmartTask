import uuid from 'react-native-uuid';
import { YellowBox } from 'react-native';
import Board from './Board';
import Card from './Card';
import LabelItem from './LabelItem';
import CardGroup from './CardGroup';
import CheckItem from './CheckItem';
import LabelGroup from './LabelGroup';
import LabelLink from './LabelLink';
import Config from './Config';

YellowBox.ignoreWarnings(['Require cycle:']);
const Realm = require('realm');

export default realm = new Realm({
  schema: [Board, CardGroup, Card, LabelItem, LabelLink, LabelGroup, CheckItem, Config],
  schemaVersion: 11, 
  migration: (oldRealm, newRealm) => {
    newRealm.deleteAll();
  }
});