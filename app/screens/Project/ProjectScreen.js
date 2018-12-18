import React, { Component } from 'react';
import { Platform, Image, StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Drawer, Icon, Header, Left, Body, Right, Title, ListItem, Thumbnail, Form, Item, Label, Input } from 'native-base';
import { Button, Tile, Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modal';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import { showDialog, addBoard, updateBoards, deleteBoard, bookmarkBoard, archiveBoard, removeBoard, renameBoard } from './ProjectReducer';
import SideBar from '../Workspace/WorkspaceSideBar';
import { Window } from '../../_Commons/Utils';
import FormModal from '../../_Commons/FormModal';
import projectStyles from './ProjectStyle';
import BoardItem from './BoardItem';
import { ActionType, DialogType } from './Constants';
import { Board } from '../../Realm/Realm';

class ProjectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBoard: null,
      dialogVisbie: {
        ADD_BOARD: false,
        RENAME_BOARD: false,
      }
    }

    this.handleAction = this.handleAction.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  componentDidMount() {
    this.props.updateBoards();
  }

  render() {
    return (
      <Drawer
        type='displace'
        side="left"
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.drawer._root.close()} >
        {this.renderHeader()}
        <View style={{flex:1, backgroundColor: 'white'}}>
          <FlatList
            ItemSeparatorComponent={() => <View style={{justifyContent:'center', width: '100%', backgroundColor: '#F6F8FA', height: 3}}/>}
            keyExtractor={(item, index) => item.id}
            data={this.props.boards}
            renderItem={({item}) => <BoardItem data={item} handleAction={this.handleAction} onPress={() => Actions.workspace(item)}/>} 
          />
         {this.renderAddBoardDialog()}
         {this.renderFAB()}
        </View>
      </Drawer>
    );
  }

  toggleDialog(dialogType?: string, currentBoard?: any) {
    let dialogVisbie = this.state.dialogVisbie;

    dialogType = dialogType || DialogType.NOTHING;
    switch (dialogType) {
      case DialogType.ADD_BOARD     : dialogVisbie.ADD_BOARD = !dialogVisbie.ADD_BOARD; break;
      case DialogType.RENAME_BOARD  : dialogVisbie.RENAME_BOARD = !dialogVisbie.RENAME_BOARD; break;
      default: break;
    }
    this.setState({
      dialogVisbie: dialogVisbie,
      currentBoard: currentBoard,
    })
  }

  handleAction(actionType?: string, data?: any) {
    actionType = actionType || ActionType.NOTHING;
    switch (actionType) {
      case ActionType.ADD_BOARD             : this.toggleDialog(DialogType.ADD_BOARD, data); break;
      case ActionType.RENAME_BOARD          : this.toggleDialog(DialogType.RENAME_BOARD, data); break;
      case ActionType.REMOVE_BOARD          : this.props.removeBoard(data); break;
      case ActionType.ARCHIVE_BOARD         : this.props.archiveBoard(data); break;
      case ActionType.TOGGLE_BOOKMARK_BOARD : this.props.bookmarkBoard(data); break;
      default: break;
    }
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
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
          <TouchableOpacity onPress={() => this.props.showDialog(true)} style={{marginRight: 10}}>
            <Icon 
              name='search'
              style={{fontSize: 25, color: 'white'}}
            /> 
          </TouchableOpacity>
        </Right>
      </Header>
    );
  }

  renderFAB() {
    return (
      <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.showDialog(true)}>
        {/* <ActionButton.Item buttonColor='#9b59b6' title="New board" onPress={() => this.props.addBoard()} >
              <Icon name='add' color='white'/>
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="Delete all" onPress={() => {this.deleteAll()}}>
              <Icon name='remove' color='white' />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="Popup" onPress={() => {this.props.showDialog(true)}}>
              <Icon name='ios-add' color='white' />
            </ActionButton.Item> */}
      </ActionButton>
    )
  }

  renderAddBoardDialog() {
    this.newBoardTitle = this.props.dialogVisible ? this.newBoardTitle : '';

    return (
      <FormModal
        isVisible={this.props.dialogVisible}
        onBackdropPress={() => this.props.showDialog(false)}
        onBackButtonPress={() => this.props.showDialog(false)}
        onSwipe={() => this.props.showDialog(false)}
        swipeDirection='left'
        title='Add a board...'>
        <TextInput
          autoFocus={true}
          multiline={true}
          style={styles.modalTextInput}
          placeholder="Enter a title for this board"
          onChangeText={(text) => this.newBoardTitle = text}
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
            this.props.addBoard(this.newBoardTitle)
            this.props.showDialog(false);
          }}
          containerViewStyle={{ width: '100%', marginLeft: 0, marginTop: 10, borderRadius: 5, }}
        />
      </FormModal>
    );
  }

  addBoard(boardName?: string) {

  }

  renameBoard(board?: Board, boardName?: string) {

  }

  removeBoard(board?: Board) {
    realm.write()
  }

  bookmarkBoard(board?: Board) {
    
  }

  deleteAll() {
    realm.write(() => {
      realm.deleteAll();
      this.setState({ boards: realm.objects("Board") });
    });
  }
}

function mapStateToProps(state){
  return{
    dialogVisible: state.project.dialogVisible,
    title: state.project.title,
    boards: state.project.boards,
    refresh: state.project.refresh,
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    showDialog: showDialog,
    updateBoards: updateBoards,
    addBoard: addBoard,
    removeBoard: removeBoard,
    bookmarkBoard: bookmarkBoard,
    renameBoard: renameBoard,
    archiveBoard: archiveBoard,
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ProjectScreen);

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
    paddingLeft: '8.5%',
    paddingRight: '8.5%',
  },
  groupHeader: {
    height: 60,
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