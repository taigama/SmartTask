import Helper from '../components/Helper.js';


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
    Dimensions
} from 'react-native';


import {
    List,
    ListItem,
    Header,
    Icon
} from 'react-native-elements';


import ImagePicker from 'react-native-image-picker';

const optionsImg = {
    title: 'Select a photo',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};


import CollapseView from 'react-native-collapse-view';


import ParallaxScrollView from 'react-native-parallax-scroll-view';
import CardLabel from "../components/details/CardLabel";

import realm from '../realm/Realm';


export default class TaskDetailScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const {navigate} = navigation;
        return {


            //navigation.getParam('detail_id',"default param")
            headerTitle: "",


            headerStyle: {
                backgroundColor: '#0000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{marginLeft: 20}}>
                    <Icon
                        name='arrow-back'
                        color='white'
                        size={30}
                    />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity
                    onPress={() => alert('This will be a menu')}
                    style={{marginRight: 20}}>
                    <Icon
                        name='more-vert'
                        color='white'
                        size={30}
                    />
                </TouchableOpacity>
            ),
            headerTransparent: true,
            headerBackgroundTransitionPreset: "fade",
        };
    };


    constructor(props) {
        super(props);

        this.state = {

            txtTitle: 'this is title yeah',
            idGroupLabel: this.props.navigation.state.params.idGroupLabel || 1,

            cover: {
                width: Dimensions.get('window').width,
                height: 200,
                uri: ""
            },

        };
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangedDescription = this.onChangedDescription.bind(this);
        this.onClickLabel = this.onClickLabel.bind(this);


        this.initData();
    }

    initData() {
        // Label
        let group = realm.objectForPrimaryKey('LabelGroup', this.state.idGroupLabel);
        if (group == null) {
            realm.write(() => {

                // create group
                group = realm.create('LabelGroup', {
                    key: this.state.idGroupLabel,
                    links: [],
                }, true);

            });
        }
        this.state.groupLabel = group;
    }


    componentDidMount() {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }


    componentWillUnmount() {

    }

    componentDidCatch(error, info) {
        logComponentStackToMyService(info.componentStack);
    }


    render() {


        var names = [
            {key: 'Suck'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'}
        ];


        return (

            <View style={{flex: 1}}>

                <ParallaxScrollView
                    renderStickyHeader={() => (
                        <View style={{
                            height: 56,
                            backgroundColor: '#026AA7',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingLeft: 70
                        }}>
                            <Text style={styles.title}>
                                {Helper.ellipsis('This is the detail screeeeeeeeeeeeeeeeeeen', 30)}
                            </Text>
                        </View>
                    )}
                    stickyHeaderHeight={56}

                    fadeOutForeground={false}

                    backgroundColor="#026AA7"
                    contentBackgroundColor="#fff"

                    parallaxHeaderHeight={this.state.cover.height}
                    fadeOutForeground={true}
                    // onChangeHeaderVisibility={alert("changed!")}


                    renderForeground={() => {

                        if (this.state.cover.uri)
                            return (
                                <Image

                                    defaultSource={require('../resources/night_sky.jpg')}
                                    resizeMode='cover'
                                    style={{
                                        width: this.state.cover.width,
                                        height: this.state.cover.height,
                                    }}
                                    source={{uri: this.state.cover.uri}}
                                />
                            );
                        else
                            return (
                                <Image
                                    resizeMode='cover'
                                    style={{
                                        width: this.state.cover.width,
                                        height: this.state.cover.height,
                                    }}
                                    source={require('../resources/night_sky.jpg')}
                                />
                            );
                    }}


                >
                    <View style={styles.titleView}>

                        <TextInput
                            style={styles.titleBellowImg}
                            placeholder="Name of this task..."
                            placeholderTextColor="#aaa"

                            multiline={false}

                            defaultValue={this.state.txtTitle}
                            onChangeText={this.onChangeTitle}
                        />

                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.subTitleBellowImg}>
                                {'<'}Project{'>'}
                            </Text>

                            <Text style={styles.subTitleSeparate}>
                                in list
                            </Text>

                            <Text style={styles.subTitleBellowImg}>
                                {this.state.txtTitle.split(' ').map((word) => word && 'c').join('-')}
                            </Text>
                        </View>

                    </View>

                    <View style={styles.container}>
                        <TextInput
                            placeholder="Edit card description..."
                            placeholderTextColor="#aaa"

                            multiline={false}

                            onSubmitEditing={this.onChangedDescription}
                        />

                    </View>
                    <CardLabel
                        ref={(cardLabel) => {
                            this.cardLabel = cardLabel;
                        }}
                        clickLabelCallback={this.onClickLabel}
                        groupLabel={this.state.groupLabel}
                    />
                    <CollapseView
                        tension={100}
                        collapse={false}
                        renderView={() => <Text>This is the title</Text>}
                        renderCollapseView={() => <Text style={{fontWeight: 'bold'}}>This is the content, very
                            much</Text>}
                    />


                    <View>
                        <Button title="Load Images" onPress={this._handleButtonPress.bind(this)}/>
                    </View>


                    <View style={styles.container}>

                        <FlatList
                            data={names}
                            renderItem={({item}) => <Text
                                style={styles.item}>{item.key == undefined ? 'undefined' : item.key}</Text>}
                        />
                    </View>
                </ParallaxScrollView>

            </View>

        );
    }

    _handleButtonPress = () => {
        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        ImagePicker.showImagePicker(optionsImg, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };


                var width = Dimensions.get('window').width;
                var height = width / response.width;
                height = response.height * height;

                this.setState({
                    cover: {
                        width: width,
                        height: height,
                        uri: response.uri,
                    },
                });
            }
        });


    };

    onChangeTitle(txt) {
        this.setState({txtTitle: txt});
    }

    onChangedDescription(e) {
        alert('description: ' + e.nativeEvent.text);
    }

    onClickLabel() {
        this.props.navigation.navigate('EditLabel',
            {
                groupLabel: this.state.groupLabel,
                onBack: () => {
                    this.cardLabel.refresh();
                    this.forceUpdate();
                }
            });
    }

}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: '#fff',
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