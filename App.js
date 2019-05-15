import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import firebase from "./firebase";

const Container = Platform.select({
  android: KeyboardAvoidingView,
  ios: View,
});

export default class App extends React.Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    firebase
      .database()
      .ref("conversation")
      .on("child_added", snapshot => {
        const message = snapshot.val();
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, [message]),
        }));
      });
  }

  onSend(messages = []) {
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }));
    const message = messages[0];
    message.user._id = Platform.select({
      android: 2,
      ios: 1,
    });
    firebase
      .database()
      .ref("conversation")
      .push(message);
  }

  render() {
    return (
      <Container style={{ flex: 1 }} behavior="padding" enabled>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
            name: "Nguyen",
            avatar: "https://placeimg.com/140/140/any",
          }}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "10%",
  },
});
