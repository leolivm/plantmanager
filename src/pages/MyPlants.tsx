import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Alert } from 'react-native'
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

import { Header } from '../components/Header'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { Load } from '../components/Load'

import { PlantProps, loadPlant, removePlant } from '../libs/storage'

import waterdrop from '../assets/waterdrop.png'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

const MyPlants: React.FC = () => {
  const [plants, setPlants] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState(true)
  const [nextWatered, setNextWatered] = useState<string>()

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 130],
        [200, 130],
        Extrapolate.CLAMP,
      ),
    }
  })

  const loadStoragedData = async () => {
    const plantsStoraged = await loadPlant()

    const nextTime = formatDistance(
      new Date(plantsStoraged[0].dateTimeNotification).getTime(),
      new Date().getTime(),
      { locale: pt },
    )

    setNextWatered(
      `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}`,
    )

    setPlants(plantsStoraged)
    setLoading(false)
  }

  const handleRemove = (plant: PlantProps) => {
    Alert.alert('Remover', `Deseja remover ${plant.name}`, [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim 😢',
        onPress: async () => {
          try {
            await removePlant(plant.id)
            setPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id),
            )
          } catch (err) {
            Alert.alert('Não foi possível remover!')
          }
        },
      },
    ])
  }

  useEffect(() => {
    loadStoragedData()
  }, [])

  if (loading) return <Load />

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 200 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16} // 1000 / 60 = 16. (1 segundo / 60 que é a quantidade de frames por segundo para ter uma animação de 60 frames)
      >
        <View style={styles.spotlight}>
          <Image source={waterdrop} style={styles.spotlightImage} />
          <Text style={styles.spotlightText}>{nextWatered}</Text>
        </View>

        <View style={styles.plants}>
          <Text style={styles.plantsTitle}>Próximas regadas</Text>

          <FlatList
            data={plants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardSecondary
                data={item}
                handleRemove={() => {
                  handleRemove(item)
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Animated.ScrollView>

      <Animated.View style={[styles.header, headerStyle]}>
        <Header />
      </Animated.View>
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
  header: {
    overflow: 'hidden',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: colors.green_light,
    paddingHorizontal: 30,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
})

export { MyPlants }
