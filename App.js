import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import AppContainer from './src/utils/navigator.util';

const Container = Platform.select({
  android: KeyboardAvoidingView,
  ios: View,
});

class App extends React.Component {
  render() {
    return (
      <Container behavior="padding" >
        <AppContainer />
      </Container>
    );
  }
}

export default App;