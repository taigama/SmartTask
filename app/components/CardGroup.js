import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export type CardGroupProps = {
  label?: string,
  content?: string
}

export default class CardGroup extends React.Component<CardGroupProps> {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return null;
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
      <Text>{this.props.label}</Text>
    );
  }
}