import React, { Component } from 'react';
import { List, ListItem, Header, Icon  } from 'react-native-elements';
import { Platform, StyleSheet, Text, Button, View, Dimensions, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import Card from '../components/Card';
import Carousel from 'react-native-snap-carousel';
import CardGroup from '../components/CardGroup';
import { IData } from '../components/IData';
import { Window } from '../components/Utils';

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
        <TouchableOpacity
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#fff">
          {/* <Image style={{width:35, height: 35}} source={require('../resources/back_icon.png')} /> */}
          <Icon name='arrow-bold-left' />
        </TouchableOpacity>
      ),
      headerRight: (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#fff"
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      board: [
        {
          label: 'Group 1',
          group: [
            {
              label: 'Card 1',
              content: 'This is content',
            },
            {
              label: 'Card 2',
              content: 'This is content',
            },
            {
              label: 'Card 3',
              content: 'This is content',
            }
          ]
        },
        {
          label: 'Group 2',
          group: [
            {
              label: 'Card 1',
              content: 'This is content',
            },
            {
              label: 'Card 2',
              content: 'This is content',
            },
            {
              label: 'Card 3',
              content: 'This is content',
            }
          ]
        },
        {
          label: 'Group 3',
          group: [
            {
              label: 'Card 1',
              content: 'This is content',
            },
            {
              label: 'Card 2',
              content: 'This is content',
            },
            {
              label: 'Card 3',
              content: 'This is content',
            }
          ]
        }
      ],
      testData: [{}, {}, {}]
    }
  }

  keyExtractor = item => item.name;

  componentDidMount() {
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
      <ImageBackground
        source={require('../resources/night_sky.jpg')}
        style={{width: '100%', height: '100%'}}>
        <Carousel 
          layout={'default'}
          layoutCardOffset={Window.width}
          ref={(c) => { this._carousel = c; }}
          data={this.state.board}
          renderItem={(item) => <CardGroup data={item.item}/>}
          sliderWidth={Window.width}
          itemWidth={Window.width}
        />
      </ImageBackground>
    );
  }
};