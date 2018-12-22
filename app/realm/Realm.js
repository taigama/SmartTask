import uuid from 'react-native-uuid';
import { YellowBox } from 'react-native';
import Board from './Board';
import Card from './Card';
import Label from './Label';
import CardGroup from './CardGroup';
import CheckItem from './CheckItem';

YellowBox.ignoreWarnings(['Require cycle:']);
const Realm = require('realm');

export default realm = new Realm({
  schema: [Board, CardGroup, Card, Label, CheckItem], 
  schemaVersion: 11, 
  migration: (oldRealm, newRealm) => {
    newRealm.deleteAll();
  }
});