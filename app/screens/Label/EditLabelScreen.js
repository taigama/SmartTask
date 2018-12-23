import React, {Component} from 'react';
import {
  TextInput,
  Animated,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  ScrollView
} from 'react-native';
import {DialogComponent, SlideAnimation, DialogTitle, DialogContent} from 'react-native-dialog-component';
import ActionButton from "react-native-action-button";
import {Icon} from 'react-native-elements';


import {Body, Drawer, Header, Left, Right, Title} from "native-base";
import {Actions} from "react-native-router-flux";


import LabelEditable from "../Detail/Label/LabelEditable";
import CardEditLabel from "../Detail/Label/CardEditLabel";

import realm from '../../Realm/Realm';
import LabelItem from '../../Realm/LabelItem';
import LabelLink from '../../Realm/LabelLink';

export default class EditLabelScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      group: this.props.data,
    };

    this.onClickEditLabel = this.onClickEditLabel.bind(this);
    this.onClickAddLabel = this.onClickAddLabel.bind(this);
    this.onEndEditLabel = this.onEndEditLabel.bind(this);

    this.isEdit = false;
  }

  renderHeader() {
    return (
      <Header>
        <Left>
          <TouchableOpacity onPress={() => {
            Actions.pop();
            setTimeout(() => {
              Actions.refresh();
              this.props.onBack();
            }, 10)
          }} style={{marginLeft: 10}}>
            <Icon
              name='arrow-back'
              type="MaterialIcons"
              style={{fontSize: 25, color: 'white'}}
              color='#fff'
            />
          </TouchableOpacity>
        </Left>
        <Body>
        <Title>Edit Labels...</Title>
        </Body>
        <Right>

        </Right>
      </Header>
    );
  }

  renderDialog() {
    return <DialogComponent ref={dialogComponent => {
      this.dialog = dialogComponent;
    }} dialogAnimation={new SlideAnimation({
      slideFrom: "bottom"
    })} width={1} height={1}>
      <CardEditLabel editComplete={this.onEndEditLabel} ref={cardEdit => {
        this.cardEdit = cardEdit;
      }}/>
    </DialogComponent>
  }

  render() {
    return <View style={{flex: 1}}>
      {this.renderHeader()}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {this.state.group.links.map(link => (
          <LabelEditable
            key={link.labelId}
            data={link}
            editCallback={this.onClickEditLabel}
          />
        ))}
      </ScrollView>

      <ActionButton renderIcon={() => <Icon size={54} name="add-circle" color="#d0d"/>} buttonColor="#fff"
                    onPress={this.onClickAddLabel}/>

      {this.renderDialog()}
    </View>;
  }

  onClickEditLabel(labelComponent, labelData) {

    this.isEdit = true;

    this.currentLabel = {
      component: labelComponent,
      data: labelData
    };

    this.dialog.show();

    setTimeout(() => {
      this.cardEdit.preEdit(labelData.title, labelData.color);
    }, 16);
  }

  onClickAddLabel() {
    this.isEdit = false;
    this.currentLabel = null;

    this.dialog.show();

    setTimeout(() => {
      this.cardEdit.preEdit();
    }, 16);
  }

  /**
   *
   * @param {string|boolean}textOrDelete
   * @param {string}color
   */
  onEndEditLabel(textOrDelete, color) {
    this.dialog.dismiss();

    if (textOrDelete === undefined) {
      this.currentLabel = null;
      return;
    }

    if (typeof (textOrDelete) === "string") {

      if (this.isEdit) {
        this.editLabel(textOrDelete, color);
      }
      else {
        this.createLabel(textOrDelete, color);
      }
    }
    else//typeof(textOrDelete) === "boolean"
    {
      var isDelete = textOrDelete;
      if (isDelete === false)
        return;

      this.deleteLabel();
    }
    this.currentLabel = null;
  }

  editLabel(text, color) {
    realm.write(() => {
      this.currentLabel.data.title = (text || "");
      this.currentLabel.data.color = color;
    });

    this.currentLabel.component.setState({
      label: this.currentLabel.data
    });
  }

  createLabel(text, color) {
    let groups = realm.objects("LabelGroup");

    realm.write(() => {
      var label = LabelItem.create(text, color);
      groups.forEach((group) => {
        group.links.push(
          LabelLink.create(label, false)
        );
      });
    });
    this.forceUpdate();
  }

  deleteLabel() {
    var id = this.currentLabel.data.id;

    realm.write(() => {
      var links = realm.objects("LabelLink").filtered("labelId == \"" + id.toString() + '"');
      realm.delete(this.currentLabel.data);
      realm.delete(links);
    });

    this.forceUpdate();
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
});