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

type SearchScreenProps = {
  placeholder?: string,
  source: any[],
  defaultValues?: any[],
  filteredField?: string,
  renderRow?: any,
}

export default class SearchScreenWS extends Component<SearchScreenProps> {
  constructor(props) {
    super(props);
    this.state = {
      filtered: this.props.defaultValues || [],
    }
    this.onChangeText = this.onChangeText.bind(this);
    this.renderRow = this.props.renderRow.bind(this);
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '9E9E9E'}}>
        {this.renderHeader()}
        <List 
          contentContainerStyle={{padding: 20}}
          renderSeparator={() => <View style={{height: 10}}></View>}
          dataArray={this.state.filtered}
          renderRow={this.renderRow}
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
          <Input onChangeText={this.onChangeText} placeholder={this.props.placeholder} />
        </Item>
      </Header>
    );
  }

  onChangeText(text) {
    if (text) {      
      let filtered = this.props.source.filtered(this.props.filteredField + ' CONTAINS[c] "' + text + '"');
      this.setState({filtered: filtered});  
    } else {
      this.setState({filtered: this.props.defaultValues || []});  
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