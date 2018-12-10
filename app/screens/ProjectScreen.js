import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const Realm = require('realm');

const PersonSchema = {
  name: 'Person',
  properties: {
    name: 'string',
  }
};

const realm = new Realm({schema: [PersonSchema]});
let people = realm.objects('Person');

realm.write(() => {
  savedPerson = realm.create('Person', {
      name: 'Hal Incandenza',
      age: 17,
    })
  }
);


export default class ProjectScreen extends Component {
  constructor(props) {
    super(props);

    realm.beginTransaction();
    realm.deleteAll();
    realm.commitTransaction();
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <Text>{people.length}</Text>
    );
  }
}
