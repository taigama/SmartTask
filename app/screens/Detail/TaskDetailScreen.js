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
  Alert, Picker
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
import {MenuDivider, MenuItem} from "react-native-material-menu";
import {ActionType, DialogType} from "../Workspace/Constants";
import Menu from "react-native-material-menu";
import FormModal from "../../_Commons/FormModal";
import Toast from "react-native-easy-toast";


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
 * @param data : Card Chema
 *
 * ------------------------------------------------------------------------------ */
export default class TaskDetailScreen extends Component {
  constructor(props) {
    super(props);

    var data = this.props.data;// Card

    this.state = {
      id: data.id,
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

      archived: data.archived,
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

    this.onClickMoveCard = this.onClickMoveCard.bind(this);
    this.moveOneCard = this.moveOneCard.bind(this);

    this.onClickUnarchiveCard = this.onClickUnarchiveCard.bind(this);
    this.onClickArchiveCard = this.onClickArchiveCard.bind(this);
  }

  renderMenuArchiveItem() {
    if(this.state.archived)
    {
      return <MenuItem onPress={this.onClickUnarchiveCard}>
        Unarchive this card
      </MenuItem>
    }
    return <MenuItem onPress={this.onClickArchiveCard}>
      Archive this card
    </MenuItem>
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
              color='#fff'
              size={25}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.navHalfRight}>
          <Menu
            ref={ref => (this._menu = ref)}
            button={
              <TouchableOpacity
                onPress={() => this._menu.show()}
                style={styles.navButton}
              >
                <Icon
                  name="more-vert"
                  type="MaterialIcons"
                  color='#fff'
                  size={25}
                />
              </TouchableOpacity>
            }>
            <MenuItem onPress={this.onClickMoveCard}>
              Move this card
            </MenuItem>
            <MenuDivider/>
            {this.renderMenuArchiveItem()}

          </Menu>
        </View>
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
        placeholder="Name of this card..."
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
          {this.state.cardGroup.title || "A list"}
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

  renderMoveOneCardDialog() {
    return (
      <FormModal
        ref={(dialogMoveCard) => { this._dialogMoveCard = dialogMoveCard; }}
        isVisible={false}
        titleStyle={{ color: '#32383B' }}
        onBackdropPress={() => this._dialogMoveCard.hide()}
        onBackButtonPress={() => this._dialogMoveCard.hide()}
        onSwipe={() => this._dialogMoveCard.hide()}
        swipeDirection='left'
        title='Move a cards...'>
        <View style={{
          height: 50, width: '100%', borderRadius: 50, backgroundColor: 'white',
          paddingLeft: 20, marginBottom: 10
        }}>
          <Picker
            mode="dialog"
            selectedValue={this.state.selectedValue}
            onValueChange={(itemValue, itemIndex) => this.setState({ selectedValue: itemValue })}>
            {this.state.board.cardGroups.filtered('archived = false').map((group, i) => {
              return (
                <Picker.Item key={group.id} label={group.title} value={group.id} />
              );
            })}
          </Picker>
        </View>
        <Button
          title="MOVE"
          fontWeight='bold'
          fontSize={20}
          raised
          buttonStyle={{
            backgroundColor: "#6E60F9",
            width: '100%',
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5,
            margin: 0,
          }}
          onPress={() => {
            this.moveOneCard(this.state.selectedValue);
            this._dialogMoveCard.hide();
            this.forceUpdate();
          }}
          containerViewStyle={{ width: '100%', marginLeft: 0, marginTop: 10, borderRadius: 5, }}
        />
      </FormModal>
    );
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
        <Toast ref="toast" />
        {this.renderMoveOneCardDialog()}
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

  onClickMoveCard() {
    this._menu.hide();
    this._dialogMoveCard.show();
  }

  moveOneCard(desGroupId?: string) {
    let srcGroup = this.state.cardGroup;
    if (desGroupId && desGroupId !== srcGroup.id) {
      realm.write(() => {
        let desGroup = realm.objectForPrimaryKey('CardGroup', desGroupId);
        let length = srcGroup.cards.length;
        let index = 0;
        for (let i = 0; i < length; i++) {
          if (srcGroup.cards[i].id === this.state.id) {
            index = i;
            break;
          }
        }
        let movedCards = srcGroup.cards.splice(index, 1);
        for (let i = 0; i < movedCards.length; i++) {
          desGroup.cards.push(movedCards[i]);
        }
        this.setState({cardGroup: desGroup});
        this.showToaster('Move card from [' + srcGroup.title + '] to [' + desGroup.title + ']')
      })
    } else {
      this.showToaster('Actions is not valid');
    };
  }

  onClickUnarchiveCard() {
    this._menu.hide();
    realm.write(() => {
      this.props.data.archived = false;
    });
    this.setState({archived: false});
    this.showToaster('This card has been unarchived');
  }

  onClickArchiveCard() {
    this._menu.hide();
    realm.write(() => {
      this.props.data.archived = true;
    });

    this.setState({archived: true});
    this.showToaster('This card has been archived');
  }

  showToaster(message?: string) {
    this.refs.toast.show(message);
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
    marginLeft: 6,
    marginRight: 6,
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