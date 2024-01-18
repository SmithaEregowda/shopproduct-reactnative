import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loader = ({loading}) => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator animating={true} size={'large'} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        zIndex: 100,
        height:"100%",
        position:"absolute",
        width:"100%"
      }
})