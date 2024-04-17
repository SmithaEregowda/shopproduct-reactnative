import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const TochableIcons = ({name,color,size,handleClick,style}) => {
  return (
    <TouchableOpacity onPress={handleClick} style={style}>
        <Icon name={name} color={color} size={size}  />
    </TouchableOpacity>
  )
}

export default TochableIcons

const styles = StyleSheet.create({})