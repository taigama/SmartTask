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
        <View>{this.renderCardList(this.state.cards)}</View>
        {/* <Text>HELLO</Text> */}
      </View>
     
      
    );
  }

  renderCardList(cards) {
    // console.log(this.window.width);
    // return <FlatList horizontal={true} pagingEnabled={true}
    //   data={cards}
    //   keyExtractor={item => item.name}
    //   renderItem={({item}) => this.renderCard(item)}
    // />
    return (
      <Carousel 
        layout={'default'}
        ref={(c) => { this._carousel = c; }}
        data={cards}
        renderItem={(item) => this.renderCard(item)}
        sliderWidth={window.width}
        itemWidth={window.width}
      />
    );
  }

  renderCard(card) {
    return(
      <View style={{backgroundColor: 'blue', height: '100%'}}>
          <Text>HELLO</Text>
      </View>
    )
  }
};