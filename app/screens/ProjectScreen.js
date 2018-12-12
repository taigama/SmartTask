import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import realm, { getNewId } from '../realm/Realm';
import {Icon} from 'react-native-elements';
import ActionButton from 'react-native-action-button';

export default class ProjectScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Boards",
      headerStyle: {
        backgroundColor: '#026AA7',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: (
        <Icon 
          name='dehaze'
          onPress={() => alert('Coming soon')}
          color='white'
          size={30} 
          containerStyle={{
            marginLeft: 20
          }}
      />  
      ),
      headerRight: (
        <Icon 
          name='search'
          onPress={() => alert('Coming soon')}
          color='white'
          size={30} 
          containerStyle={{
            marginRight: 20
          }}
        />  
      ),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      boards: [],
    }
  }

  componentDidMount() {
    this.setState({
      boards: realm.objects('Board'),
    })
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
        <Text>{this.state.boards.length}</Text>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New board" onPress={() => this.addBoard()}>
            <Icon name='add' color='white' size={30} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Delete all" onPress={() => {this.deleteAll()}}>
            <Icon name='remove' color='white' size={30} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }

  addBoard(boardName) {
    boardName = boardName || 'New board';
    realm.write(() => {
      realm.create('Board', {title: boardName, cardGroups: []});
      this.setState({
        boards: realm.objects('Board'),
      })
    });
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

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
