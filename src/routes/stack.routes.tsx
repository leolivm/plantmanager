import React from 'react'
import { enableScreens } from 'react-native-screens'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'

import { Welcome } from '../pages/Welcome'
import { UserIdentification } from '../pages/UserIdentification'
import { Confirmation, ConfirmationParams } from '../pages/Confirmation'
import { PlantSave } from '../pages/PlantSave'

import { PlantProps } from '../libs/storage'
import { AuthRoutes } from './tab.routes'

import colors from '../../styles/colors'

enableScreens()

export type RootStackParamList = {
  Welcome: React.FC
  UserIdentification: React.FC
  Confirmation: ConfirmationParams
  PlantSelect: React.FC
  PlantSave: { plant: PlantProps }
  MyPlants: React.FC
}

const stackRoutes = createSharedElementStackNavigator()

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
      headerShown: false,
    }}
  >
    <stackRoutes.Screen name="Welcome" component={Welcome} />
    <stackRoutes.Screen
      name="UserIdentification"
      component={UserIdentification}
    />
    <stackRoutes.Screen name="Confirmation" component={Confirmation} />
    <stackRoutes.Screen name="PlantSelect" component={AuthRoutes} />
    <stackRoutes.Screen
      name="PlantSave"
      component={PlantSave}
      sharedElements={(route) => {
        const { plant } = route.params
        return [
          {
            id: `item.${plant.id}.image`,
            animation: 'move',
            resize: 'clip',
            align: 'center-top',
          },
        ]
      }}
    />
    <stackRoutes.Screen name="MyPlants" component={AuthRoutes} />
  </stackRoutes.Navigator>
)

export default AppRoutes
