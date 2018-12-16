import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity, Image, TextInput } from 'react-native';
import { Drawer, Header, Left, Body, Right, Title, Icon } from 'native-base';
import { Button } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Toast, {DURATION} from 'react-native-easy-toast';
import uuid from 'react-native-uuid';

import Card from '../components/Card';
import CardGroup from '../components/CardGroup';
import { IData } from '../components/IData';
import { Window } from '../components/Utils';
import FormModal from '../components/FormModal';
import realm from '../realm/Realm'
import WorkspaceSideBar from './WorkspaceSideBar';

import { showAddCardDialog, showAddGroupDialog, addGroup } from '../reducers/WorkspaceReducer';

// Fix drawer overlay black darken android
Drawer.defaultProps.styles.mainOverlay.elevation = 0;

class WorkspaceScreen extends Component<IData> {
  
  
  constructor(props) {
    super(props);
    this.state = {
      board: this.props.data,
      addGroupVisible: false,
      addCardVisible: false,
      currentGroup: null,
    }
  }

  render() {
    return (
      <Drawer
        type='overlay'
        side="right"
        ref={(ref) => { this.drawer = ref; }}
        content={<WorkspaceSideBar navigator={this.navigator} />}
        onClose={() => this.drawer._root.close()} >
        {this.renderHeader()}
        <ImageBackground
          source={require('../resources/moon.jpg')}
          style={{ width: '100%', height: '100%' }}>
          <Carousel
            keyExtractor={(item, index) => item.id}
            layout={'default'}
            layoutCardOffset={Window.width}
            ref={(c) => { this._carousel = c; }}
            data={this.getVisibleGroups()}
            renderItem={({ item }) => 
              <CardGroup 
                refresh={() => this.refresh()} 
                showToast={(text) => this.refs.toast.show(text)}
                toggleAddCardDialog={(text) => this.toggleAddCardDialog(text)}
                archiveAllCards={(group) => this.archiveAllCards(group)}
                archiveGroup={(group) => this.archiveGroup(group)}
                renameGroup={(group) => this.renameGroup(group)}
                copyGroup={(group) => this.copyGroup(group)}
                moveGroup={(group) => this.moveGroup(group)}
                moveAllCards={(group) => this.moveAllCards(group)}
                data={item} 
            />}
            sliderWidth={Window.width}
            itemWidth={Window.width}
          />
          <Toast ref="toast"/>
          {this.renderAddCardDialog()}
          {this.renderAddGroupdDialog()}
        </ImageBackground>
      </Drawer>
    );
  }

  getVisibleGroups() {
    let group = Object.values(this.state.board.cardGroups.filtered('archived = false'));
    this.visibleCount = group.length;
    return group;
  }

  renderHeader() {
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
          <Title>{this.state.board.title}</Title>
        </Body>
        <Right>
          <TouchableOpacity onPress={() => this.toggleAddGroupDialog()} style={{marginRight: 20}}>
            <Icon 
              name='add'
              style={{fontSize: 25, color: 'white'}}
            /> 
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.drawer._root.open()} style={{marginRight: 10}}>
            <Icon 
              name='menu'
              style={{fontSize: 25, color: 'white'}}
            /> 
          </TouchableOpacity>
        </Right>
      </Header>
    );
  }

  addGroup(title = 'New group') {
    title = title ? title : 'New group';
    realm.write(() => {
      let group = realm.create('CardGroup', { id: uuid.v4(), title: title, cards: [] });
      this.state.board.cardGroups.push(group);
      setTimeout(() => this._carousel.snapToItem(this.visibleCount + 1), 100);
      this.refresh();
    });
  }

  addCard(title = 'New card') {
    title = title ? title : "New card";
    realm.write(() => {
      let card = realm.create("Card", { id: uuid.v4(), title: title });
      this.state.currentGroup.cards.push(card);
      this.toggleAddCardDialog();
    });
  }

  toggleAddGroupDialog() {
    this.setState({
      addGroupVisible: !this.state.addGroupVisible
    });
  }

  toggleAddCardDialog(currentGroup = null) {
    this.setState({
      ...this.state,
      addDialogVisible: !this.state.addDialogVisible,
      currentGroup: currentGroup,
    });
  }

  renderAddGroupdDialog() {
    return (
      <FormModal 
        isVisible={this.state.addGroupVisible}
        onBackdropPress={() => this.toggleAddGroupDialog()}
        onBackButtonPress={() => this.toggleAddGroupDialog()}
        onSwipe={() => this.toggleAddGroupDialog()}
        swipeDirection='left'
        title='Add a group...'>
        <TextInput
          autoFocus={true}
          multiline={true}
          style={styles.modalTextInput}
          placeholder="Enter a title for this group"
          onChangeText={(text) => this.newGroupTitle = text}
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
            this.addGroup(this.newGroupTitle);
            this.toggleAddGroupDialog();
            this.newGroupTitle = '';
          }}
          containerViewStyle={{ width: '100%', marginLeft: 0, marginTop: 10, borderRadius: 5, }}
        />
      </FormModal>
    );
  }
  
  renderAddCardDialog() {
    return (
      <FormModal
        isVisible={this.state.addDialogVisible}
        onBackdropPress={() => this.toggleAddCardDialog()}
        onBackButtonPress={() => this.toggleAddCardDialog()}
        onSwipe={() => this.toggleAddCardDialog()}
        swipeDirection="left"
        title="Add a card..."
      >
        <TextInput
          autoFocus={true}
          multiline={true}
          style={styles.modalTextInput}
          placeholder="Enter a title for this card"
          onChangeText={text => (this.newCardTitle = text)}
        />
        <Button
          title="ADD"
          fontWeight="bold"
          fontSize={20}
          raised
          buttonStyle={{
            backgroundColor: "#00BB27",
            width: "100%",
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5,
            margin: 0
          }}
          onPress={() => this.addCard(this.newCardTitle)}
          containerViewStyle={{
            width: "100%",
            marginLeft: 0,
            marginTop: 10,
            borderRadius: 5
          }}
        />
      </FormModal>
    );
  }

  refresh() {
    this.setState({});
  }

  archiveGroup(group) {
    realm.write(() => {
      group.archived = true;
      this.refs.toast.show('Archive group ' + group.title);
      if (this._carousel.currentIndex !== 0 && this._carousel.currentIndex >= this.visibleCount - 1) {
        this._carousel.snapToPrev(true);
      }
      this.refresh();
    });
  }

  archiveAllCards(group) {
    
  }

  moveAllCards(group) {
    
  }

  copyGroup(group) {

  }

  moveGroup(group) {

  }

  renameGroup(group) {

  }
};

export default WorkspaceScreen;

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