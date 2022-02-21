import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import leolivm from '../../assets/leolivm.png'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

const Header: React.FC = () => (
  <View style={styles.container}>
    <View>
      <Text style={styles.greeting}>Olá,</Text>
      <Text style={styles.userName}>Leandro</Text>
    </View>

    <Image source={leolivm} style={styles.image} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
    padding: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.text,
    color: colors.heading,
    lineHeight: 40,
  },
})

export { Header }
