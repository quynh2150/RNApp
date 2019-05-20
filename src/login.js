import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Account: {
        name: "",
        password: ""
      }
    };
    this.setValue = this.setValue.bind(this);
    this.login = this.login.bind(this);
  }

  setValue(input, prop) {
    this.setState({
      Account: {
        name: prop === 'name' ? input : this.state.Account.name,
        password: prop === 'password' ? input : this.state.Account.password
      },
    })
  }

  login = async () => {
    try {
      let user = {
        _id: Math.random(),
        name: this.state.Account.name,
        avatar: "https://placeimg.com/140/140/any"
      };
      await AsyncStorage.setItem('UserInfo', JSON.stringify(user));

    } catch (error) {
      console.log(error);
    }

    this.props.navigation.navigate("Chat");
  }

  render() {
    return (
      <View behavior="padding" style={LoginStyles.loginForm}>
        <TextInput name='name' placeholder={"name"} keyboardType="default" returnKeyType="next"
          value={this.state.Account.name}
          onSubmitEditing={() => this.txtPassword.focus()} onChangeText={(input) => this.setValue(input, 'name')}
          style={LoginStyles.input}
        />

        <TextInput name='password' placeholder={"password"} returnKeyType="go" secureTextEntry
          value={this.state.Account.password}
          ref={(input) => this.txtPassword = input} onChangeText={(input) => this.setValue(input, 'password')}
          style={LoginStyles.input}
        />

        <View style={LoginStyles.actionBar}>
          <TouchableOpacity style={[LoginStyles.action, { backgroundColor: '#fff' }]}>
            <Text style={[LoginStyles.actionTitle, { color: '#000' }]}
              onPress={() => this.login()}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const LoginStyles = StyleSheet.create({
  loginForm: {
    justifyContent: 'center',
    flex: 1,
    padding: 20,
    backgroundColor: '#dfe6e9',
  },

  input: {
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 15,
  },

  actionBar: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  action: {
    flex: 0.4,
    backgroundColor: '#346ba5',
    paddingHorizontal: 20,
    borderRadius: 3,
  },

  actionTitle: {
    textAlign: 'center',
    color: '#fff',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 15
  }
});

export default Login;