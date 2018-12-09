import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default class CardList extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
   
  }

  componentWillUnmount() {

  }

  componentDidCatch(error, info) {
    logComponentStackToMyService(info.componentStack);
  }

  render() { 
    return (
      <Text>CardList</Text>
    );
  }
}