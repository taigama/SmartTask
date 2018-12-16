import React, { Component } from "react";
import { View, Text } from "react-native";
import { Window } from './Utils';
import { IData } from './IData';

export default class Card extends Component<IData> {
  
  constructor(props) {
    super(props);
    this.state = {
      card: this.props.data,
    }
  }

  render() {
    return (
      <View style={{minHeight: 50, backgroundColor: 'white', borderRadius: 5}}>
        <Text>{this.state.card.title}</Text>
      </View>
    )
  }
}

