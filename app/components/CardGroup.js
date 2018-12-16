import React, { Component } from 'react';
import { 
  Platform, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, 
  TextInput, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Window } from './Utils';
import { IData } from './IData';
import Card from './Card';
import { Button, ButtonGroup } from 'react-native-elements';
import realm from '../realm/Realm';
import { FlatList } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

class CardGroup extends React.Component<IData> {
  constructor(props) {
    super(props);
    this.state = {
      group: this.props.data,
      addDialogVisible: false,
    }
  }

  render() { 
    return (
      <View style={styles.pageContainer}>
        <View style={styles.group}>
          <View style={styles.groupHeader}>
            <Text style={{padding: 5, fontSize: 20, fontWeight: "bold"}}>{this.state.group.title}</Text>
          </View>
          <View style={styles.groupContainer}>
            <FlatList
              ItemSeparatorComponent={() => <View style={{justifyContent:'center', width: '100%', backgroundColor: '#F6F8FA', height: 4}}/>}
              keyExtractor={(item, index) => item.id}
              data={this.state.group.cards}
              renderItem={({item}) => <Card data={item}></Card>} 
            />
          </View>
          <View style={{height: 50, justifyContent: "center"}}>
            <TouchableOpacity onPress={() => this.toggleAddCardDialog()}>
              <Text style={{color: '#95A4AE', fontSize: 16}}>+ Add a card</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.viewAddCardDialog()}
      </View>
    );
  }

  addCard(title = 'New card') {
    realm.write(() => {
      let card = realm.create('Card', { id: uuid.v4(), title: title} );
      this.state.group.cards.push(card)
      this.toggleAddCardDialog();
    })
  }

  viewAddCardDialog() {
    let textInput = '';
    return (
      <Modal 
        isVisible={this.state.addDialogVisible}
        onBackdropPress={() => this.toggleAddCardDialog()}
        onBackButtonPress={() => this.toggleAddCardDialog()}
        onSwipe={() => this.toggleAddCardDialog()}
        swipeDirection='left'>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeadline}>Add a card..</Text>
          </View>
          <View style={styles.modalContainer}>
            <TextInput
              autoFocus={true}
              multiline={true}
              style={styles.modalTextInput}
              placeholder="Enter a title for this card"
              onChangeText={(text) => textInput = text}
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
              onPress={() => this.addCard(textInput)}
              containerViewStyle={{ width: '100%', marginLeft: 0, marginTop: 10, borderRadius: 5,}}
            />
          </View>
        </View>
      </Modal>
    );
  }

  refresh() {
    this.setState({});
  }

  toggleAddCardDialog() {
    this.setState({
      addDialogVisible: !this.state.addDialogVisible,
    })
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
    paddingLeft: '8.5%',
    paddingRight: '8.5%',
  },
  groupHeader: {
    height: 60,
    fontWeight: 'bold',
    justifyContent: "center",
  },
  groupContainer: {
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