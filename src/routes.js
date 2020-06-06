import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from 'app/pages/Home'
import Points from 'app/pages/Points'
import Detail from 'app/pages/Detail'

const AppStack = createStackNavigator()

const Routes = () => (
  <NavigationContainer>
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Points" component={Points} />
      <AppStack.Screen name="Detail" component={Detail} />
    </AppStack.Navigator>
  </NavigationContainer>
)

export default Routes
