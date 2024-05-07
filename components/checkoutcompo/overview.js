import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartProduct from '../cartprod/cartproduct'

const OverViewProd = ({cartProducts,cartItems,setLoading}) => {
  return (
    <ScrollView>
        {cartProducts?.map((prod)=>(
        <CartProduct 
          {...{
            prod,
            cartItems,
            setLoading
          }}
          page={"checkout"}
        />
      ))}
    </ScrollView>
  )
}

export default OverViewProd

const styles = StyleSheet.create({})