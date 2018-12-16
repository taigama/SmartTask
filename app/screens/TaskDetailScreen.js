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
    FlatList
} from 'react-native';


import {
    List,
    ListItem,
    Header,
    Icon
} from 'react-native-elements';





import ParallaxScrollView from 'react-native-parallax-scroll-view';
import CardLabel from "../components/details/CardLabel";
import CardEditLabel from "../components/details/CardEditLabel";
import DialogEditLabel from "../components/details/DialogEditLabel";


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
            labelGroupId: 23

        };
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangedDescription = this.onChangedDescription.bind(this);
        this.onClickLabel = this.onClickLabel.bind(this);
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
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
            {key: 'NoBiet'},
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
                            marginLeft: 70
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

                    parallaxHeaderHeight={230}
                    fadeOutForeground={true}
                    // onChangeHeaderVisibility={alert("changed!")}


                    renderForeground={() => (
                        <Image
                            source={require('../resources/night_sky.jpg')}
                            style={{width: '100%', height: 230}}>
                        </Image>
                    )}


                >
                    <View style={styles.titleView}>

                        <TextInput
                            style={styles.titleBellowImg}
                            placeholder="Name of this task..."
                            placeholderTextColor="#aaa"

                            multiline={true}

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
                                {this.state.txtTitle.split(' ').map((word) => word && 'c').join(' ')}
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
                        clickLabelCallback={this.onClickLabel}
                        idGroupLabel={this.state.labelGroupId}
                    />
                    <View style={styles.container}>

                        <FlatList
                            data={names}
                            renderItem={({item}) => <Text
                                style={styles.item}>{item.key == undefined ? 'undefined' : item.key}</Text>}
                        />
                    </View>
                </ParallaxScrollView>


                <DialogEditLabel
                    idGroupLabel={this.state.labelGroupId}
                    ref={(dialogLabel) => {
                        this.dialogLabel = dialogLabel;
                    }}
                />
            </View>

        );
    }


    onChangeTitle(txt) {
        this.setState({txtTitle: txt});
    }

    onChangedDescription(e) {
        alert('description: ' + e.nativeEvent.text);
    }

    onClickLabel() {
        this.props.navigation.navigate('EditLabel', {idGroupLabel: 23});
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