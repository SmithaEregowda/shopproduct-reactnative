import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps'
import OverViewProd from '../components/checkoutcompo/overview'
import Loader from '../components/common/loader'
import Shipping from '../components/checkoutcompo/shipping'
import Payment from '../components/checkoutcompo/payment'
import { GolbalColors } from '../constants/styles'

const Checkout = ({navigation,route}) => {
  const [loading,setLoading]=useState(false)
  const [Address, setShipAddress] = useState({});
  
  return (
    <>
    {loading&& <Loader loading={loading} />}
    <View style={{flex:1}}>
     <ProgressSteps>
      <ProgressStep label="Over View"
      nextBtnText={"Proceed to Shipping"} 
      nextBtnTextStyle={styles.nextbtnOverview}
      >
          <OverViewProd 
            {...{
              setLoading
            }}
            cartItems={route.params.cartItems}
            cartProducts={route.params.cartprods}
          />
      </ProgressStep>
      <ProgressStep label="Shipping Address"
       nextBtnText={"Go to Payment"} 
      previousBtnTextStyle={styles.prevbtnOverview}
      nextBtnTextStyle={styles.nextbtnOverview}
      nextBtnDisabled={!Address?.pincode||!Address?.state||!Address?.address1}
      >
        <Shipping  {...{
          setShipAddress,
          setLoading,
          Address
        }} />
      </ProgressStep>
      <ProgressStep label="Payment">
        <Payment />
      </ProgressStep>
    </ProgressSteps>
    </View>
    </>
  )
}

export default Checkout

const styles = StyleSheet.create({
  nextbtnOverview:{
    color:GolbalColors.PRIMARY_BTN,
   fontWeight:"600",
   backgroundColor:GolbalColors.BG2,
   padding:10,
   borderColor:GolbalColors.BORDER1,
   borderRadius:10,
   shadowColor:GolbalColors.shadow1,
   shadowOpacity:0.5
  },
  prevbtnOverview:{
    color:GolbalColors.white,
   fontWeight:"600",
   backgroundColor:GolbalColors.error,
   padding:10,
   borderColor:GolbalColors.BORDER1,
   borderRadius:10,
   shadowColor:GolbalColors.shadow1,
   shadowOpacity:0.5,
   gap:10
  }
})