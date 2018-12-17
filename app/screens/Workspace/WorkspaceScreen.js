import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity, Image, TextInput, Picker } from 'react-native';
import { Drawer, Header, Left, Body, Right, Title, Icon } from 'native-base';
import { Button } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Toast, {DURATION} from 'react-native-easy-toast';
import uuid from 'react-native-uuid';

import realm from '../../Realm/Realm'
import { IData } from '../../_Commons/IData';
import { Window } from '../../_Commons/Utils';
import FormModal from '../../_Commons/FormModal';

import Card from './Card';
import CardGroup from './CardGroup';
import WorkspaceSideBar from './WorkspaceSideBar';
import { showAddCardDialog, showAddGroupDialog, addGroup } from './WorkspaceReducer';
import { ActionType, DialogType } from './Constants';

// Fix drawer overlay black darken android
Drawer.defaultProps.styles.mainOverlay.elevation = 0;

const defaultBackground = require('../../_Resources/moon.jpg');

class WorkspaceScreen extends Component<IData> {
  constructor(props) {
    super(props);
    this.state = {
      board: this.props.data,
      currentGroup: null,
      dialogVisbie: {
        addCard: false,
        moveCard: false,
        addGroup: false,
        moveGroup: false,
        renameGroup: false,
        moveGroup: false,
        copyGroup: false,
      },
    }

    this.toggleDialog = this.toggleDialog.bind(this);
    this.handleAction = this.handleAction.bind(this);
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
          source={defaultBackground}
          style={{ width: '100%', height: '100%' }}>
          <Carousel
            keyExtractor={(item, index) => item.id}
            layout={'default'}
            layoutCardOffset={Window.width}
            ref={(c) => { this._carousel = c; }}
            data={this.getVisibleGroups()}
            renderItem={({ item }) => 
              <CardGroup 
                handleAction={this.handleAction}
                data={item} 
            />}
            sliderWidth={Window.width}
            itemWidth={Window.width}
          />
          <Toast ref="toast"/>
          {this.renderAddCardDialog()}
          {this.renderAddGroupdDialog()}
          {this.renderMoveCardDialog()}
          {this.renderMoveGroupdDialog()}
          {this.renderRenameGroupdDialog()}
          {this.renderCopyGroupdDialog()}
        </ImageBackground>
      </Drawer>
    );
  }

  toggleDialog(dialogType?: string, currentGroup?: any) {
    let dialogVisbie = this.state.dialogVisbie ;

    dialogType = dialogType || DialogType.NOTHING;
    switch (dialogType) {
      case DialogType.ADD_CARD      : dialogVisbie.addCard = !dialogVisbie.addCard; break;
      case DialogType.ADD_GROUP     : dialogVisbie.addGroup = !dialogVisbie.addGroup; break;
      case DialogType.MOVE_CARD     : dialogVisbie.moveCard = !dialogVisbie.moveCard; break;
      case DialogType.MOVE_GROUP    : dialogVisbie.moveGroup = !dialogVisbie.moveGroup; break;
      case DialogType.RENAME_GROUP  : dialogVisbie.renameGroup = !dialogVisbie.renameGroup; break;
      case DialogType.COPY_GROUP    : dialogVisbie.copyGroup = !dialogVisbie.copyGroup; break;
      default: break;
    }
    this.setState({
      dialogVisbie: dialogVisbie,
      currentGroup: currentGroup,
    })
  }

  handleAction(actionType?: string, data?: any) {
    actionType = actionType || ActionType.NOTHING;
    switch (actionType) {
      case ActionType.ARCHIVE_GROUP     : this.archiveGroup(data); break;
      case ActionType.ARCHIVE_ALL_CARDS : this.archiveAllCards(data); break;
      case ActionType.COPY_GROUP        : this.toggleDialog(DialogType.COPY_GROUP, data); break;
      case ActionType.MOVE_GROUP        : this.toggleDialog(DialogType.MOVE_GROUP, data); break;
      case ActionType.RENAME_GROUP      : this.toggleDialog(DialogType.RENAME_GROUP, data); break;
      case ActionType.MOVE_ALL_CARDS    : this.toggleDialog(DialogType.MOVE_CARD, data); break;
      case ActionType.ADD_CARD          : this.toggleDialog(DialogType.ADD_CARD, data); break;
      default: break;
    }
  }

  refresh() {
    this.setState({});
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
          <TouchableOpacity onPress={() => this.toggleDialog(DialogType.ADD_GROUP)} style={{marginRight: 20}}>
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

  renderAddGroupdDialog() {
    const visible = this.state.dialogVisbie.addGroup;
    const toggleDialog = () => this.toggleDialog(DialogType.ADD_GROUP);
    return (
      <FormModal 
        isVisible={visible}
        onBackdropPress={() => toggleDialog()}
        onBackButtonPress={() => () => toggleDialog()}
        onSwipe={() => toggleDialog()}
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
            toggleDialog()
            this.newGroupTitle = '';
          }}
          containerViewStyle={{ width: '100%', marginLeft: 0, marginTop: 10, borderRadius: 5, }}
        />
      </FormModal>
    );
  }

  renderCopyGroupdDialog() {
    const visible = this.state.dialogVisbie.copyGroup;
    const toggleDialog = () => this.toggleDialog(DialogType.COPY_GROUP);
    return (
      <FormModal 
        isVisible={visible}
        onBackdropPress={() => toggleDialog()}
        onBackButtonPress={() => () => toggleDialog()}
        onSwipe={() => toggleDialog()}
        swipeDirection='left'
        title='Copy as...'>
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
            this.copyGroup(this.newGroupTitle);
            toggleDialog()
            this.newGroupTitle = '';
          }}
          containerViewStyle={{ width: '100%', marginLeft: 0, marginTop: 10, borderRadius: 5, }}
        />
      </FormModal>
    );
  }

  renderMoveGroupdDialog() {
    const visible = this.state.dialogVisbie.moveGroup;
    const toggleDialog = () => this.toggleDialog(DialogType.MOVE_GROUP);
    return (
      <FormModal 
        isVisible={visible}
        onBackdropPress={() => toggleDialog()}
        onBackButtonPress={() => () => toggleDialog()}
        onSwipe={() => toggleDialog()}
        swipeDirection='left'
        title='Move a group...'>
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
            toggleDialog()
            this.newGroupTitle = '';
          }}
          containerViewStyle={{ width: '100%', marginLeft: 0, marginTop: 10, borderRadius: 5, }}
        />
      </FormModal>
    );
  }

  renderRenameGroupdDialog() {
    const visible = this.state.dialogVisbie.renameGroup;
    const toggleDialog = () => this.toggleDialog(DialogType.RENAME_GROUP);
    return (
      <FormModal 
        isVisible={visible}
        onBackdropPress={() => toggleDialog()}
        onBackButtonPress={() => () => toggleDialog()}
        onSwipe={() => toggleDialog()}
        swipeDirection='left'
        title='Rename group...'>
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
            this.renameGroup(this.newGroupTitle);
            toggleDialog()
            this.newGroupTitle = '';
          }}
          containerViewStyle={{ width: '100%', marginLeft: 0, marginTop: 10, borderRadius: 5, }}
        />
      </FormModal>
    );
  }
  
  renderAddCardDialog() {
    const visible = this.state.dialogVisbie.addCard;
    const toggleDialog = () => this.toggleDialog(DialogType.ADD_CARD);
    return (
      <FormModal
        isVisible={visible}
        onBackdropPress={() => toggleDialog()}
        onBackButtonPress={() => toggleDialog()}
        onSwipe={() => toggleDialog()}
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
          containerViewStyle={{
            width: "100%",
            marginLeft: 0,
            marginTop: 10,
            borderRadius: 5
          }}
          onPress={() => {
            this.addCard(this.newCardTitle);
            toggleDialog()
            this.newCardTitle = '';
          }}
        />
      </FormModal>
    );
  }

  renderMoveCardDialog() {
    const visible = this.state.dialogVisbie.moveCard;
    const toggleDialog = () => this.toggleDialog(DialogType.MOVE_CARD);
    return (
      <FormModal
        isVisible={visible}
        onBackdropPress={() => toggleDialog()}
        onBackButtonPress={() => toggleDialog()}
        onSwipe={() => toggleDialog()}
        swipeDirection='left'
        title='Move all cards...'>
        <Picker
          mode="dialog"
          // selectedValue={}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => alert(itemValue)}>
          {this.state.board.cardGroups.filtered('archived = false').map((group, i) => {
            return (
              <Picker.Item key={group.id} label={group.title} value={i} />
            );
          })}
        </Picker>
      </FormModal>
    );
  }

  addGroup(title?: string) {
    title = title ||  'New group';
    realm.write(() => {
      let group = realm.create('CardGroup', { id: uuid.v4(), title: title, cards: [] });
      this.state.board.cardGroups.push(group);
      setTimeout(() => this._carousel.snapToItem(this.visibleCount + 1), 100);
      this.refresh();
    });
  }

  addCard(title?: string) {
    title = title || "New card";
    realm.write(() => {
      let card = realm.create("Card", { id: uuid.v4(), title: title });
      this.state.currentGroup.cards.push(card);
    });
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
    realm.write(() => {
      group.cards.map((card) => {
        card.archived = true;
      })
      this.refresh();
    });
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