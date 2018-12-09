import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Window } from './Utils';
import { IData } from './IData';
import Card from './Card';

export default class CardGroup extends React.Component<IData> {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    }
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
      <View style={styles.pageContainer}>
        <View style={styles.group}>
          <View style={styles.groupHeader}>
            <Text style={{padding: 5, fontSize: 20, fontWeight: "bold"}}>{this.state.data.label}</Text>
          </View>
          <View style={styles.groupContainer}>
            <View style={{height: 50, justifyContent: "center"}}>
              <Text style={{color: '#95A4AE', fontSize: 16}}>+ Add a card</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    // justifyContent:"center",
  },
  group: {
    backgroundColor:'#DFE3E6',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#000000',
    paddingLeft: '8.5%',
    paddingRight: '8.5%',
  },
  groupHeader: {
    height: 60,
    fontWeight: 'bold',
    justifyContent: "center",
  },
  groupContainer: {
    width: '100%',
    justifyContent: "center"
  },
});