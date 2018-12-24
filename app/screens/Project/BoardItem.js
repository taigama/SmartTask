import React, { Component } from 'react';
import { Button, ButtonGroup, Avatar } from 'react-native-elements';
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
    this.alreadyClicked = false;
    this.requestAction = this.requestAction.bind(this);
    this.onPresss = this.onPresss.bind(this);
  }

  requestAction(actionType?: string) {
    this._menu.hide();
    this.props.handleAction(actionType, this.props.data);
   
  }

  onPresss() {
    if (!this.alreadyClicked) {
      this.alreadyClicked = true;
      this.props.onPress();
    }
  }

  componentDidUpdate() {
    this.alreadyClicked = false;
  }

  render() {
    const menuTitleBookmark = !this.props.data.bookmarked ? 'Bookmark' : 'Unbookmark';

    return (
      <ListItem noIndent onPress={this.onPresss}>
        <View style={{ width: 50, justifyContent: "center", marginLeft: 0, ...this.props.containerStyle }}>
          <Avatar width={40} height={40} square source={defaultIcon} style={{ textAlign: "center" }} />
        </View>
        <Text style={{ fontSize: 13 }}>{this.props.data.title}</Text>
        <Left>
        </Left>
        <Right>
          <Menu
            ref={ref => (this._menu = ref)}
            button={
              <TouchableOpacity onPress={() => this._menu.show()} >
                <Icon
                  name="dots-vertical"
                  type="MaterialCommunityIcons"
                  style={{ fontSize: 25, color: "grey" }}
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