import 'react-native-gesture-handler'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Posts from './src/Pages/Posts'
import User from './src/Pages/User'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        mode={ 'modal' }
      >
        <Stack.Screen
          name="Posts"
          component={Posts}
        />

        <Stack.Screen
          name="User"
          component={User}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
