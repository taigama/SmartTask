import Modal from 'react-native-modal';
import React, { Component } from 'react';
import { Platform, Image, StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, ViewPropTypes } from 'react-native';
import { Icon, Header, Left, Body, Right, Title, ListItem, Thumbnail, Form, Item, Label, Input } from 'native-base';
import { Button } from 'react-native-elements';
import { Dialog } from 'react-native-simple-dialogs';
import PropTypes from 'prop-types';
import { Window } from './Utils'

type FormModalProps = {
  isVisible?:  PropTypes.bool,
  title?: PropTypes.string,
  onSwipe?: PropTypes.func,
  onBackdropPress?: PropTypes.func,
  swipeDirection?: PropTypes.string,
  containerStyle?: ViewPropTypes.style,
  contentStyle?: ViewPropTypes.style,
  titleStyle?: ViewPropTypes.style,
}

export default class FormModal extends Component<FormModalProps> {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.isVisible || false,
    }


    this.titleStyle = {...styles.modalHeadline, ...this.props.titleStyle};
    this.contentStyle = {...styles.modalContainer, ...this.props.contentStyle};
    this.containerStyle = {...styles.modal, ...this.props.modalContainer};
  }

  render() {
    return (
      <Modal
        isVisible={this.state.isVisible}
        onBackdropPress={this.props.onBackdropPress}
        onBackButtonPress={this.props.onBackButtonPress}
        onSwipe={this.props.onSwipe}
        swipeDirection={this.props.swipeDirection}>
        <View style={this.containerStyle}>
          {this._renderTitle()}
          <View style={this.contentStyle}>
           {this.props.children}
          </View>
        </View>
      </Modal>
    );
  }

  _renderTitle() {
    if (!this.props.title) {
      return null;
    }

    return (
      <View style={styles.modalHeader}>
        <Text style={this.titleStyle}>{this.props.title}</Text>
      </View>
    );
  }

  show() {
    this.setState({isVisible: true});
  }

  hide() {
    this.setState({isVisible: false});
  }
}

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


