import React, { Component,  } from 'react';
import { Platform, Image, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';
import { Drawer, Container, Content, Icon, Fab, Header, Left, Body, Right, Title, CardItem, Card, List, ListItem, Thumbnail } from 'native-base';
import { Button, Tile, Divider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import SideMenu from 'react-native-side-menu';
import realm from '../realm/Realm';
import { DialogComponent, DialogTitle, SlideAnimation, DialogContent, Dialog } from 'react-native-dialog-component';
import SideBar from './SideBar';
import { Actions } from 'react-native-router-flux'; 
import uuid from 'react-native-uuid';

export default class ProjectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      fabActive: false
    }
  }

  componentDidMount() {
    
    this.setState({
      boards: realm.objects('Board'),
    });

    // realm.write(() => {
    //   let cardGroup = realm.create('CardGroup', { title: 'Hello', cards: []});
    //   this.state.boards[0].cardGroups.push(cardGroup);
    // });
  }

  render() {
    return (
      <Drawer
        type='displace'
        side="left"
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.drawer._root.close()} >
        {this.createHeader()}
        <View style={{flex:1, backgroundColor: 'white'}}>
          <FlatList
            ItemSeparatorComponent={() => <View style={{justifyContent:'center', width: '100%', backgroundColor: '#F6F8FA', height: 3}}/>}
            keyExtractor={(item, index) => item.title}
            data={this.state.boards}
            renderItem={({item}) => this.renderBoard01(item)} 
          />
          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item buttonColor='#9b59b6' title="New board" onPress={() => this.addBoard()} >
              <Icon name='add' color='white'/>
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="Delete all" onPress={() => {this.deleteAll()}}>
              <Icon name='remove' color='white' />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="Popup" onPress={() => {this.dialogComponent.show()}}>
              <Icon name='ios-add' color='white' />
            </ActionButton.Item>
          </ActionButton>
        </View>
      </Drawer>
    );
  }

  createHeader() {
    return (
      <Header>
        <Left>
          <TouchableOpacity onPress={() => this.drawer._root.open()} style={{marginLeft: 10}}>
            <Icon 
              name='menu'
              style={{fontSize: 25, color: 'white'}}
            /> 
          </TouchableOpacity>
        </Left>
        <Body>
          <Title>Boards</Title>
        </Body>
        <Right>
          <TouchableOpacity onPress={() => null} style={{marginRight: 10}}>
            <Icon 
              name='search'
              style={{fontSize: 25, color: 'white'}}
            /> 
          </TouchableOpacity>
        </Right>
      </Header>
    );
  }

  renderBoard01(item) {
    return(
      <ListItem style={{ marginLeft: 0}} onPress={() => Actions.workspace({boardId: item.id})}>
        <Left>
          <Thumbnail square style={{marginLeft: 10}} source={require('../resources/chocobo.png')} />
          <Body>
            <Text>{item.title}</Text>
            <Text>{item.cardGroups.length}</Text>
            <Text>{realm.objects('CardGroup').length}</Text>
          </Body>
        </Left>
        <Right>
          <Icon name="bookmark"></Icon>
        </Right>
      </ListItem>
    );
  }

  renderBoard() {
    <Card style={{backgroundColor: '#F7F7F7'}}>
      <CardItem>
        <Left>
          <Thumbnail source={{backgroundColor: 'blue', uri: 'Image URL'}} />
          <Body>
            <Text>{item.title}</Text>
            <Text note>{item.cardGroups.length}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image source={require('../resources/night_sky.jpg')} style={{height: 100, width: null, flex: 1}}/>
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Icon active name="thumbs-up" />
            <Text>12 Likes</Text>
          </Button>
        </Left>
        <Body>
          <Button transparent>
            <Icon active name="chatbubbles" />
            <Text>4 Comments</Text>
          </Button>
        </Body>
        <Right>
          <Text>11h ago</Text>
        </Right>
      </CardItem>
    </Card>
  }

  addBoard(boardName) {
    boardName = boardName || 'New board';
    realm.write(() => {
      realm.create('Board', { id: uuid.v4(), title: boardName, cardGroups: []});
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

  openBoard(board) {
    this.props.navigation.navigate('Workspace', {board});
  }
}
