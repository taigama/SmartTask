import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const Realm = require('realm');

const PersonSchema = {
  name: 'Person',
  properties: {
    name: 'string'
  }
};

// schemaVersion defaults to 0
Realm.open({schema: [PersonSchema]});


export default class ProjectScreen extends Component {
  render() {
    return (
      <Text>This is ProjectScreen</Text>
    );
  }
}
