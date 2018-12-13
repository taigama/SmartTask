import React, { Component } from 'react';
import {
    Animated,
    ImageBackground,
    Image,
    TouchableOpacity,
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar
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
            headerTitle: "fuck",


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

        };
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
        return (
            <ParallaxScrollView
                renderStickyHeader={() => (
                    <View style={{height:56, backgroundColor: '#026AA7' }}>
                    </View>
                )}
                stickyHeaderHeight={56}

                backgroundColor="#026AA7"
                contentBackgroundColor="pink"
                parallaxHeaderHeight={300}
                fadeOutForeground={true}
                // onChangeHeaderVisibility={alert("changed!")}

                renderForeground={() => (
                    <ImageBackground
                        source={require('../resources/night_sky.jpg')}
                        style={{width: '100%', height: '100%'}}>
                    </ImageBackground>
                )}

            >


                <View style={{ height: 200 }}>
                    <Text>Scroll me</Text>
                </View>
            </ParallaxScrollView>

        );
    }
}