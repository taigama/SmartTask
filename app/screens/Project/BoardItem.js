import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import Modal from 'react-native-modal';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, ViewPropTypes } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Icon, Header, Left, Body, Right, Title, ListItem, Thumbnail } from 'native-base';
import PropTypes from 'prop-types';

import realm, { Board } from '../../Realm/Realm'
import { IData } from '../../_Commons/IData';
import { Window } from '../../_Commons/Utils';
import FormModal from '../../_Commons/FormModal';
import { ActionType } from './Constants';

const defaultIcon = require('../../_Resources/chocobo.png');

type BoardItemProps = {
  data?: any,
  containerStyle?: ViewPropTypes,
  handleAction?: PropTypes.func,
  onPress?: PropTypes.func,
}

class BoardItem extends React.Component<BoardItemProps> {
  constructor(props) {
    super(props);
    this.requestAction = this.requestAction.bind(this);
  }

  requestAction(actionType?: string) {
    this._menu.hide();
    this.props.handleAction(actionType, this.props.data);
  }

  render() {
    const menuTitleBookmark = !this.props.data.bookmarked ? 'Bookmark' : 'Unbookmark';

    return (
      <ListItem style={{ marginLeft: 0, ...this.props.containerStyle}} onPress={() => this.props.onPress()}>
        <Left>
          <Thumbnail square style={{marginLeft: 10}} source={defaultIcon} />
          <Body>
            <Text>{this.props.data.title}</Text>
            <Text>{this.props.data.cardGroups.length}</Text>
            <Text>{realm.objects('CardGroup').length}</Text>
          </Body>
        </Left>
        <Right>
          <Menu
            ref={ref => (this._menu = ref)}
            button={
              <TouchableOpacity onPress={() => this._menu.show()} >
                <Icon
                  name="dots-vertical"
                  type="MaterialCommunityIcons"
                  style={{ fontSize: 25, color: "black" }}
                />
              </TouchableOpacity>
            }>
            <MenuItem onPress={() => this.requestAction(ActionType.RENAME_BOARD)}>Rename board</MenuItem><MenuDivider />
            <MenuItem onPress={() => this.requestAction(ActionType.REMOVE_BOARD)}>Remove board</MenuItem><MenuDivider />
            <MenuItem onPress={() => this.requestAction(ActionType.TOGGLE_BOOKMARK_BOARD)}>{menuTitleBookmark}</MenuItem>
            <MenuItem onPress={() => this.requestAction(ActionType.REMOVE_BOARD)}>Archive board</MenuItem><MenuDivider />
          </Menu>
        </Right>
      </ListItem>
    )
  }
}

export default BoardItem;