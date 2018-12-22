import uuid from 'react-native-uuid';
const Realm = require('realm');

import Board from './Board';
import Card from './Card';
import Label from './Label';
import CardGroup from './CardGroup';
import CheckItem from './CheckItem';

export default realm = new Realm({
  schema: [Board, CardGroup, Card, Label, CheckItem], 
  schemaVersion: 10, 
  migration: (oldRealm, newRealm) => {
    newRealm.deleteAll();
  }
});