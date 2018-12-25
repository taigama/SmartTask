import React, { Component } from "react";
import { View, Text, StyleSheet, SliderBase, TouchableOpacity } from "react-native";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import PropType from 'prop-types';

import { Window } from '../../_Commons/Utils';
import { IData } from '../../_Commons/IData';
import { Badge } from "react-native-elements";
import { Icon } from "native-base";
import { Actions } from "react-native-router-flux";
import { ActionType } from './Constants';
import SubCardLabel from "./Label/SubCardLabel";
import SubDateTime from "./DateTime/SubDateTime";
import SubCheckList from "./CheckList/SubCheckList";

type CardItemProps = {
  data?: any,
  handleAction?: PropType.func,
  longPressActive?: boolean,
}

export default class CardItem extends Component<CardItemProps> {
  constructor(props) {
    super(props);
    this.state = {
      card: this.props.data,
    }
  }

  componentWillReceiveProps({data}) {
    this.setState({card: data});
  }

  requestMenuAction(actionType: string) {
    this._menu.hide();
    this.props.handleAction(actionType, this.state.card.cardGroup[0], this.state.card);
  }

  render() {
    let archiveCardStr = this.state.card.archived ? 'Unarchive card' : 'Archive card';
    return (
      <TouchableOpacity style={styles.container} onLongPress={() => this.onLongPress()} onPress={() => Actions.detail({
        data: this.state.card
      })} activeOpacity={0.8}>
        <Menu ref={ref => (this._menu = ref)} button={<View style={{ alignSelf: 'flex-end' }} />}>
          <MenuItem onPress={() => this.requestMenuAction(ActionType.MOVE_CARD)}>Move card</MenuItem><MenuDivider />
          <MenuItem onPress={() => this.requestMenuAction(ActionType.ARCHIVE_CARD)}>{archiveCardStr}</MenuItem><MenuDivider />
        </Menu>
        <View style={styles.labelContainer}>
          <SubCardLabel groupLabel={this.state.card.labelGroup}/>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.state.card.title}</Text>
        </View>
         <Space />
         <View style={styles.dueDateContainer}>
          {/*<View style={{ flexDirection: "row",  backgroundColor: '#FF7B7B', borderRadius: 10, justifyContent: 'center', height: 30, alignContent: "center", alignItems: 'center' }}>*/}
            {/*<Icon name="clock-alert" type="MaterialCommunityIcons" style={{ fontSize: 15, color: "white"}} />*/}
            {/*<Text style={{color: "white", fontWeight: "bold"}}>  DUE DATE</Text>*/}
          {/*</View>*/}
          <SubDateTime
          date={this.state.card.dueDate}
          isCheck={this.state.card.dueDateCheck}
          />
           <SubCheckList data={this.state.card.checkList}/>
        </View>
      </TouchableOpacity>
    );
  }

  onLongPress() {
    if (this.props.longPressActive) {
      this._menu.show();
    }
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
    minHeight: 0,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  title: {
    color: '#24292E',
    fontSize: 16,
  }
});


