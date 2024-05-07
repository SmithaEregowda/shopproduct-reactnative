import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import {
    CardField,
    CardFieldInput,
    useStripe,
  } from '@stripe/stripe-react-native';

const CardPayment = () => {
    const [card, setCard] = useState(CardFieldInput.Details | null);
    const {confirmPayment, handleCardAction} = useStripe()

    console.log(card)

  return (
    <View>
    <CardField
        postalCodeEnabled={true}
        cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
            display:"flex",
            flexDirection:"column"
        }}
        style={{
            width: '100%',
            height: 50,
            marginVertical: 30
        }}
        onCardChange={(cardDetails) => {
            setCard(cardDetails);
        }}
        onFocus={(focusedField) => {
            console.log('focusField', focusedField);
        }}
        />
    </View>
  )
}

export default CardPayment

const styles = StyleSheet.create({})