
import Helper from '../components/Helper.js';


import React, { Component } from 'react';
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

import Carousel from "react-native-snap-carousel";
import {Window} from "../components/Utils";
import CardGroup from "../components/CardGroup";



import { List, ListItem, Header, Icon  } from 'react-native-elements';


import Card from '../components/Card';
import { IData } from '../components/IData';





import ParallaxScrollView from 'react-native-parallax-scroll-view';




export default class TaskDetailScreen extends Component {
    static navigationOptions = ({ navigation }) => {
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
                        name='keyboard-arrow-left'
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
                        name='dehaze'
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
            txtTitle: 'this is title yeah'
        };
        this.onChangeTitle = this.onChangeTitle.bind(this);
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

    onChangeTitle(txt)
    {
        this.setState({txtTitle: txt});
    }

    render() {





        var names = [
            {name: 'Suck'},
            {name: 'Jackson'},
            {name: 'James'},
            {name: 'Joel'},
            {name: 'John'},
            {name: 'Jillian'},
            {name: 'Jimmy'},
            {key: 'Julie'},
            {name: 'NoBiet'},
        ];







        return (
            <ParallaxScrollView
                renderStickyHeader={() => (
                    <View style={{
                        height:56,
                        backgroundColor: '#026AA7',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        marginLeft: 70
                    }}>
                        <Text style={styles.title}>
                            {Helper.ellipsis('This is the detail screeeeeeeeeeeeeeeeeeen', 26)}
                        </Text>
                    </View>
                )}
                stickyHeaderHeight={56}

                fadeOutForeground={false}

                backgroundColor="#026AA7"
                contentBackgroundColor="#fff"

                parallaxHeaderHeight={300}
                fadeOutForeground={true}
                // onChangeHeaderVisibility={alert("changed!")}




                renderForeground={() => (
                    <View>
                        <Image
                            source={require('../resources/night_sky.jpg')}
                            style={{width: '100%', height: 200}}>
                        </Image>
                        <View style={styles.titleView}>

                            <TextInput
                                style={styles.titleBellowImg}
                                placeholder="'this is title yeah"
                                placeholderTextColor="#aaa"
                                numberOfLines={10}
                                onChangeText={this.onChangeTitle}
                            />

                            <Text style={{color: '#fff', height: 30}}>
                                {this.state.txtTitle.split(' ').map((word) => word && '🍕').join(' ')}
                            </Text>
                        </View>
                    </View>


                )}




            >


                <View style={styles.container}>

                    <FlatList
                        data={names}
                        renderItem={({item}) => <Text style={styles.item}>{item.name==undefined? 'undefined':item.name}</Text>}
                    />
                </View>
            </ParallaxScrollView>

        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },
    titleView: {
        width: '100%',
        height: 100,
        backgroundColor: '#000',
        alignItems:'center',
        justifyContent: 'center',
    },
    titleBellowImg: {
        height: 70,
        width: '100%',
        textAlignVertical: 'bottom',
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        textShadowColor: '#000',
        textShadowRadius: 10,
        textShadowOffset: {width: 10, height: 10},
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