import React, {Component} from "react";
import {View, StyleSheet, Text, TouchableOpacity, TextInput, Alert} from "react-native";
import {Icon} from "react-native-elements";
import PropTypes from "prop-types";

import CheckLine from './CheckLine';
import FakeCheckLine from './FakeCheckLine';

import realm, {getNewId} from '../../../Realm/Realm';
import CheckItem from '../../../Realm/CheckItem';

const CHECK_LIST_MARGIN = 10;

export default class CheckList extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,// Check[]
  };

  /** @param {[]}props.data
   */
  constructor(props) {
    super(props);
    const {data} = this.props;

    this.state = {
      data: data
    };


    this.onAddNewLine = this.onAddNewLine.bind(this);
    this.onDeleteLine = this.onDeleteLine.bind(this);
  }

  renderChildren() {
    return (this.state.data).map(
      (checkLine) => <CheckLine
        key={checkLine.id}
        data={checkLine}
        deleteCallback={this.onDeleteLine}
      />
    );
  }

  render() {
    return (
      <View
        style={styles.wrap}
      >
        <View style={styles.headerSection}>
          <View style={styles.headerLeft}>
            <Icon
              name='check-box'
              color='#555'
              size={30}
            />
          </View>
          <Text style={styles.headerCenter}>Checklist</Text>
          <View style={[styles.headerRight, {width: 30, height: 30}]}/>
        </View>


        <View style={styles.childSection}>
          {this.renderChildren()}
          <FakeCheckLine callback={this.onAddNewLine}/>
        </View>
      </View>
    )
  }


  onAddNewLine(text) {
    var checkList = this.state.data;
    realm.write(() => {
      checkList.push(CheckItem.create(text));
    });
    this.forceUpdate();
  }

  onDeleteLine(checkLineData) {
    realm.write(() => {
      realm.delete(checkLineData);
    });

    this.forceUpdate();
  }
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    minHeight: 0,
    borderColor: '#555',
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  headerSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: CHECK_LIST_MARGIN,
    marginLeft: 0,
    marginRight: CHECK_LIST_MARGIN / 2.0,
    borderBottomWidth: 2,
    borderBottomColor: '#6df',
  },
  headerLeft: {
    marginLeft: CHECK_LIST_MARGIN,
    marginRight: CHECK_LIST_MARGIN,
    paddingBottom: 10,
  },
  headerRight: {
    marginLeft: CHECK_LIST_MARGIN / 2.0
  },
  headerCenter: {
    height: 30,
    justifyContent: 'center',
    flex: 1
  },
  childSection: {
    width: '100%',
    minHeight: 0,
  }
});