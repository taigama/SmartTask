import React, {Component} from 'react';
import {Button, ButtonGroup} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import Modal from 'react-native-modal';
import {Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, ViewPropTypes} from 'react-native';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {Left, Right, Body, Icon} from 'native-base';
import PropTypes from 'prop-types';

import realm from '../../Realm/Realm'
import {IData} from '../../_Commons/IData';
import {Window} from '../../_Commons/Utils';
import FormModal from '../../_Commons/FormModal';

import CardItem from './CardItem';
import {ActionType} from './Constants';

type CardGroupProps = {
  handleAction?: PropTypes.func,
}

class CardGroupItem extends React.Component<CardGroupProps, IData> {
  constructor(props) {
    super(props);
    this.state = {
      group: this.props.data,
    };

    this.requestMenuAction = this.requestMenuAction.bind(this);
  }

  requestMenuAction(actionType?: string) {
    this._menu.hide();
    this.props.handleAction(actionType, this.state.group);
  }

  componentWillReceiveProps({data}) {
    this.setState({group: data});
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.group}>
          <View style={styles.groupHeader}>
            <Left>
              <Text style={{padding: 5, fontSize: 20, fontWeight: "bold"}}>
                {this.state.group.title}
              </Text>
            </Left>
            <Right>
              <Menu
                ref={ref => (this._menu = ref)}
                button={
                  <TouchableOpacity onPress={() => this._menu.show()}>
                    <Icon
                      name="dots-vertical"
                      type="MaterialCommunityIcons"
                      style={{fontSize: 25, color: "black"}}
                    />
                  </TouchableOpacity>
                }>
                <MenuItem onPress={() => this.requestMenuAction(ActionType.RENAME_GROUP)}>Rename
                  group</MenuItem><MenuDivider/>
                <MenuItem onPress={() => this.requestMenuAction(ActionType.COPY_GROUP)}>Copy
                  group</MenuItem><MenuDivider/>
                <MenuItem onPress={() => this.requestMenuAction(ActionType.MOVE_GROUP)}>Move
                  group</MenuItem><MenuDivider/>
                <MenuItem onPress={() => this.requestMenuAction(ActionType.ARCHIVE_GROUP)}>Archive
                  group</MenuItem><MenuDivider/>
                <MenuItem onPress={() => this.requestMenuAction(ActionType.MOVE_ALL_CARDS)}>Move all
                  cards</MenuItem><MenuDivider/>
                <MenuItem onPress={() => this.requestMenuAction(ActionType.ARCHIVE_ALL_CARDS)}>Archive all
                  cards</MenuItem>
              </Menu>
            </Right>
          </View>
          <View style={styles.groupContainer}>
            <FlatList
              ItemSeparatorComponent={() => (
                <View
                  style={{justifyContent: "center", width: "100%", height: 8}}
                />
              )}
              keyExtractor={(item, index) => item.id}
              data={this.state.group.cards.filtered('archived = false')}
              renderItem={({item}) => <CardItem longPressActive data={item} handleAction={(action, group, card) =>
                this.props.handleAction(action, group, card)}/>}
            />
          </View>
          <View style={{height: 50, justifyContent: "center"}}>
            <TouchableOpacity onPress={() => this.requestMenuAction(ActionType.ADD_CARD)}>
              <Text style={{color: "#95A4AE", fontSize: 16}}>
                + Add a card
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default CardGroupItem;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    // justifyContent:"center",
  },
  group: {
    backgroundColor: '#DFE3E6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    paddingLeft: 15,
    paddingRight: 15,
  },
  groupHeader: {
    height: 60,
    flexDirection: 'row',
    fontWeight: 'bold',
    justifyContent: "center",
  },
  groupContainer: {
    maxHeight: Window.height - 240,
    width: '100%',
    justifyContent: "center"
  },
});