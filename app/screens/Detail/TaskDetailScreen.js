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
      },

      cardGroup: data.cardGroup[0],
      board: data.cardGroup[0].board[0],
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
        <View style={styles.navHalfLeft}>
          <TouchableOpacity

            onPress={() => {
              Actions.pop();
              setTimeout(() => {
                Actions.refresh();
              }, 10)
            }}
            style={styles.navButton}>
            <Icon
              name='arrow-back'
              type="MaterialIcons"
              style={{fontSize: 25, color: 'white'}}
              color='#fff'
            />
          </TouchableOpacity>
        </View>

        <View style={styles.navHalfRight}>
          <TouchableOpacity

            onPress={() => {
              Actions.pop();
              setTimeout(() => {
                Actions.refresh();
              }, 10)
            }}
            style={styles.navButton}>
            <Icon
              name='more-vert'
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
        {Helper.ellipsis(this.state.title, 33)}
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

      <View style={{flexDirection: 'row'}}>
        <Text style={styles.subTitleBellowImg}>
          {this.state.board.title || "A project"}
        </Text>

        <Text style={styles.subTitleSeparate}>in list</Text>

        <Text style={styles.subTitleBellowImg}>
          {this.state.cardGroup.title || "A list" }
        </Text>
      </View>

    </View>
  }

  renderDescription() {
    return <View style={styles.desc}>
      <TextInput
        placeholder="Edit card description..."
        placeholderTextColor="#aaa"

        underlineColorAndroid='#3f51b555'
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

          backgroundColor="#3f51b5"
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
  navHalfLeft: {
    width: '50%',
    height: 56,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  navHalfRight: {
    width: '50%',
    height: 56,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#3f51b5',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 54
  },
  titleView: {
    backgroundColor: '#3f51b5',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
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
  desc: {
    padding: 0,
    marginLeft: 10,
    marginRight: 10,
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