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

export default class SearchScreen extends Component<IData> {
  constructor(props) {
    super(props);
    this.state = {
      filteredCards: [],
    }

    this.onChangeText = this.onChangeText.bind(this);
  }


  render() {
    return (
      <ScrollView style={{backgroundColor: '9E9E9E'}}>
        {this.renderHeader()}
        <List 
          contentContainerStyle={{padding: 20}}
          renderSeparator={() => <View style={{height: 10}}></View>}
          dataArray={this.state.filteredCards}
          renderRow={(item) => <CardItem data={item} />}
        />
      </ScrollView>
    );
  }

  renderHeader() {
    return (
      <Header searchBar rounded>
        <TouchableOpacity style={styles.headerButton} onPress={() => Actions.pop()}>
          <Icon name="arrow-back" type="MaterialIcons" style={{ color: 'white' }} />
        </TouchableOpacity>
        <Item>
          <Icon name="ios-search" />
          <Input onChangeText={this.onChangeText} placeholder="Search" />
        </Item>
      </Header>
    );
  }

  onChangeText(text) {
    if (text) {
      let filteredCards = realm.objects("Card").filtered('title CONTAINS[c] "' + text + '"');
      this.setState({filteredCards: filteredCards});  
    } else {
      this.setState({filteredCards: []});  
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