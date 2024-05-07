import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { StripeProvider } from '@stripe/stripe-react-native';
import CardPayment from './cardpay';

const Payment = () => {
    const [selectedIndex,setSelectedIndex]=useState(0);
    const stripeTestPromise = 'pk_test_51LSgoUSFmHpNb8iU7NUg5wItbwWrQ2r3wBBUfpMKwhd9LIUXlMMi5ravjHkUAp0d8Dv6VbsKWgaddyoRI1sYc9Sn00SvKhH9bc';
    console.log(selectedIndex)
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
      <CardPayment />
    </StripeProvider>
        </View>
      }
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({})