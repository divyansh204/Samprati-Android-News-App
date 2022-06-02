import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import SampratiTabs from './src/components/SampratiTabs';
import Context from './src/API/Context';
import Password from './src/screens/Password';
import Email from './src/screens/Email';
import UserName from './src/screens/UserName';

const Stack = createNativeStackNavigator();

function App() {

  //Here we are using react navigation to navigate between screens

    return (
      <NavigationContainer> 
        <Stack.Navigator initialRouteName="Sign In">
          <Stack.Screen name="Sign In" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="Sign Up" component={Register} options={{headerShown: false}}/>
          <Stack.Screen name="Tabs" component={SampratiTabs} options={{headerShown: false}}/>
          <Stack.Screen name="HomeScreen" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="Password" component={Password} options={{headerShown: false}}/>
          <Stack.Screen name="Email" component={Email} options={{headerShown: false}}/>
          <Stack.Screen name="Name" component={UserName} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
      );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default () => {
  return (
    <Context>
      <App/>
    </Context>
  );
};