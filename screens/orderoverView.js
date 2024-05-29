import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../store/auth';
import { CancelOrder, getSingleOrder } from '../services/order';
import Loader from '../components/common/loader';
import { GolbalColors } from '../constants/styles';
import Timeline from 'react-native-timeline-flatlist';
import Toast from 'react-native-root-toast';

const OrderOverView = ({navigation,route}) => {
    let orderId=route.params?.orderId;
    let product=route.params?.product;
    const [steps,setSteps]=useState(
      [
      {title:"Ordered",description:"Item Has been just orderd"}, 
      {title:"Shipped",description:"Item Has been Shipped ready to deliver"}, 
      {title:"Delivered",description:"Item Has been delivered.Thanks for shopping with us"}
    ]
    )
    let API_PATH='https://shop-products-api-1q6w.vercel.app';

    

    const {authToken}=useContext(AuthContext);
    const [loading,setLoading]=useState()
    let [orderdetail,setOrderDetail]=useState();
    const [orderStatus,setOrderStatus]=useState()

    useFocusEffect(
      useCallback(()=>{
        getOrder();
      },[orderId])
    )
    const getOrder=()=>{
      setLoading(true)
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`
        },
      };
      getSingleOrder(orderId, requestOptions).then((data) => {
        setOrderDetail(data?.order);
        let locorderStatus=data?.order?.products?.find((item)=>item?._id===product?._id)?.isDeliverd
        setOrderStatus(locorderStatus)
        if(locorderStatus!=="Canceled"){
          let updatedSteps=[...steps];
        let updateIdx=updatedSteps?.findIndex((item)=>item?.title===locorderStatus);
        let updatedItem={
          ...updatedSteps[updateIdx],
          circleColor:"green"
        }
        updatedSteps[updateIdx]=updatedItem;
        setSteps(updatedSteps)
        }else{
          setSteps([
            {title:"Ordered",description:"Item Has been just orderd"}, 
            {title:"Canceled",circleColor:"red",
            description:"Item Has been Cancelled.if incase you are not cancelled please react out to 7888433777"}
          ])
        }
        setLoading(false)
      });
    }

    const cancelOrder=()=>{
      setLoading(true)
      const payload = {
        prodId: product?._id
      }
      const requestOptions = {
        method: 'Put',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
      CancelOrder(requestOptions,orderdetail?._id).then((data)=>{
              Toast.show(data?.message, {
                duration: 1500,
                position: Toast.positions.CENTER,
                containerStyle:{
                  backgroundColor:data?.status==200?'green':"red"
                }
              });
              getOrder();
              setLoading(false)
      })
    }

  return (
    <> 
    {loading&& <Loader loading={loading} />}
    <ScrollView style={styles.orderWrap}>
      <View style={styles.imgWrap}>
        <Image 
                source={{uri:`${API_PATH}/${product?.productImg}`}}
                style={styles.image}
                />
        </View>
        <View style={styles.txtCont}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.subTitle}>{product.subTitle}</Text>
        </View>
        {/* <View style={styles.priceCont}>
            <Text style={styles.title}>{product.price}</Text>
            <Text style={styles.subTitle}>{product.subTitle}</Text>
        </View> */}
        <View style={styles.timeCont}>
        <Timeline 
          data={ steps}
          showTime={false}
          style={styles.trackcnt}
        />
        </View>
        <View style={styles.btn}>
         {orderStatus!=="Canceled"&&orderStatus!=="Delivered"&&
          <Button title='Cancel Order' color={"red"} onPress={()=>cancelOrder()}/>
          }
        </View>
    </ScrollView>
    </>
  )
}

export default OrderOverView

const styles = StyleSheet.create({
  orderWrap:{
    paddingVertical:50,
    // flex:1
  },
  imgWrap:{
    justifyContent:"center",
    marginLeft:30
  },
  image:{
  width:'90%',
  height:200,
},
title:{
  fontWeight:"350",
  fontSize:25,
  justifyContent:"center"
},
txtCont:{
   alignItems:"center",
},
subTitle:{
  color:GolbalColors.COLOR2
},
priceCont:{
  paddingHorizontal:30,
  flexDirection:"row"
},
trackcnt:{
  paddingHorizontal:130,
  marginVertical:40,
  flex:1
},
btn:{
  paddingHorizontal:30
}
})