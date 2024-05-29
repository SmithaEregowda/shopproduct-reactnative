import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { StripeProvider,useStripe } from '@stripe/stripe-react-native';
import CardPayment from './cardpay';

const Payment = ({
  setLoading,
  setPaymentObj,
  paymentObj,
  selectedIndex,
  setSelectedIndex
}) => {
    const stripeTestPromise = 'pk_test_51LSgoUSFmHpNb8iU7NUg5wItbwWrQ2r3wBBUfpMKwhd9LIUXlMMi5ravjHkUAp0d8Dv6VbsKWgaddyoRI1sYc9Sn00SvKhH9bc';
  
  return (
    <View>
      <SegmentedControl
        values={['Cash & Delivery', 'Card Payment']}
        selectedIndex={selectedIndex}
        onChange={(event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />
      {selectedIndex===1&&
      <View>
        <Text>Card Payment</Text>
        <StripeProvider
      publishableKey={stripeTestPromise}
    >
      {!paymentObj?<CardPayment {...{setLoading,setPaymentObj}}/>:
      <View>Payment Done successfully</View>
      }
    </StripeProvider>
        </View>
      }
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({})