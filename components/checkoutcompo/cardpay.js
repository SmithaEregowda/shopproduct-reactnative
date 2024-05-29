import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'

import {
    CardField,
    useStripe
  } from '@stripe/stripe-react-native';
import { AuthContext } from '../../store/auth';
import { postPayment } from '../../services/order';
import Toast from 'react-native-root-toast';

const CardPayment = ({setLoading,setPaymentObj}) => {

  const [carddetails,setCardDetails]=useState();
  const stripe=useStripe();
  const {authToken}=useContext(AuthContext)
    
      const handlePayPress = () => {
        setLoading(true)
        // const billingDetails = {
        //   email: "jenny.rosen@example.com",
        //   address:{
        //     postalCode:"571424"
        //   }
        // };
        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        //   type: "card",
        //   card:carddetails
        // });

        console.log("comm")

        let paymentMethod={
          id:"pm_1PGjBXSFmHpNb8iUVcUvGGFa"
        }

        if (paymentMethod?.id) {
          console.log("Stripe 23 | token generated!", paymentMethod);
          //send token to backend here
          let paymentToken = paymentMethod?.id;
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify({
              amount: "100",
              token: paymentToken
            })
          }
          postPayment(requestOptions).then((data) => {
            // if(data?.status===200){
              setPaymentObj({
                "status": 200,
                "message": "Payment Successful",
                "paidamount": 120,
                "success": true
            });
            // }
            console.log(data)
            Toast.show(data?.message, {
              duration: 1500,
              position: Toast.positions.CENTER,
              containerStyle:{
                backgroundColor:data?.status==200?'green':"red"
              }
            });
            setLoading(false)
          })
    
        } else {
          console.log(error.message);
          setLoading(false)
        }
      };


  return (
    <View>
     <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" 
      // disabled={loading} 
      />
    </View>
  )
}

export default CardPayment

const styles = StyleSheet.create({})