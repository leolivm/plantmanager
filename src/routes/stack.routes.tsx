import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Welcome } from '../pages/Welcome'
import { UserIdentification } from '../pages/UserIdentification'
import { Confirmation, ConfirmationParams } from '../pages/Confirmation'
import { PlantSelect } from '../pages/PlantSelect'
import { PlantSave } from '../pages/PlantSave'

import { MyPlants } from '../pages/MyPlants'
import { PlantProps } from '../libs/storage'

import colors from '../../styles/colors'

export type RootStackParamList = {
  Welcome: React.FC
  UserIdentification: React.FC
  Confirmation: ConfirmationParams
  PlantSelect: React.FC
  PlantSave: { plant: PlantProps }
  MyPlants: React.FC
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
    <stackRoutes.Screen name="PlantSelect" component={PlantSelect} />
    <stackRoutes.Screen name="PlantSave" component={PlantSave} />
    <stackRoutes.Screen name="MyPlants" component={MyPlants} />
  </stackRoutes.Navigator>
)

export default AppRoutes
