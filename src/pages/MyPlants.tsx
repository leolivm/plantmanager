import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

import colors from '../../styles/colors'
import { Header } from '../components/Header'

const MyPlants: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
})

export { MyPlants }
