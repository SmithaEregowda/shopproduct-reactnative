import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { getAllProductsByIds } from '../../services/products'
import { AuthContext } from '../../store/auth'
import OrderItem from './orderItem'

const OrderCard = ({order,setLoading}) => {
    const [orderProducts,setOrderProducts]=useState([])

    useFocusEffect(
        useCallback(()=>{
          getProductsByIds()
        },[])
      );

      const {authToken}=useContext(AuthContext)

      const getProductsByIds=()=>{
        setLoading(true)
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`
          },
        };
        let prodIds=order.products?.map((item)=>item?._id)
        if(prodIds){
          getAllProductsByIds(requestOptions,prodIds.join(",")).then((data) => {
            let resprods=data?.products?.map((resItem)=>{
              let orderprod=order?.products?.find((item)=>item?._id===resItem?._id);
              resItem["isDeliverd"]=orderprod?.isDeliverd;
              return resItem
            })
            setOrderProducts(resprods)
            setLoading(false)
          });
        }else{
          setOrderProducts([])
          setLoading(false)
        }
      }

  return (
    <View>
      {orderProducts?.map((proditem)=>(
         <OrderItem 
            product={proditem}
            orderId={order?._id}
            totalPrice={order?.totalPrice}
         />
      ))}
    </View>
  )
}

export default OrderCard

const styles = StyleSheet.create({})