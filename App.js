import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView } from 'react-native';

export default class App extends React.Component {

  state = {
    message: '',
    conversation: [{
      key: 1,
      user: 1,
      name: "Quynh",
      message: "Hello"
    }, {
      key: 2,
      user: 2,
      name: "Nguyen",
      message: "Hi"
    }]
  }

  sendMessage = () => {
    const { message } = this.state;
    this.setState({
      conversation: [
        ...this.state.conversation,
        {
          key: Math.random().toString(),
          user: 1,
          name: "Quynh",
          message
        }
      ],
      message: ''
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <FlatList
          data={this.state.conversation}
          renderItem={({ item }) => <Text>{item.name}: {item.message}</Text>}
        />
        <TextInput 
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(message) => this.setState({ message })}
          value={this.state.message} 
          onSubmitEditing={this.sendMessage}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: '10%'
  },
});
