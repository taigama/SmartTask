import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import Modal from 'react-native-modal';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Left, Right, Body, Icon } from 'native-base';

import { Window } from './Utils';
import { IData } from './IData';
import Card from './Card';
import realm from '../realm/Realm';
import FormModal from './FormModal';

class CardGroup extends React.Component<IData> {
  constructor(props) {
    super(props);
    this.state = {
      group: this.props.data,
      addDialogVisible: false,
      newCardTitle: "",
    };
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.group}>
          <View style={styles.groupHeader}>
            <Left>
              <Text style={{ padding: 5, fontSize: 20, fontWeight: "bold" }}>
                {this.state.group.title}
              </Text>
            </Left>
            <Right>
              <Menu
                ref={ref => (this._menu = ref)}
                button={
                  <TouchableOpacity
                    onPress={() => this._menu.show()}
                    style={{}}
                  >
                    <Icon
                      name="dots-vertical"
                      type="MaterialCommunityIcons"
                      style={{ fontSize: 25, color: "black" }}
                    />
                  </TouchableOpacity>
                }
              >
                <MenuItem onPress={() => this.archiveGroup()}>Move group</MenuItem>
                <MenuItem onPress={this.hideMenu}>Copy</MenuItem>
                <MenuItem onPress={() => this.archiveGroup()}>Archive group</MenuItem>
                <MenuItem onPress={this.hideMenu}>Move all cards</MenuItem>
                <MenuItem onPress={this.hideMenu}>Archive all cards</MenuItem>
              </Menu>
            </Right>
          </View>
          <View style={styles.groupContainer}>
            <FlatList
              ItemSeparatorComponent={() => (
                <View
                  style={{ justifyContent: "center", width: "100%", height: 4 }}
                />
              )}
              keyExtractor={(item, index) => item.id}
              data={this.state.group.cards.filtered('archived = false')}
              renderItem={({ item }) => <Card data={item} />}
            />
          </View>
          <View style={{ height: 50, justifyContent: "center" }}>
            <TouchableOpacity onPress={() => this.toggleAddCardDialog()}>
              <Text style={{ color: "#95A4AE", fontSize: 16 }}>
                + Add a card
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {this.renderAddCardDialog()}
      </View>
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
          onChangeText={text => (this.state.newCardTitle = text)}
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
          onPress={() => this.addCard(this.state.newCardTitle)}
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

  addCard(title = "New card") {
    title = title ? title : "New card";
    realm.write(() => {
      let card = realm.create("Card", { id: uuid.v4(), title: title });
      this.state.group.cards.push(card);
      this.toggleAddCardDialog();
    });
  }

  archiveGroup() {
    realm.write(() => {
      this.state.group.archived = true;
      this._menu.hide();
      this.setState({});
    });
  }

  toggleAddCardDialog() {
    this.setState({
      ...this.state,
      addDialogVisible: !this.state.addDialogVisible
    });
  }
}

export default CardGroup;

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
    paddingLeft: 15,
    paddingRight: 15,
  },
  groupHeader: {
    height: 60,
    flexDirection:'row',
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