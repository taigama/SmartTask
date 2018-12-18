import React, { Component } from "react";
import { View, Text } from "react-native";

import { Window } from '../../_Commons/Utils';
import { IData } from '../../_Commons/IData';

export default class CardItem extends Component<IData> {
  
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

