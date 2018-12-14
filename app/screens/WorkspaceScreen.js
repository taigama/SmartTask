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

export default class WorkspaceScreen extends Component<IData> {
  constructor(props) {
    super(props);
  
    this.board = this.props.board;
    if (this.board === undefined) {
      Actions.pop();
    }

    this.state = {
      cardGroups: this.board.cardGroups
    }
  }

  componentDidMount() {
    realm.write(() => {
      // let card = realm.create('Card', { title: 'Card X'});
      // this.board.cardGroups[0].push(card);
    });
  }

  render() { 
    return (
      <ImageBackground
        source={require('../resources/moon.jpg')}
        style={{width: '100%', height: '100%'}}>
        {this.createHeader()}
        <Carousel 
          layout={'default'}
          layoutCardOffset={Window.width}
          ref={(c) => { this._carousel = c; }}
          data={Object.values(this.state.cardGroups)}
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
          <Title>{this.props.board.title} {this.board.cardGroups[0].cards.length}</Title>
        </Body>
        <Right>
          <TouchableOpacity onPress={() => null} style={{marginRight: 10}}>
            <Icon 
              name='menu'
              style={{fontSize: 25, color: 'white'}}
            /> 
          </TouchableOpacity>
        </Right>
      </Header>
    );
  }r
};