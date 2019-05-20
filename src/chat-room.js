import React from "react";
import { Platform } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { AsyncStorage } from 'react-native';
import firebase from "../firebase";

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      user: {}
    };

    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      let value = await AsyncStorage.getItem('UserInfo');
      this.setState({ user: JSON.parse(value) });
    }
    catch (error) {
      console.log(error);
    }
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
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={this.state.user}
      />
    );
  }
}

export default ChatRoom;
