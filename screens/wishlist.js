import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Products from '../components/products'
import { AuthContext } from '../store/auth';
import { getwishlistByUser } from '../services/wishlist';
import { getAllProducts } from '../services/products';
import Loader from '../components/common/loader';
import ProductCard from '../components/productcard';
import { useFocusEffect } from '@react-navigation/native';

const Wishlist = () => {
  const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false)
    const {authToken,userId}=useContext(AuthContext)

    useFocusEffect(
      useCallback(() => {
        getWishListByUserId(authToken, userId);
      }, [])
    )

    useEffect(()=>{
      getWishListByUserId(authToken, userId);
    },[])

    const getWishListByUserId = (token, user) => {
      setLoading(true)
      const requestOptions = {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`
          },
      };
      getwishlistByUser(user, requestOptions).then((data) => {
        getListOfProducts(data?.wishlist?.products)
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
              ?.filter((prod)=>filterItems?.find((item)=>item?.productId===prod?._id));
              setProducts(filteredProds)
            setLoading(false)
          //   setPagination(data?.pagination)
          })
  }

  return (
    <View>
      <Text>Wishlist</Text>
      <ScrollView >
     {loading&& <Loader loading={loading} />}
      <View style={styles.list}>
      {products?.length>0&&products?.map((item)=>(
                <ProductCard 
                key={item?.id}
                product={item}
                pageType={"wishlist"}
                getWishlistProds={getWishListByUserId}
            />

      ))}
      </View>

    </ScrollView>
    </View>
  )
}

export default Wishlist

const styles = StyleSheet.create({
  list: {
    // justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})