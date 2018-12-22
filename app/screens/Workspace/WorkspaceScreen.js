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
import ActionButton from 'react-native-action-button';
import uuid from 'react-native-uuid';

import { IData } from '../../_Commons/IData';
import { Window } from '../../_Commons/Utils';
import FormModal from '../../_Commons/FormModal';
import Helper from '../../_Commons/Helper';
import CardItem from './CardItem';
import CardGroupItem from './CardGroupItem';
import WorkspaceSideBar from './WorkspaceSideBar';
import { showAddCardDialog, showAddGroupDialog, addGroup } from './WorkspaceReducer';
import { ActionType, DialogType } from './Constants';
import realm from '../../Realm/Realm';
import Card from '../../Realm/Card';
import CardGroup from '../../Realm/CardGroup';

// Fix drawer overlay black darken android
Drawer.defaultProps.styles.mainOverlay.elevation = 0;

const defaultBackground = require('../../_Resources/moon.jpg');

class WorkspaceScreen extends Component<IData> {
  constructor(props) {
    super(props);
    this.state = {
      board: this.props.data,
      currentGroup: null,
    }

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
              <CardGroupItem 
                handleAction={this.handleAction}
                data={item} 
            />}
            sliderWidth={Window.width}
            itemWidth={Window.width}
          />
        </ImageBackground>
        <Toast ref="toast"/>
        {this.renderAddCardDialog()}
        {this.renderAddGroupdDialog()}
        {this.renderMoveCardDialog()}
        {this.renderMoveGroupdDialog()}
        {this.renderRenameGroupdDialog()}
        {this.renderCopyGroupdDialog()}
        {this.renderFAB()}
      </Drawer>
    );
  }

  handleAction(actionType?: string, data?: any) {
    this.state.currentGroup = data;

    actionType = actionType || ActionType.NOTHING;
    switch (actionType) {
      case ActionType.ARCHIVE_GROUP     : this.archiveGroup(data); break;
      case ActionType.ARCHIVE_ALL_CARDS : this.archiveAllCards(data); break;
      case ActionType.COPY_GROUP        : this.refs[DialogType.COPY_GROUP].show(); break;
      case ActionType.MOVE_GROUP        : this.refs[DialogType.MOVE_GROUP].show(); break;
      case ActionType.RENAME_GROUP      : this.refs[DialogType.RENAME_GROUP].show(); break;
      case ActionType.MOVE_ALL_CARDS    : this.refs[DialogType.MOVE_CARD].show(); break;
      case ActionType.ADD_CARD          : this.refs[DialogType.ADD_CARD].show(); break;
      case ActionType.ADD_GROUP         : this.refs[DialogType.ADD_GROUP].show(); break;
      default: break;
    }
  }

  showToaster(message?: string) {
    this.refs.toast.show(message);
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
              name='arrow-back'
              type="MaterialIcons"
              style={{fontSize: 25, color: 'white'}}
            /> 
          </TouchableOpacity>
        </Left>
        <Body>
          <Title>{this.state.board.title}</Title>
        </Body>
        <Right>
          <TouchableOpacity onPress={() => this.testFunction()} style={{marginRight: 20}}>
            <Icon 
              name='alert-box'
              type='MaterialCommunityIcons'
              style={{fontSize: 25, color: 'white'}}
            /> 
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleAction(ActionType.ADD_GROUP)} style={{marginRight: 20}}>
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

  renderFAB() {
    return (
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item buttonColor='#3498db' title="Show info" onPress={() => 
            {
              realm.write(() => {
                let cards = realm.objects('Card');
                let message = '';
                for (let i = cards.length - 1; i >= 0; i--) {
                  message += cards[i].title + " : " + cards[i].cardGroup + "\n";
                }
                alert(message);
                this.refresh();
              });
            }
          }>
          <Icon name='remove' color='white' />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="Delete all cards" onPress={() => 
            {
              realm.write(() => {
                let cards = realm.objects('Card');
                for (let i = cards.length - 1; i >= 0; i--) {
                  realm.delete(cards[i]);
                }
                this.refresh();
              });
            }
          }>
          <Icon name='remove' color='white' />
        </ActionButton.Item>
      </ActionButton>
    )
  }

  renderAddGroupdDialog() {
    return (
      <FormModal 
        ref={DialogType.ADD_GROUP}
        isVisible={false}
        onBackdropPress={() => this.refs[DialogType.ADD_GROUP].hide()}
        onBackButtonPress={() => () => this.refs[DialogType.ADD_GROUP].hide()}
        onSwipe={() => this.refs[DialogType.ADD_GROUP].hide()}
        swipeDirection='left'
        title='Add a group...'>
        <TextInput
          autoFocus={true}
          multiline={true}
          style={styles.modalTextInput}
          placeholder="Enter a title for this group"
          onChangeText={(text) => this.inputText = text}
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
            this.addGroup(this.inputText);
            this.refs[DialogType.ADD_GROUP].hide();
            this.inputText = '';
          }}
          containerViewStyle={{ width: '100%', marginLeft: 0, marginTop: 10, borderRadius: 5, }}
        />
      </FormModal>
    );
  }

  renderCopyGroupdDialog() {
    return (
      <FormModal 
        ref={DialogType.COPY_GROUP}
        isVisible={false}
        onBackdropPress={() => this.refs[DialogType.COPY_GROUP].hide()}
        onBackButtonPress={() => () => this.refs[DialogType.COPY_GROUP].hide()}
        onSwipe={() => this.refs[DialogType.COPY_GROUP].hide()}
        swipeDirection='left'
        title='Copy as...'>
        <TextInput
          autoFocus={true}
          multiline={true}
          style={styles.modalTextInput}
          placeholder="Enter a title for this group"
          onChangeText={(text) => this.inputText = text}
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
            this.copyGroup(this.inputText);
            this.refs[DialogType.COPY_GROUP].hide();
            this.inputText = '';
          }}
          containerViewStyle={{ width: '100%', marginLeft: 0, marginTop: 10, borderRadius: 5, }}
        />
      </FormModal>
    );
  }

  renderMoveGroupdDialog() {
    return (
      <FormModal
        ref={DialogType.MOVE_GROUP}
        isVisible={false}
        titleStyle={{color: '#32383B'}}
        onBackdropPress={() => this.refs[DialogType.MOVE_GROUP].hide()}
        onBackButtonPress={() => this.refs[DialogType.MOVE_GROUP].hide()}
        onSwipe={() => this.refs[DialogType.MOVE_GROUP].hide()}
        swipeDirection='left'
        title='Move group...'>
        <View style={{ height: 50, width: '100%', borderRadius: 50, backgroundColor: 'white', paddingLeft: 20 }}>
          <Picker
            mode="dialog"
            selectedValue={this.state.selectedBoardValue}
            onValueChange={(itemValue, itemIndex) => this.setState({selectedBoardValue: itemValue})}>
            {realm.objects('Board').filtered('archived = false').map((board, i) => {
              return (
                <Picker.Item key={board.id} label={board.title} value={board.id} />
              );
            })}
          </Picker>
        </View>
        <Button
          title="MOVE"
          fontWeight='bold'
          fontSize={20}
          raised
          buttonStyle={{
            backgroundColor: "#6E60F9",
            width: '100%',
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5,
            margin: 0,
          }}
          onPress={() => {
            this.moveGroup(this.state.selectedBoardValue);
            this.refs[DialogType.MOVE_GROUP].hide();
            this.refresh();
          }}
          containerViewStyle={{ width: '100%', marginLeft: 0, marginTop: 10, borderRadius: 5, }}
        />
      </FormModal>
    );
  }

  renderRenameGroupdDialog() {
    return (
      <FormModal 
        ref={DialogType.RENAME_GROUP}
        isVisible={false}
        onBackdropPress={() => this.refs[DialogType.RENAME_GROUP].hide()}
        onBackButtonPress={() => this.refs[DialogType.RENAME_GROUP].hide()}
        onSwipe={() => this.refs[DialogType.RENAME_GROUP].hide()}
        swipeDirection='left'
        title='Rename group...'>
        <TextInput
          autoFocus={true}
          multiline={true}
          style={styles.modalTextInput}
          placeholder="Enter a title for this group"
          onChangeText={(text) => this.inputText = text}
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
            this.renameGroup(this.inputText);
            this.refs[DialogType.RENAME_GROUP].hide();
            this.inputText = '';
          }}
          containerViewStyle={{ width: '100%', marginLeft: 0, marginTop: 10, borderRadius: 5, }}
        />
      </FormModal>
    );
  }
  
  renderAddCardDialog() {
    return (
      <FormModal
        ref={DialogType.ADD_CARD}
        isVisible={false}
        onBackdropPress={() => this.refs[DialogType.ADD_CARD].hide()}
        onBackButtonPress={() => this.refs[DialogType.ADD_CARD].hide()}
        onSwipe={() => this.refs[DialogType.ADD_CARD].hide()}
        swipeDirection="left"
        title="Add a card..."
      >
        <TextInput
          autoFocus={true}
          multiline={true}
          style={styles.modalTextInput}
          placeholder="Enter a title for this card"
          onChangeText={text => (this.inputText = text)}
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
            this.addCard(this.inputText);
            this.refs[DialogType.ADD_CARD].hide();
            this.inputText = '';
          }}
        />
      </FormModal>
    );
  }

  renderMoveCardDialog() {
    return (
      <FormModal
        ref={DialogType.MOVE_CARD}
        isVisible={false}
        titleStyle={{color: '#32383B'}}
        onBackdropPress={() => this.refs[DialogType.MOVE_CARD].hide()}
        onBackButtonPress={() => this.refs[DialogType.MOVE_CARD].hide()}
        onSwipe={() => this.refs[DialogType.MOVE_CARD].hide()}
        swipeDirection='left'
        title='Move all cards...'>
        <View style={{ height: 50, width: '100%', borderRadius: 50, backgroundColor: 'white', paddingLeft: 20 }}>
          <Picker
            mode="dialog"
            selectedValue={this.state.selectedValue}
            onValueChange={(itemValue, itemIndex) => this.setState({selectedValue: itemValue})}>
            {this.state.board.cardGroups.filtered('archived = false').map((group, i) => {
              return (
                <Picker.Item key={group.id} label={group.title} value={group.id} />
              );
            })}
          </Picker>
        </View>
        <Button
          title="MOVE"
          fontWeight='bold'
          fontSize={20}
          raised
          buttonStyle={{
            backgroundColor: "#6E60F9",
            width: '100%',
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5,
            margin: 0,
          }}
          onPress={() => {
            this.moveAllCards(this.state.selectedValue);
            this.refs[DialogType.MOVE_CARD].hide();
            this.refresh();
          }}
          containerViewStyle={{ width: '100%', marginLeft: 0, marginTop: 10, borderRadius: 5, }}
        />
      </FormModal>
    );
  }

  addGroup(title?: string) {
    title = title || 'New group';
    realm.write(() => {
      this.state.board.cardGroups.push(CardGroup.create(title));
      setTimeout(() => this._carousel.snapToItem(this.visibleCount + 1), 100);
      this.refresh();
    });
  }

  addCard(title?: string) {
    realm.write(() => {
      this.state.currentGroup.cards.push(Card.create(title));
    });
  }

  renameGroup(title?: string) {
    title = title || 'New group';
    realm.write(() => {
      this.state.currentGroup.title = title;
      this.refresh();
    });
  }

  copyGroup(title?: string) {
    title = title || 'New group';
    realm.write(() => {
      let clone = this.state.currentGroup.deepClone();
      clone.title = title;
      this.state.board.cardGroups.push(clone);
      setTimeout(() => this._carousel.snapToItem(this.visibleCount + 1), 100);
      this.refresh();
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
      group.cards.map(card => {
        card.archived = true;
      });
      this.refresh();
    });
  }

  moveAllCards(desGroupId?: string) {
    let srcGroup = this.state.currentGroup;
    if (desGroupId && desGroupId !== srcGroup.id) {
      realm.write(() => {
        let desGroup = realm.objectForPrimaryKey('CardGroup', desGroupId);
        let movedCards = [];
        let length = srcGroup.cards.length;
        for (let i = 0; i < length; i++) {
          movedCards.unshift(srcGroup.cards.pop());
        }
        for (let i = 0; i < movedCards.length; i++) {
          desGroup.cards.push(movedCards[i]);
        }
        this.showToaster('Move all cards from [' + srcGroup.title + '] to [' + desGroup + ']')
      })
    } else {
      this.showToaster('Actions is not valid');
    };
  }
  
  moveGroup(desBoardId?: string) {
    let srcBoard = this.state.board;
    if (desBoardId && desBoardId !== srcBoard) {
      realm.write(() => {
        let desBoard = realm.objectForPrimaryKey('Board', desBoardId);
        let movedGroup = this.state.currentGroup;
        let index = srcBoard.cardGroups.indexOf(movedGroup);

        srcBoard.cardGroups.splice(index, 1);
        desBoard.cardGroups.push(movedGroup);

        if (this._carousel.currentIndex !== 0 && this._carousel.currentIndex >= this.visibleCount - 1) {
          this._carousel.snapToPrev(true);
        }
      });
    } else {
      this.showToaster('Actions is not valid');
    }
  }

  testFunction() {
    Actions.detail({
      data: Helper.createTask(),
      deleteCallback: (task) => alert('this task is marked for deleted: ' + task.title)
    });
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