import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps'
import OverViewProd from '../components/checkoutcompo/overview'
import Loader from '../components/common/loader'

const Checkout = ({navigation,route}) => {
  const [loading,setLoading]=useState(false)
  return (
    <>
    {loading&& <Loader loading={loading} />}
    <View style={{flex:1}}>
     <ProgressSteps>
      <ProgressStep label="Over View">
          <OverViewProd 
            {...{
              setLoading
            }}
            cartItems={route.params.cartItems}
            cartProducts={route.params.cartprods}
          />
      </ProgressStep>
      <ProgressStep label="Shipping Address">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18 }}>This is the content within step 2!</Text>
        </View>
      </ProgressStep>
      <ProgressStep label="Payment">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18 }}>This is the content within step 2!</Text>
        </View>
      </ProgressStep>
    </ProgressSteps>
    </View>
    </>
  )
}

export default Checkout

const styles = StyleSheet.create({

})