import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Checkout = ({navigation,route}) => {
    console.log(route.params)
  return (
    <View>
      <Text>Checkout</Text>
    </View>
  )
}

export default Checkout

const styles = StyleSheet.create({})