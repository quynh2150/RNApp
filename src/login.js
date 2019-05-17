import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import LoginStyles from 'login.style';
import { Resource } from '../.core/utils/resource.util'
import Form from '../.core/components/validation.component/form.component';
import Input from '../.core/components/validation.component/input.component';

class Login extends Component {
  static navigationOptions = {
    headerStyle: {
      display: 'none',
    },
  };

  constructor(props) {
    super(props);

    this.initialState = {
      Account: {
        email: "",
        password: ""
      },
      Validators: {
        email: [
          { key: "required", message: Resource("message.msg_Login_EmailRequired") }
        ],
        password: []
      },
      CommonError: {
        error: "",
        errorType: "error"
      }
    }

    this.state = this.initialState;
    this.setValue = this.setValue.bind(this);
    this.signup = this.signup.bind(this);
  }

  setValue(input, prop) {
    this.setState({
      Account: {
        email: prop === 'email' ? input : this.state.Account.email,
        password: prop === 'password' ? input : this.state.Account.password
      },
    })
  }

  signup() {
    this.props.navigation.navigate("SignUp");
  }

  login() {
    AlertIOS.alert(
      'Quick Menu',
      null,
      [
        { text: 'Delete', onPress: () => this.deleteItem(rowID) },
        { text: 'Edit', onPress: () => this.openItem(rowData, rowID) },
        { text: 'Cancel' }
      ]
    )
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={LoginStyles.loginForm}>
        <Form>
          <Input name='email' placeholder={Resource("label.label_Login_Email")} keyboardType="email-address" returnKeyType="next"
            value={this.state.Account.email}
            onSubmitEditing={() => this.txtPassword.focus()} onChangeText={(input) => this.setValue(input, 'email')}
            style={LoginStyles.input}
            validators={this.state.Validators.email}
          />

          <Input name='password' placeholder={Resource("label.label_Login_Password")} returnKeyType="go" secureTextEntry
            value={this.state.Account.password}
            ref={(input) => this.txtPassword = input} onChangeText={(input) => this.setValue(input, 'password')}
            style={LoginStyles.input}
          />

          <View style={LoginStyles.actionBar}>
            <TouchableOpacity style={LoginStyles.action} >
              <Text style={LoginStyles.actionTitle}>{Resource("button.btn_Login_Signin")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[LoginStyles.action, { backgroundColor: '#fff' }]}>
              <Text style={[LoginStyles.actionTitle, { color: '#000' }]} onPress={() => this.signup()}>{Resource("button.btn_Login_Signup")}</Text>
            </TouchableOpacity>
          </View>
        </Form>
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
