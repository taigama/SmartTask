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

export default class ArchivedCardScreen extends Component {
  constructor(props) {
    super(props);
    this.defaultFilteredCards = realm.objects('Card').filtered('cardGroup.board.id = "' + this.props.board.id + '" AND archived = true');
    this.state = {
      board: this.props.board,
      filteredCards: this.defaultFilteredCards,
    }
    this.onChangeText = this.onChangeText.bind(this);
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '9E9E9E'}}>
        {this.renderHeader()}
        <FlatList 
          contentContainerStyle={{padding: 20}}
          keyExtractor={(item, index) => item.id}
          ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
          data={this.state.filteredCards}
          renderItem={({item}) => <CardItem data={item} />}
        />
      </ScrollView>
    );
  }

  renderHeader() {
    return (
      <Header searchBar rounded>
        <TouchableOpacity style={styles.headerButton} onPress={() => { Actions.pop(); setTimeout(() => Actions.refresh(), 10)}}>
          <Icon name="arrow-back" type="MaterialIcons" style={{ color: 'white' }} />
        </TouchableOpacity>
        <Item>
          <Icon name="ios-search" />
          <Input onChangeText={this.onChangeText} placeholder="Search archived cards" />
        </Item>
      </Header>
    );
  }

  onChangeText(text) {
    if (text) {
      let filteredCards = this.defaultFilteredCards.filtered('title CONTAINS[c] "' + text + '"');
      this.setState({filteredCards: filteredCards});  
    } else {
      this.setState({filteredCards: this.defaultFilteredCards});  
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