import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Button, View, Dimensions, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Header, Left, Body, Right, Title, Icon } from 'native-base';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Card from '../components/Card';
import Carousel from 'react-native-snap-carousel';
import CardGroup from '../components/CardGroup';
import { IData } from '../components/IData';
import { Window } from '../components/Utils';
import realm from '../realm/Realm'
import uuid from 'react-native-uuid';

import { showAddCardDialog, showAddGroupDialog, updateBoard, addGroup } from '../reducers/WorkspaceReducer';

class WorkspaceScreen extends Component<IData> {

  componentDidMount() {
    
  }

  render() {
    return (
      <ImageBackground
        source={require('../resources/moon.jpg')}
        style={{width: '100%', height: '100%'}}>
        {this.createHeader()}
        <Carousel 
          layout={'default'}
          layoutCardOffset={Window.width}
          ref={(c) => { this._carousel = c; }}
          data={Object.values(this.props.board.cardGroups)}
          renderItem={({item}) => <CardGroup data={item} />}
          sliderWidth={Window.width}
          itemWidth={Window.width}
        />
      </ImageBackground>
    );
  }

  componentDidUpdate() {
   
  }

  createHeader() {
    return (
      <Header>
        <Left>
          <TouchableOpacity onPress={() => { Actions.pop(); setTimeout(() => Actions.refresh(), 10)}} style={{marginLeft: 10}}>
            <Icon 
              name='keyboard-arrow-left'
              type="MaterialIcons"
              style={{fontSize: 25, color: 'white'}}
            /> 
          </TouchableOpacity>
        </Left>
        <Body>
          <Title>{this.props.board.title}</Title>
        </Body>
        <Right>
          <TouchableOpacity onPress={() => this.props.addGroup(this.props.board)} style={{marginRight: 10}}>
            <Icon 
              name='add'
              style={{fontSize: 25, color: 'white'}}
            /> 
          </TouchableOpacity>
        </Right>
      </Header>
    );
  }
};

function mapStateToProps(state){
  return{
    board: state.workspace.board,
    addCardVisible: state.workspace.addCardVisible,
    addGroupVisible: state.workspace.addGroupVisible,
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({
    showAddCardDialog: showAddCardDialog,
    showAddGroupDialog: showAddGroupDialog,
    updateBoard: updateBoard,
    addGroup: addGroup,
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(WorkspaceScreen);