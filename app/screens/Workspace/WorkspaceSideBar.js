import React, { Component } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { Content, Container, List, ListItem, Icon, Left } from 'native-base';
import { Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import { ActionType } from './Constants';

type WorkspaceSideBarProps = {
  handleAction?: PropTypes.func,
  board?: any,
}

export default class WorkspaceSideBar extends Component<WorkspaceSideBarProps> {
  render() {
    let bookmarkedTitle = "Bookmark board";
    let bookmarkedColor = "grey";
    if (this.props.board && this.props.board.bookmarked) {
      bookmarkedTitle = "Unbookmark board";
      bookmarkedColor = "yellow";
    }
  
    return <Container style={{ backgroundColor: "#FFFFFF" }}>
      {/* <View style={{ width: '100%', height: 250 }}>
          <View style={{ flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: '#107DAC'}}>
              <Avatar rounded source={require('../../_Resources/download.jpg')} width={200} height={200} activeOpacity={0.7}></Avatar>
            </View>
          </View>
        </View> */}
      <List>
        <ListItem noIndent itemDivider style={{ backgroundColor: 'grey' }}>
          <View style={{ width: '100%', justifyContent: "center" }}>
            <Text style={{ textAlign: "left", fontSize: 15, fontWeight: 'bold', color: 'white' }}> THIS BOARD</Text>
          </View>
        </ListItem>
        <ListItem noIndent onPress={() => this.props.handleAction(ActionType.RENAME_BOARD)}>
          <View style={{ width: 40, justifyContent: "center" }}>
            <Icon name="text-format" type="MaterialIcons" style={{ textAlign: "center", fontSize: 20, color: "grey" }} />
          </View>
          <Text style={{ fontSize: 15 }}> Rename board</Text>
        </ListItem>
        <ListItem noIndent onPress={() => this.props.handleAction(ActionType.BOOKMARK_BOARD)}>
          <View style={{ width: 40, justifyContent: "center" }}>
            <Icon name="turned-in" type="MaterialIcons" style={{ textAlign: "center", fontSize: 20, color: bookmarkedColor }} />
          </View>
          <Text style={{ fontSize: 15 }}>{bookmarkedTitle}</Text>
        </ListItem>
        <ListItem noIndent onPress={() => this.props.handleAction(ActionType.SHOW_ARCHIVED_GROUPS)}>
          <View style={{ width: 40, justifyContent: "center" }}>
            <Icon name="view-week" type="MaterialIcons" style={{ textAlign: "center", fontSize: 20, color: "grey" }} />
          </View>
          <Text style={{ fontSize: 15 }}> Archived groups</Text>
        </ListItem>
        <ListItem noIndent onPress={() => this.props.handleAction(ActionType.SHOW_ARCHIVED_CARDS)}>
          <View style={{ width: 40, justifyContent: "center" }}>
            <Icon name="credit-card" type="MaterialIcons" style={{ textAlign: "center", fontSize: 20, color: "grey" }} />
          </View>
          <Text style={{ fontSize: 15 }}> Archived cards</Text>
        </ListItem>
        {/* <ListItem noIndent onPress={() => this.props.handleAction(ActionType.EDIT_LABELS)}>
          <View style={{ width: 40, justifyContent: "center" }}>
            <Icon name="label" type="MaterialIcons" style={{ textAlign: "center", fontSize: 20, color: "grey" }} />
          </View>
          <Text style={{ fontSize: 15 }}> Edit labels</Text>
        </ListItem> */}
      </List>
    </Container>;
  }
}
