import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default class WorkspaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: 1,
      page: 0
    };

    // setInterval(() => {
    //   this.setState({
    //     seed: this.state.seed + 1
    //   });
    // }, 1000);
  }

  componentDidMount() {
    this.setState({
      page: this.state.page + 1
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.page !== prevState.page + 1) {
      this.setState({
        page: prevState.page + 1
      });
    } 
    console.log('?');
    // this.setState({
    //   page: this.state.page + 1
    // });
  }

  componentWillUnmount() {

  }

  componentDidCatch(error, info) {
    logComponentStackToMyService(info.componentStack);
  }

  render() { 
    return (
      <Text>{this.state.seed} {this.state.page}</Text>
      // <Text></Text>
    );
  }
};