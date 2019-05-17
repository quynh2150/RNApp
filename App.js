import React from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// import Login from "./src/login/login"

const Container = Platform.select({
  android: KeyboardAvoidingView,
  ios: View,
});

export default class App extends React.Component {
  render() {
    return (
      <Container style={styles} behavior="padding" enabled>
        <ChatRoom />
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
