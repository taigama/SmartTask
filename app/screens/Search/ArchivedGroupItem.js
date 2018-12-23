import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, ViewPropTypes, FlatList } from 'react-native';
import { Icon, Header, Left, Body, Right, Title, ListItem, Thumbnail, Item, Input, Content, List } from 'native-base';
import { SearchBar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import PropType from 'prop-types';

import realm, { Board } from '../../Realm/Realm'
import { IData } from '../../_Commons/IData';
import { Window } from '../../_Commons/Utils';
import FormModal from '../../_Commons/FormModal';
import CardItem from '../Workspace/CardItem';

type ArchivedGroupItemProps = {
  cardGroup?: any,
  onClickUnarchive?: PropType.func,
}

export default class ArchivedGroupItem extends Component<ArchivedGroupItemProps> {
  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.group}>
          <View style={styles.groupHeader}>
            <Left>
              <Text style={{ padding: 5, fontSize: 15 }}>
                {this.props.cardGroup.title}
              </Text>
            </Left>
            <Right>
              <TouchableOpacity style={styles.buttonUnarchive} onPress={() => this.props.onClickUnarchive(this.props.cardGroup)}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}> U </Text>
              </TouchableOpacity>
            </Right>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    elevation: 10,
    // paddingTop: 20,
    // paddingBottom: 10,
    // paddingLeft: 20,
    // paddingRight: 20,
    // justifyContent:"center",
  },
  group: {
    backgroundColor: 'white',
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#000000',
    paddingLeft: 15,
    // paddingRight: 15,
  },
  groupHeader: {
    height: 60,
    flexDirection: 'row',
    fontWeight: 'bold',
    justifyContent: "center",
  },
  groupContainer: {
    maxHeight: Window.height - 240,
    width: '100%',
    justifyContent: "center"
  },
  buttonUnarchive: {
    backgroundColor: '#008542', 
    height: '100%', 
    width: 50, 
    justifyContent: "center", 
    alignItems: 'center'
  }
});