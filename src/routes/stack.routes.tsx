import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Welcome } from '../pages/Welcome'
import { UserIdentification } from '../pages/UserIdentification'
import { Confirmation } from '../pages/Confirmation'
import colors from '../../styles/colors'

export type RootStackParamList = {
  Welcome: React.FC
  UserIdentification: React.FC
  Confirmation: React.FC
}

const stackRoutes = createStackNavigator<RootStackParamList>()

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    defaultScreenOptions={{}}
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: colors.white,
      },
    }}
  >
    <stackRoutes.Screen name="Welcome" component={Welcome} />
    <stackRoutes.Screen
      name="UserIdentification"
      component={UserIdentification}
    />
    <stackRoutes.Screen name="Confirmation" component={Confirmation} />
  </stackRoutes.Navigator>
)

export default AppRoutes
