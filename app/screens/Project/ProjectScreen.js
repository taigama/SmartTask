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

import { showDialog, addBoard, updateBoards, deleteBoard } from './ProjectReducer';
import SideBar from '../Workspace/WorkspaceSideBar';
import { Window } from '../../_Commons/Utils';
import FormModal from '../../_Commons/FormModal';
import projectStyles from './ProjectStyle';

const defaultIcon = require('../../_Resources/chocobo.png');

class ProjectScreen extends Component {
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
            renderItem={({item}) => this.renderBoardItem(item)} 
          />
         {this.renderAddBoardDialog()}
         {this.renderFAB()}
        </View>
      </Drawer>
    );
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

  renderBoardItem(item) {
    return(
      <ListItem style={{ marginLeft: 0}} onPress={() => { Actions.workspace(item); }}>
        <Left>
          <Thumbnail square style={{marginLeft: 10}} source={defaultIcon} />
          <Body>
            <Text>{item.title}</Text>
            <Text>{item.cardGroups.length}</Text>
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
            <MenuItem onPress={() => this.props.deleteBoard(item.id)}>Rename board</MenuItem><MenuDivider />
            <MenuItem onPress={() => this.props.deleteBoard(item.id)}>Remove board</MenuItem><MenuDivider />
            <MenuItem onPress={() => this.props.deleteBoard(item.id)}>Star board</MenuItem><MenuDivider />
          </Menu>
        </Right>
      </ListItem>
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
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({
    showDialog: showDialog,
    updateBoards: updateBoards,
    addBoard: addBoard,
    deleteBoard: deleteBoard,
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