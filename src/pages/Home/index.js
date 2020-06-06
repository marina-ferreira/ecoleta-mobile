import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select'
import axios from 'axios'

import logo from 'app/assets/logo.png'
import homeBg from 'app/assets/home-background.png'

const Home = () => {
  const navigation = useNavigation()
  const [ufs, setUfs] = useState([])
  const [cities, setCities] = useState([])
  const [selectedUf, setSelectedUf] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')

  const handleNavigateToPoints = () => {
    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity
    })
  }

  useEffect(() => {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
    axios.get(url).then(response => {
      const ufAbbrevs = response.data.map(uf => uf.sigla)
      setUfs(ufAbbrevs.sort((a, b) => a > b ? 1 : -1))
    })
  }, [])

  useEffect(() => {
    if (selectedUf === '0') return

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
    axios.get(url).then(response => {
      const cityNames = response.data.map(uf => uf.nome)
      setCities(cityNames)
    })
  }, [selectedUf])

  return (
    <ImageBackground
      style={styles.container}
      source={homeBg}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={logo} />

        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
      </View>

      <View style={styles.footer}>
        <RNPickerSelect
          placeholder={{ label: "Selecione o Estado" }}
          onValueChange={value => setSelectedUf(value)}
          items={ufs.map(uf => ({ label: uf, value: uf }))}
          style={{
            inputIOS: styles.select,
            inputAndroid: styles.select
          }}
        />

        <RNPickerSelect
          placeholder={{ label: "Selecione a Cidade" }}
          onValueChange={value => setSelectedCity(value)}
          items={cities?.map(city => ({ label: city, value: city }))}
          style={{
            inputIOS: styles.select,
            inputAndroid: styles.select
          }}
        />

        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#fff" size={24} />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  select: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});
