import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, ViewPropTypes } from 'react-native';
import { Icon, Header, Left, Body, Right, Title, ListItem, Thumbnail } from 'native-base';
import { SearchBar } from 'react-native-elements'

import realm, { Board } from '../../Realm/Realm'
import { IData } from '../../_Commons/IData';
import { Window } from '../../_Commons/Utils';
import FormModal from '../../_Commons/FormModal';

export default class SearchScreen extends Component<IData> {

  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        {this.renderHeader()}
        
        <View style={{ backgroundColor: '#9E9E9E', width: '100%', height: '100%' }}></View>
      </View>
    );
  }

  renderHeader() {
    return (
      <Header style={{backgroundColor: 'white'}}>
        <View style={{flex: 1, flexDirection: "row"}}>
        <TouchableOpacity onPress={() => this.drawer._root.open()} style={{width: 50, justifyContent: 'center'}}>
            <Icon 
              round
              name='arrow-back'
              type="MaterialIcons"
              style={{fontSize: 25, color: 'grey', textAlign: 'center'}}
            /> 
          </TouchableOpacity>
        <SearchBar
          lightTheme
          round
          // onChangeText={someMethod}
          // onClearText={someMethod}
          containerStyle={{width: (Window.width - 65)}}
          // icon={{ type: 'font-awesome', name: 'search' }}
          placeholder=' Search title...'
          inlineImageLeft='' />
          {/* <Text>ABCDEF</Text> */}
        </View>
        {/* <Left style={{width: 50}}>
          <TouchableOpacity onPress={() => this.drawer._root.open()} style={{marginLeft: 10}}>
            <Icon 
              name='menu'
              style={{fontSize: 25, color: 'green'}}
            /> 
          </TouchableOpacity>
        </Left> */}
        {/* <Body>
        
        </Body> */}
       
        
      </Header>
    );
  }
}