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
  Button,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Header, Left, Body, Title} from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import CardLabel from "./Label/CardLabel";
import CardDateTime from "./DateTime/CardDateTime";
import Helper from '../../_Commons/Helper';
import realm from '../../Realm/Realm';
import CheckList from "./CheckList/CheckList";
import {Actions} from 'react-native-router-flux';


const optionsImg = {
  title: 'Select a photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

/** ------------------------------------------------------------------------------
 * ================================================================================
 * this.props.
 *
 * @param data : TaskChema
 * @param deleteCallback: function(task) (when this task be deleted)
 *
 * ------------------------------------------------------------------------------ */
export default class TaskDetailScreen extends Component {
  constructor(props) {
    super(props);

    var data = this.props.data;// Card

    this.state = {
      title: data.title,
      description: data.description,
      groupLabel: data.labelGroup,
      dueTime: {
        time: data.dueDate,
        isCheck: data.dueDateCheck
      },
      checkList: data.checkList,

      cover: {
        width: Dimensions.get('window').width,
        height: 200,
      }
    };


    this.initData();
  }


  initData() {

    this.renderStickyHeader = this.renderStickyHeader.bind(this);
    this.renderForeground = this.renderForeground.bind(this);


    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    this.onClickLabel = this.onClickLabel.bind(this);

    this.onChangeDateTime = this.onChangeDateTime.bind(this);

    this.onClickDeleteTask = this.onClickDeleteTask.bind(this);
    this.onTrulyDeleteTask = this.onTrulyDeleteTask.bind(this);
  }

  renderHeader() {
    return (
      <View style={styles.nav}>
        <View style={styles.navLeft}>
          <TouchableOpacity
            style={{
              position: 'absolute',
            }}

            onPress={() => {
              Actions.pop();
              setTimeout(() => {
                Actions.refresh();
              }, 10)
            }}
            style={{marginLeft: 10}}>
            <Icon
              name='arrow-back'
              type="MaterialIcons"
              style={{fontSize: 25, color: 'white'}}
              color='#fff'
            />
          </TouchableOpacity>
        </View>
        <View style={styles.navRight}/>
      </View>

    );
  }

  renderStickyHeader() {
    return <View style={styles.stickyHeader}>
      <Text style={styles.title}>
        {Helper.ellipsis(this.state.title, 30)}
      </Text>
    </View>
  }

  renderForeground() {
    return (
      <Image
        resizeMode='cover'
        style={{
          width: this.state.cover.width,
          height: this.state.cover.height,
        }}
        source={require('../../_Resources/night_sky.jpg')}
      />
    );
  }

  renderTitleSection() {
    return <View style={styles.titleView}>

      <TextInput
        style={styles.titleBellowImg}
        placeholder="Name of this task..."
        placeholderTextColor="#aaa"

        defaultValue={this.state.title}
        onChangeText={this.onChangeTitle}
      />

      {/*<View style={{flexDirection: 'row'}}>*/}
        {/*<Text style={styles.subTitleBellowImg}>*/}
          {/*{this.state.cardGroup.title || "A group"}*/}
        {/*</Text>*/}

        {/*<Text style={styles.subTitleSeparate}>in board</Text>*/}

        {/*<Text style={styles.subTitleBellowImg}>*/}
          {/*{this.state.cardGroup.board? (this.state.cardGroup.board.title || "A board") : "A board" }*/}
        {/*</Text>*/}
      {/*</View>*/}

    </View>
  }

  renderDescription() {
    return <View style={styles.container}>
      <TextInput
        placeholder="Edit card description..."
        placeholderTextColor="#aaa"

        defaultValue={this.state.description}
        onChangeText={this.onChangeDescription}
      />
    </View>
  }

  renderLabel() {
    return <CardLabel
      ref={(cardLabel) => {
        this.cardLabel = cardLabel;
      }}
      clickLabelCallback={this.onClickLabel}
      groupLabel={this.state.groupLabel}
    />
  }

  renderDateTime() {
    return <CardDateTime
      dateTimeModel={this.state.dueTime}
      changeDateTimeCallback={this.onChangeDateTime}
    />
  }


  renderCheckList() {
    return <CheckList
      data={this.state.checkList}
    />
  }


  render() {
    return (

      <View style={{flex: 1}}>


        <ParallaxScrollView

          style={styles.paralax}

          renderStickyHeader={this.renderStickyHeader}
          stickyHeaderHeight={56}
          fadeOutForeground={false}

          backgroundColor="#026AA7"
          contentBackgroundColor="#fff"

          parallaxHeaderHeight={this.state.cover.height}
          fadeOutForeground={true}

          renderForeground={this.renderForeground}
        >

          {this.renderTitleSection()}

          {this.renderDescription()}
          {this.renderLabel()}
          {this.renderDateTime()}
          {this.renderCheckList()}

        </ParallaxScrollView>

        {this.renderHeader()}
      </View>

    );
  }

  onChangeTitle(txt) {
    var data = this.props.data;// Card Schema
    realm.write(() => {
      data.title = txt;
    });

    this.setState({title: txt});
  }

  onChangeDescription(txt) {
    var data = this.props.data;// Card Schema
    realm.write(() => {
      data.description = txt;
    });
  }

  onClickLabel() {
    Actions.label({
      data: this.state.groupLabel,
      onBack: () => {
        this.cardLabel.refresh();
        this.forceUpdate();
      }
    });
  }

  onChangeDateTime(date, isCheck) {
    var data = this.props.data;

    realm.write(() => {
      data.dueDate = date;
      data.dueDateCheck = isCheck
    });
  }

  onClickDeleteTask() {
    Alert.alert(
      'Deleting task',
      'Do you really want to delete this task?',
      [
        {text: 'Cancel'},
        {text: 'OK', onPress: this.onTrulyDeleteTask},
      ]
    );
  }

  onTrulyDeleteTask() {
    Actions.pop();
    setTimeout(() => {
      Actions.refresh();
      this.props.deleteCallback(this.props.data);
    }, 10)
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#fff',
  },
  nav: {
    flexDirection: 'row',
    height: 56
  },
  navLeft: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navRight: {
    flex: 1
  },
  paralax: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  stickyHeader: {
    height: 56,
    backgroundColor: '#026AA7',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 70
  },
  titleView: {
    backgroundColor: '#026AA7',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
  },
  titleBellowImg: {
    width: '100%',
    textAlign: 'left',
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: -4,
    marginRight: -4,
  },
  subTitleBellowImg: {
    color: '#ddd',
    fontStyle: 'italic'
  },
  subTitleSeparate: {
    color: '#aaa',
    marginLeft: 5,
    marginRight: 5
  },
  container: {
    flex: 1
  },
  item: {
    marginTop: -2,
    padding: 10,
    fontSize: 18,
    height: 200,
    borderRadius: 10,
    borderColor: '#f00',
    borderWidth: 2,
  },
});