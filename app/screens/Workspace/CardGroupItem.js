import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import Modal from 'react-native-modal';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, ViewPropTypes } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Left, Right, Body, Icon } from 'native-base';
import PropTypes from 'prop-types';

import realm from '../../Realm/Realm'
import { IData } from '../../_Commons/IData';
import { Window } from '../../_Commons/Utils';
import FormModal from '../../_Commons/FormModal';

import CardItem from './CardItem';
import { ActionType } from './Constants';

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

  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.group}>
          <View style={styles.groupHeader}>
            <Left>
              <Text style={{ padding: 5, fontSize: 20, fontWeight: "bold" }}>
                {this.state.group.title} ({this.state.group.cards.length} / {realm.objects('Card').length}) 
              </Text>
            </Left>
            <Right>
              <Menu
                ref={ref => (this._menu = ref)}
                button={
                  <TouchableOpacity
                    onPress={() => this._menu.show()}
                  >
                    <Icon
                      name="dots-vertical"
                      type="MaterialCommunityIcons"
                      style={{ fontSize: 25, color: "black" }}
                    />
                  </TouchableOpacity>
                }
              >
                <MenuItem onPress={() => this.requestMenuAction(ActionType.RENAME_GROUP)}>Rename group</MenuItem><MenuDivider />
                <MenuItem onPress={() => this.requestMenuAction(ActionType.COPY_GROUP)}>Copy group</MenuItem><MenuDivider />
                <MenuItem onPress={() => this.requestMenuAction(ActionType.MOVE_GROUP)}>Move group</MenuItem><MenuDivider />
                <MenuItem onPress={() => this.requestMenuAction(ActionType.ARCHIVE_GROUP)}>Archive group</MenuItem><MenuDivider />
                <MenuItem onPress={() => this.requestMenuAction(ActionType.MOVE_ALL_CARDS)}>Move all cards</MenuItem><MenuDivider />
                <MenuItem onPress={() => this.requestMenuAction(ActionType.ARCHIVE_ALL_CARDS)}>Archive all cards</MenuItem>
              </Menu>
            </Right>
          </View>
          <View style={styles.groupContainer}>
            <FlatList
              ItemSeparatorComponent={() => (
                <View
                  style={{ justifyContent: "center", width: "100%", height: 4 }}
                />
              )}
              keyExtractor={(item, index) => item.id}
              data={this.state.group.cards.filtered('archived = false')}
              renderItem={({ item }) => <CardItem data={item} />}
            />
          </View>
          <View style={{ height: 50, justifyContent: "center" }}>
            <TouchableOpacity onPress={() => this.requestMenuAction(ActionType.ADD_CARD)}>
              <Text style={{ color: "#95A4AE", fontSize: 16 }}>
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
    backgroundColor:'#DFE3E6',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#000000',
    paddingLeft: 15,
    paddingRight: 15,
  },
  groupHeader: {
    height: 60,
    flexDirection:'row',
    fontWeight: 'bold',
    justifyContent: "center",
  },
  groupContainer: {
    maxHeight: Window.height - 240,
    width: '100%',
    justifyContent: "center"
  },
  modal: {
    backgroundColor:'#DFE3E6',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#000000',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  modalHeader: {
    height: 60,
    fontWeight: 'bold',
    justifyContent: "center",
    // backgroundColor: 'steelblue',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
  },
  modalHeadline: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 0,
  },
  modalContainer: {
    width: '100%',
    justifyContent: "center"
  },
  modalButtonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalTextInput: {
    textAlignVertical: 'top', 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 150, 
    backgroundColor: 'white', 
    padding: 10, 
    fontSize: 18
  },
  modalButton: {
    backgroundColor: 'green',
    width: '50%',
    height: 40
  }
});