import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import { List, ListItem  } from 'react-native-elements';
import Card from '../components/Card';
import CardList from '../components/CardList';
import Carousel from 'react-native-snap-carousel';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

const window = Dimensions.get('window');

export default class WorkspaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: 1,
      page: 0,
      cards: [
        {
          name: 'A',
          age: 8
        },
        {
          name: 'B',
          age: 9
        },
        {
          name: 'B',
          age: 9
        },
        {
          name: 'B',
          age: 9
        },
        {
          name: 'B',
          age: 9
        },
        {
          name: 'B',
          age: 9
        }
      ]
    };

    // setInterval(() => {
    //   this.setState({
    //     seed: this.state.seed + 1
    //   });
    // }, 1000);
  }

  keyExtractor = item => item.name;

  componentDidMount() {
    this.setState({
      page: this.state.page + 1
    });
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
      <View>
        <View>{this.renderCardList(this.state.cards, 1)}</View>
        {/* <Text>HELLO</Text> */}
      </View>
     
      
    );
  }


  /**
   * @param cards
   * @param styleType : 1 for stack, else for default
   */
  renderCardList(cards, styleType?: number) {
    if (styleType === 1) {
      return (
        <Carousel 
          layout={'stack'}
          layoutCardOffset={window.width}
          ref={(c) => { this._carousel = c; }}
          data={cards}
          renderItem={(item) => this.renderCard(item)}
          sliderWidth={window.width}
          itemWidth={window.width * 0.85}
        />
      )
    } else {
      return (
        <Carousel 
          layout={'default'}
          ref={(c) => { this._carousel = c; }}
          data={cards}
          renderItem={(item) => this.renderCard(item)}
          sliderWidth={window.width}
          itemWidth={window.width * 0.85}
        />
      )
    };
  }

  renderCardList

  renderCard(card) {
    return(
      <View style={{justifyContent:"center", height: '100%'}}>
        <View style={{flex: 1, backgroundColor: 'blue', justifyContent:"center", marginTop: 25}}>
          <Text>HELLO</Text>
        </View>
      </View>
      
    )
  }
};