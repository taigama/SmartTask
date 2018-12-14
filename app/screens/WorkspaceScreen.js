import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Button, View, Dimensions, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Header, Left, Body, Right, Title, Icon } from 'native-base';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import Card from '../components/Card';
import Carousel from 'react-native-snap-carousel';
import CardGroup from '../components/CardGroup';
import { IData } from '../components/IData';
import { Window } from '../components/Utils';
import realm from '../realm/Realm'
import { Actions } from 'react-native-router-flux';
import uuid from 'react-native-uuid';

export default class WorkspaceScreen extends Component<IData> {
  constructor(props) {
    super(props);

    this.state = {
      board: null,
    };
  }

  componentDidMount() {
    realm.write(() => {
      let board = realm.objectForPrimaryKey('Board', this.props.boardId);
      this.setState({
        board: board
      });
    });
  }

  render() {
    if (this.state.board == null) {
      return null;
    } 

    return (
      <ImageBackground
        source={require('../resources/moon.jpg')}
        style={{width: '100%', height: '100%'}}>
        {this.createHeader()}
        <Carousel 
          layout={'default'}
          layoutCardOffset={Window.width}
          ref={(c) => { this._carousel = c; }}
          data={Object.values(this.state.board.cardGroups)}
          renderItem={(item) => <CardGroup data={item.item} />}
          sliderWidth={Window.width}
          itemWidth={Window.width}
        />
      </ImageBackground>
    );
  }

  createHeader() {
    return (
      <Header>
        <Left>
          <TouchableOpacity onPress={() => Actions.pop()} style={{marginLeft: 10}}>
            <Icon 
              name='keyboard-arrow-left'
              type="MaterialIcons"
              style={{fontSize: 25, color: 'white'}}
            /> 
          </TouchableOpacity>
        </Left>
        <Body>
          <Title>{this.state.board.title} {this.state.board.cardGroups.length}</Title>
        </Body>
        <Right>
          <TouchableOpacity onPress={() => this.addGroup()} style={{marginRight: 10}}>
            <Icon 
              name='add'
              style={{fontSize: 25, color: 'white'}}
            /> 
          </TouchableOpacity>
        </Right>
      </Header>
    );
  }

  addGroup(_title) {
    const title = _title || 'Unnamed group';
    realm.write(() => {
      let board = realm.objectForPrimaryKey('Board', this.props.boardId);
      let group = realm.create('CardGroup', {id: uuid.v4(), title: title, cards: []});
      board.cardGroups.push(group);
      this.setState({
        board: board,
      })
    })
  }
};