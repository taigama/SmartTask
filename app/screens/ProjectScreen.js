import React, { Component,  } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import realm, { getNewId } from '../realm/Realm';
import ActionButton from 'react-native-action-button';
import SideMenu from 'react-native-side-menu';
import { Drawer, Container, Content, Icon, Fab, Header, Left, Body, Right, Title } from 'native-base';
import SideBar from './SideBar';

export default class ProjectScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Boards",
      headerStyle: {
        backgroundColor: '#026AA7'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: (
        <TouchableOpacity onPress={() => null} style={{marginLeft: 20}}>
          <Icon 
            name='dehaze'
            type='MaterialIcons'
            style={{fontSize: 25, color: 'white'}}
          /> 
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={() => null} style={{marginRight: 20}}>
          <Icon 
            name='search'
            type='MaterialIcons'
            style={{fontSize: 25, color: 'white'}}
          /> 
        </TouchableOpacity>
      ),
    };
  }

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
  }

  render() {
    return (
      <Drawer
        type='displace'
        side="left"
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.drawer._root.close()} >
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
        <Container>
          <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
            <Text>{this.state.boards.length}</Text>
            <ActionButton buttonColor="rgba(231,76,60,1)">
              <ActionButton.Item buttonColor='#9b59b6' title="New board" onPress={() => this.addBoard()}>
                <Icon name='add' color='white'/>
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#3498db' title="Delete all" onPress={() => {this.deleteAll()}}>
                <Icon name='remove' color='white' />
              </ActionButton.Item>
            </ActionButton>
          </View>
        </Container>
      </Drawer>
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

  navigate(screen) {
    this.props.navigation.navigate(screen);
  }
}
