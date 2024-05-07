import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Input from '../common/input'

const Shipping = ({
    setShipAddress,
    Address
}) => {

    const addshiipingaddressHandle=(name,value)=>{
        setShipAddress({
          ...Address,
          [name]:value
        })
      }
  return (
    <View>
      <View style={styles.shipForm}>
      <Input
          // label="Email Address"
          onUpdateValue={(value)=>addshiipingaddressHandle("address1",value)}
          keyboardType="address1"
          placeholder={"Address1"}
        />
        <Input
          // label="Email Address"
          onUpdateValue={(value)=>addshiipingaddressHandle("address2",value)}
          keyboardType="address2"
          placeholder={"Address2"}
        />
        <Input
          // label="Email Address"
          onUpdateValue={(value)=>addshiipingaddressHandle("city",value)}
          keyboardType="city"
          placeholder={"City"}
        />
         <Input
          // label="Email Address"
          onUpdateValue={(value)=>addshiipingaddressHandle("state",value)}
          keyboardType="state"
          placeholder={"State"}
        />
         <Input
          // label="Email Address"
          onUpdateValue={(value)=>addshiipingaddressHandle("pincode",value)}
          keyboardType="pincode"
          placeholder={"Pin Code"}
        />
      </View>
    </View>
  )
}

export default Shipping

const styles = StyleSheet.create({
    shipForm:{
        paddingHorizontal:15
    }
})