import React, { Component } from "react";
import { View, Text } from "react-native";
import { Window } from './Utils';
import { IData } from './IData';

export default class Card extends Component<IData> {
  render() {
    return (
      <View style={{backgroundColor: "green"}}>
        <Text style={{color: "white", fontWeight: "bold"}}>{this.props.content}</Text>
      </View>
    )
  }
}