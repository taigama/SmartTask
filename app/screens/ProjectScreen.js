import React, { Component } from 'react';
import { Platform, Image, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Drawer, Icon, Header, Left, Body, Right, Title, ListItem, Thumbnail } from 'native-base';
import { Button, Tile, Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';

import { showDialog, addBoard, updateBoards, deleteBoard } from '../reducers/ProjectReducer';
import { updateBoard } from '../reducers/WorkspaceReducer';

import SideBar from './SideBar';

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
        {this.createHeader()}
        <View style={{flex:1, backgroundColor: 'white'}}>
          <FlatList
            ItemSeparatorComponent={() => <View style={{justifyContent:'center', width: '100%', backgroundColor: '#F6F8FA', height: 3}}/>}
            keyExtractor={(item, index) => item.id}
            data={this.props.boards}
            renderItem={({item}) => this.renderBoard(item)} 
          />
          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item buttonColor='#9b59b6' title="New board" onPress={() => this.props.addBoard()} >
              <Icon name='add' color='white'/>
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="Delete all" onPress={() => {this.deleteAll()}}>
              <Icon name='remove' color='white' />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="Popup" onPress={() => {this.props.showDialog(true)}}>
              <Icon name='ios-add' color='white' />
            </ActionButton.Item>
          </ActionButton>
        </View>
      </Drawer>
    );
  }

  createHeader() {
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
          <TouchableOpacity onPress={() => null} style={{marginRight: 10}}>
            <Icon 
              name='search'
              style={{fontSize: 25, color: 'white'}}
            /> 
          </TouchableOpacity>
        </Right>
      </Header>
    );
  }

  renderBoard(item) {
    return(
      <ListItem style={{ marginLeft: 0}} onPress={() => { this.props.updateBoard(item.id); Actions.workspace(); }}>
        <Left>
          <Thumbnail square style={{marginLeft: 10}} source={require('../resources/chocobo.png')} />
          <Body>
            <Text>{item.title}</Text>
            <Text>{item.cardGroups.length}</Text>
            <Text>{realm.objects('CardGroup').length}</Text>
          </Body>
        </Left>
        <Right>
          <TouchableOpacity onPress={() => alert(item.id)}>
            <Icon name="info-outline" type={"MaterialIcons"}></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.deleteBoard(item.id)}>
            <Icon name="trash"></Icon>
          </TouchableOpacity>
        </Right>
      </ListItem>
    );
  }

  deleteAll() {
    realm.write(() => {
      realm.deleteAll();
      this.setState({
        boards: realm.objects('Board'),
      })
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
    updateBoard: updateBoard,
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ProjectScreen);
