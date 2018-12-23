import React, { Component } from "react";
import { View, Text, StyleSheet, SliderBase, TouchableOpacity } from "react-native";

import { Window } from '../../_Commons/Utils';
import { IData } from '../../_Commons/IData';
import { Badge } from "react-native-elements";
import { Icon } from "native-base";
import { Actions } from "react-native-router-flux";

export default class CardItem extends Component<IData> {
  constructor(props) {
    super(props);
    this.state = {
      card: this.props.data,
    }
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => Actions.detail({
        data: this.state.card,
        deleteCallback: (task) => alert('this task is marked for deleted: ' + task.title)
      })}  activeOpacity={0.8}>
        <View style={styles.labelContainer}>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.state.card.title}</Text>
        </View>
        {/* <Space /> */}
        {/* <View style={styles.dueDateContainer}>
          <View style={{ flexDirection: "row",  backgroundColor: '#FF7B7B', borderRadius: 10, justifyContent: 'center', height: 30, alignContent: "center", alignItems: 'center' }}> 
            <Icon name="clock-alert" type="MaterialCommunityIcons" style={{ fontSize: 15, color: "white"}} />
            <Text style={{color: "white", fontWeight: "bold"}}>  DUE DATE</Text>
          </View>
        </View> */}
      </TouchableOpacity>
    );
  }
}

const Space = () => <View style={{ height: 10 }}></View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 50,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#BFBFBF',
    borderWidth: 0.5,
    padding: 10,
    elevation: 2,
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: "wrap",
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  dueDateContainer: {
    width: 100
  },
  title: {
    color: '#24292E',
    fontSize: 16,
  }
})


