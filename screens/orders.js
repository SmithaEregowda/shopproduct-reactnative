import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import Loader from '../components/common/loader';
import { AuthContext } from '../store/auth';
import { getOrdersByUser } from '../services/order';
import OrderCard from '../components/orders/ordercard';

const Orders = () => {
  const [orders, setOrderItems] = useState();
  const [loading,setLoading]=useState()

  const {userId,authToken}=useContext(AuthContext)

  useFocusEffect(
    useCallback(()=>{
      getOrders()
    },[])
  )

  const getOrders=()=>{
    setLoading(true)
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    };
    getOrdersByUser(userId, requestOptions).then((data) => {
      setOrderItems(data?.orderDetails)
      setLoading(false)
    });
  }

  return (
   <>
    {loading&& <Loader loading={loading} />}
    <ScrollView>
      {orders?.length>0&&orders?.map((order)=>(
        <OrderCard 
          {...{
            order,
            setLoading
          }}
        />
      ))}
    </ScrollView>
    </>
  )
}

export default Orders

const styles = StyleSheet.create({})