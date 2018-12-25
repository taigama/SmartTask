import React, {Component} from "react";
import {View, StyleSheet, Text, TouchableOpacity, TextInput, Alert} from "react-native";
import {Icon} from "react-native-elements";
import PropTypes from "prop-types";


import realm, {getNewId} from '../../../Realm/Realm';

const CHECK_LIST_MARGIN = 10;

export default class SubCheckList extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,// Check[]
  };

  /** @param {[]}props.data
   */
  constructor(props) {
    super(props);
    const {data} = this.props;

    var list = data || [];

    var total = list.length;
    var current = 0;
    for (let i = 0; i < list.length; ++i) {
      if (list[i].isCheck)
        ++current;
    }

    this.state = {
      total: total,
      current: current
    };
  }

  componentWillReceiveProps({data}) {
    var list = data || [];

    var total = list.length;
    var current = 0;
    for (let i = 0; i < list.length; ++i) {
      if (list[i].isCheck)
        ++current;
    }

    this.setState({
      total: total,
      current: current
    });
  }

  refresh() {
    this.forceUpdate();
  }

  render() {
    return (
      <View style={styles.checkSection}>
        <Icon size={16} color='#555' name="check-circle" type="MaterialCommunityIcons" />
        <Text style={styles.text}> {this.state.current}/{this.state.total}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  checkSection: {
    padding: 6,
    flexDirection: 'row'
  },
  text: {
    color: '#555',
    fontSize: 14
  },
});