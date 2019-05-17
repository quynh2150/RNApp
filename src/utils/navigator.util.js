import { StackNavigator } from 'react-navigation';
import Login from '../login';

export const AppScreens = new StackNavigator({
  Login: { screen: Login },
});