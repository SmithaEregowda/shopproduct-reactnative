import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import Loader from '../components/common/loader'
import { getCartByUser } from '../services/cart'
import { AuthContext } from '../store/auth'
import { getAllProducts } from '../services/products'
import CartProduct from '../components/cartprod/cartproduct'
import { GolbalColors } from '../constants/styles'

const Cart = () => {
  const [loading,setLoading]=useState(false);
  const {authToken,userId}=useContext(AuthContext);
  const [cartItems,setCartItems]=useState([]);
  const [cartProducts,setCartProducts]=useState([])

  useFocusEffect(
    useCallback(()=>{
      getCartByUserInfo()
    },[])
  );

    const getCartByUserInfo=()=>{
      setLoading(true)
      const requestOptions = {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${authToken}`
          },
      };
      getCartByUser(userId, requestOptions).then((data) => {
          let products = data?.cart?.products;
          getListOfProducts(products)
          setCartItems(data?.cart)
          setLoading(false)
      }).catch((err)=>{
        console.log("error",err);
        setLoading(false)
      })
    }
    const getListOfProducts=(filterItems)=>{
      setLoading(true)
        const requestOptions = {
            method: 'GET',
            // headers: {
            //   Authorization: `Bearer ${token}`
            // },
          };
          getAllProducts(requestOptions)
            .then(data => {
              let listofProds=data?.products;
                let filteredProds=listofProds
                ?.filter((prod)=>filterItems?.find((item)=>item?.product===prod?._id));
                setCartProducts(filteredProds);
              setLoading(false)
            //   setPagination(data?.pagination)
            })
    }

  return (
    <>{loading&&<Loader />}
      <ScrollView>
      <View style={styles.cart}>
      <Text>Cart</Text>
      {cartProducts?.map((prod)=>(
        <CartProduct 
          {...{
            prod,
            cartItems
          }}
        />
      ))}
    </View>
      </ScrollView>
    </>
  )
}

export default Cart

const styles = StyleSheet.create({
  cart:{
    backgroundColor:GolbalColors.BG4,
    flex:1
  }
})