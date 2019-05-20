import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from '../login';
import ChatRoom from '../chat-room';

const RootStack = createStackNavigator(
  {
    Login: Login,
    Chat: ChatRoom
  },
  {
    initialRouteName: "Login"
  }
);

export const AppContainer = createAppContainer(RootStack);
