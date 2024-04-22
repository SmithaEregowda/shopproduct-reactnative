import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Products from '../components/products'

const Home = () => {
  return (
    <View>
      <Products pageType={"home"} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})