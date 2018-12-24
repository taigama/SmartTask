import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, ViewPropTypes, FlatList } from 'react-native';
import { Icon, Header, Left, Body, Right, Title, ListItem, Thumbnail, Item, Input, Content, List } from 'native-base';
import { SearchBar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import realm, { Board } from '../../Realm/Realm'
import { IData } from '../../_Commons/IData';
import { Window } from '../../_Commons/Utils';
import FormModal from '../../_Commons/FormModal';
import CardItem from '../Workspace/CardItem';
import ArchivedGroupItem from './ArchivedGroupItem';

export default class ArchivedGroupScreen extends Component<IData> {
  constructor(props) {
    super(props);
    this.state = {
      board: this.props.board,
      filterdGroups: this.props.board.cardGroups.filtered('archived = true'),
    }
    this.onChangeText = this.onChangeText.bind(this);
    this.unarchiveGroup = this.unarchiveGroup.bind(this);
    this.searchText = '';
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '9E9E9E'}}>
        {this.renderHeader()}
        <FlatList 
          // contentContainerStyle={{padding: 20}}
          keyExtractor={(item, index) => item.id}
          ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
          data={this.state.filterdGroups}
          renderItem={({item}) => <ArchivedGroupItem cardGroup={item} onClickUnarchive={this.unarchiveGroup} />}
        />
      </ScrollView>
    );
  }

  renderHeader() {
    return (
      <Header searchBar rounded>
        <TouchableOpacity style={styles.headerButton} onPress={() => { Actions.pop(); setTimeout(() => Actions.refresh(), 10) }}>
          <Icon name="arrow-back" type="MaterialIcons" style={{ color: 'white' }} />
        </TouchableOpacity>
        <Item>
          <Icon name="ios-search" />
          <Input onChangeText={this.onChangeText} placeholder="Search archived groups" />
        </Item>
      </Header>
    );
  }

  onChangeText(text) {
    this.searchText = text || '';
    if (text) {
      let filteredCards = this.state.filterdGroups.filtered('title CONTAINS[c] "' + text + '"');
      this.setState({filteredCards: filteredCards});  
    } else {
      this.setState({filteredCards: this.props.board.cardGroups.filtered('archived = true')});  
    }
  }

  unarchiveGroup(group) {
    if (group) {
      realm.write(() => {
        group.archived = false;
        this.setState({filteredCards: this.state.filteredCards});
      });
    }
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    flexDirection: "row",
  },
  headerButton: {
    width: 50,
    height: "100%", 
    justifyContent: "center"
  },
  searchBarContainer: {
    backgroundColor: "grey",
  }
});