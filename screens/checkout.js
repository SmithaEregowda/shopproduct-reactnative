import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps'
import OverViewProd from '../components/checkoutcompo/overview'
import Loader from '../components/common/loader'
import Shipping from '../components/checkoutcompo/shipping'
import Payment from '../components/checkoutcompo/payment'
import { GolbalColors } from '../constants/styles'
import { AuthContext } from '../store/auth'
import Toast from 'react-native-root-toast'
import { postOrder } from '../services/order'
import { useNavigation } from '@react-navigation/native'

const Checkout = ({navigation,route}) => {
  const [loading,setLoading]=useState(false)
  const [Address, setShipAddress] = useState({});
  const [paymentObj,setPaymentObj]=useState()
  const [selectedIndex,setSelectedIndex]=useState(0);
  const {userId,authToken}=useContext(AuthContext)
  console.log(route.params)

  // const navigation=useNavigation();

  const placeorderhandler=()=>{
    setLoading(true)
    const payload = {
      userId,
      prodId: "65376ad6ba96f4502d46a1cc",
      products:[],
      PayMentMode:{paymentType:selectedIndex===0?"cash":"credit"},
      totalPrice:70,
      //isDeliverd: false,
      isfromcart:false,
      ...Address
    }
    const requestOptions = {
      method: 'Post',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    postOrder(requestOptions).then(
      (data) => {
        console.log(data)
        Toast.show(data?.message, {
          duration: 1500,
          position: Toast.positions.CENTER,
          containerStyle:{
            backgroundColor:data?.status==200?'green':"red"
          }
        });
        navigation.navigate("orders")
        setLoading(false)
    })
  }
  
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
      <ProgressStep label="Payment"
       nextBtnText={"Place Order"} 
       nextBtnDisabled={(selectedIndex===1&&!paymentObj)}
       onSubmit={placeorderhandler}
      >
        <Payment {...{
          setLoading,
          setPaymentObj,
          paymentObj,
          selectedIndex,
          setSelectedIndex
          }}/>
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