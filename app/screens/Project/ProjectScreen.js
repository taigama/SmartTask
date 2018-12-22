import React, { Component } from 'react';
import { Platform, Image, StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Drawer, Icon, Header, Left, Body, Right, Title, ListItem, Thumbnail, Form, Item, Label, Input, List, Footer, FooterTab, Container, Content } from 'native-base';
import { Button, Tile, Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modal';
import uuid from 'react-native-uuid';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import { showDialog, addBoard, updateBoards, deleteBoard, bookmarkBoard, archiveBoard, removeBoard, renameBoard } from './ProjectReducer';
import SideBar from '../Workspace/WorkspaceSideBar';
import { Window } from '../../_Commons/Utils';
import FormModal from '../../_Commons/FormModal';
import BoardItem from './BoardItem';
import { ActionType, DialogType } from './Constants';
import { Board } from '../../Realm/Realm';
import { styles } from './ProjectStyle';

class ProjectScreen extends Component {
  constructor(props) {
    super(props);
    
    this.screenTitle = 'Boards',
    this.currentBoard = null;
    this.boards = realm.objects('Board');
    this.handleAction = this.handleAction.bind(this);
  }

  componentDidMount() {
  }

  render() {
    return (
      <Drawer
        type='displace'
        side="left"
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.drawer._root.close()} >
        <Container>
          {this.renderHeader()}
          <Content>
          <List>
            {this.renderBookmarked()}
            <ListItem itemDivider>
              <Text>ALL</Text>
            </ListItem>
            <List 
              dataArray={this.boards}
              renderRow={(item) => <BoardItem data={item} handleAction={this.handleAction} onPress={() => Actions.workspace(item)}/>}>
            </List>
          </List>
          </Content>
         {this.renderDialogAddBoard()}
         {this.renderDialogRenameBoard()}
         {this.renderFAB()}
        </Container>
      </Drawer>
    );
  }

  handleAction(actionType?: string, data?: any) {
    this.currentBoard = data; 

    actionType = actionType || ActionType.NOTHING;
    switch (actionType) {
      case ActionType.ADD_BOARD             : this.refs[DialogType.ADD_BOARD].show(); break;
      case ActionType.RENAME_BOARD          : this.refs[DialogType.RENAME_BOARD].show(); break;
      case ActionType.REMOVE_BOARD          : this.removeBoard(data); break;
      case ActionType.ARCHIVE_BOARD         : this.archiveBoard(data); break;
      case ActionType.TOGGLE_BOOKMARK_BOARD : this.bookmarkBoard(data); break;
      default: break;
    }
  }

  refresh() {
    this.setState({});
  }

  renderHeader() {
    return (
      <Header>
        <Left>
          <TouchableOpacity onPress={() => this.drawer._root.open()} style={{marginLeft: 10}}>
            <Icon 
              name='menu'
              style={{fontSize: 25, color: 'white'}}
            /> 
          </TouchableOpacity>
        </Left>
        <Body>
          <Title>{this.screenTitle}</Title>
        </Body>
        <Right>
          <TouchableOpacity onPress={() => Actions.search()} style={{marginRight: 10}}>
            <Icon 
              name='search'
              style={{fontSize: 25, color: 'white'}}
            /> 
          </TouchableOpacity>
        </Right>
      </Header>
    );
  }

  renderBookmarked() {
    let bookmarkedBoards = this.boards.filtered('bookmarked = true');
    if (bookmarkedBoards.length > 0) {
      return (
        <View>
          <ListItem itemDivider>
            <Text>BOOKMARKED</Text>
          </ListItem>
          <List
            dataArray={bookmarkedBoards}
            renderRow={(item) => <BoardItem data={item} handleAction={this.handleAction} onPress={() => Actions.workspace(item)} />}>
          </List>
        </View >
      );
    } else {
      return null;
    }
  }

  renderFAB() {
    return (
      <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.refs[DialogType.ADD_BOARD].show()}>
      </ActionButton>
    )
  }

  renderDialogAddBoard() { 
    return (
      <FormModal
        ref={DialogType.ADD_BOARD}
        isVisible={false}
        onBackdropPress={() => this.refs[DialogType.ADD_BOARD].hide()}
        onBackButtonPress={() => this.refs[DialogType.ADD_BOARD].hide()}
        onSwipe={() => this.refs[DialogType.ADD_BOARD].hide()}
        swipeDirection='left'
        title='Add a board...'>
        <TextInput
          autoFocus={true}
          multiline={true}
          style={styles.modalTextInput}
          placeholder="Enter a title for this board"
          onChangeText={(text) => this.boardTitle = text}
        />
        <Button
          title="ADD"
          fontWeight='bold'
          fontSize={20}
          raised
          buttonStyle={{
            backgroundColor: "#00BB27",
            width: '100%',
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5,
            margin: 0,
          }}
          onPress={() => {
            this.addBoard(this.boardTitle);
            this.refs[DialogType.ADD_BOARD].hide();
            this.boardTitle = '';
          }}
          containerViewStyle={{ width: '100%', marginLeft: 0, marginTop: 10, borderRadius: 5, }}
        />
      </FormModal>
    );
  }

  renderDialogRenameBoard() { 
    return (
      <FormModal
        ref={DialogType.RENAME_BOARD}
        isVisible={false}
        onBackdropPress={() => this.refs[DialogType.RENAME_BOARD].hide()}
        onBackButtonPress={() => this.refs[DialogType.RENAME_BOARD].hide()}
        onSwipe={() => this.refs[DialogType.RENAME_BOARD].hide()}
        swipeDirection='left'
        title='Rename'>
        <TextInput
          autoFocus={true}
          multiline={true}
          style={styles.modalTextInput}
          placeholder="Enter a title for this board"
          onChangeText={(text) => this.boardTitle = text}
        />
        <Button
          title="ADD"
          fontWeight='bold'
          fontSize={20}
          raised
          buttonStyle={{
            backgroundColor: "#00BB27",
            width: '100%',
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5,
            margin: 0,
          }}
          onPress={() => {
            this.renameBoard(this.currentBoard, this.boardTitle);
            this.refs[DialogType.RENAME_BOARD].hide();
            this.boardTitle = '';
          }}
          containerViewStyle={{ width: '100%', marginLeft: 0, marginTop: 10, borderRadius: 5, }}
        />
      </FormModal>
    );
  }

  addBoard(title?: string) {
    title = title ? title : 'New board';
    realm.write(() => {
      let board = realm.create('Board', { id: uuid.v4(), title: title });
      this.refresh();
    });
  
  }

  archiveBoard(board?: Board) {
    realm.write(() => {
      board.archived = true;
      this.refresh();
    });
  }

  renameBoard(board?: Board, title?: string) {
    if (title) {
      realm.write(() => {
        board.title = title;
        this.refresh();
      });
    }
  }

  removeBoard(board?: Board) {
    realm.write(() => {
      board.cascadeDelete();
      this.refresh();
    });
  
  }

  bookmarkBoard(board?: Board) {
    realm.write(() => {
      board.bookmarked = !board.bookmarked;
      this.refresh();
    });
  }
}

export default ProjectScreen;

