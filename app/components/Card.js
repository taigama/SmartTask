import React, { Component } from "react";
import { View, Text } from "react-native";

export default class Card extends Component {
  render() {
    return (
      <View style={{backgroundColor: "green"}}>
        <Text style={{color: "white", fontWeight: "bold"}}>Hello</Text>
      </View>
    )
  }
}