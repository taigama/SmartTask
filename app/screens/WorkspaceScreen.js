import React, { Component } from 'react';
import { List, ListItem, Header, Icon  } from 'react-native-elements';
import { Platform, StyleSheet, Text, Button, View, Dimensions, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import Card from '../components/Card';
import Carousel from 'react-native-snap-carousel';
import CardGroup from '../components/CardGroup';
import { IData } from '../components/IData';
import { Window } from '../components/Utils';
import realm from '../realm/Realm'


import Helper from '../components/Helper'

export default class WorkspaceScreen extends Component<IData> {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Board's name",
      headerStyle: {
        backgroundColor: '#026AA7',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{marginLeft: 20}}>
          <Icon 
            name='keyboard-arrow-left'
            color='white'
            size={30}
          /> 
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('TaskDetail', {
          data: Helper.createTask(),
          deleteCallback: (task) => alert('this task is marked for deleted: ' + task.title)
        })} style={{marginRight: 20}}>
          <Icon 
            name='dehaze'
            color='white'
            size={30}
          /> 
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
  
    this.board = this.props.navigation.state.params.board;
    if (this.board === undefined) {
      this.props.navigation.goBack();
    }

    this.state = {
      cardGroups: this.board.cardGroups
    }
  }

  componentDidMount() {
    
  }

  render() { 
    return (
      <ImageBackground
        source={require('../resources/moon.jpg')}
        style={{width: '100%', height: '100%'}}>
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
};