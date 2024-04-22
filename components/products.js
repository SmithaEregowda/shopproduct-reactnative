import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { getAllProducts } from '../services/products'
import ProductCard from './productcard';
import Loader from './common/loader';
import Toast from 'react-native-root-toast';
import { AuthContext } from '../store/auth';
import { getwishlistByUser } from '../services/wishlist';
import { useFocusEffect } from '@react-navigation/native';

const Products = ({pageType}) => {
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false)
    const {authToken,userId}=useContext(AuthContext)

  useFocusEffect(
    useCallback(()=>{
      getListOfProducts();
    },[])
  )

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
                setProducts(listofProds)
              setLoading(false)
            //   setPagination(data?.pagination)
            })
    }

  return (
    <ScrollView >
     {loading&& <Loader loading={loading} />}
      {/* <FlatList 
         data={products}
         keyExtractor={(item)=>item?._id}
         contentContainerStyle={styles.list}
        //  numColumns={numColumns}
         renderItem={(itemData)=>{
            return(
                <ProductCard 
                    product={itemData?.item}
                />
            )
         }}
      /> */}
      <View style={styles.list}>
      {products?.length>0&&products?.map((item)=>(
                <ProductCard 
                key={item?.id}
                product={item}
                pageType={pageType}
            />

      ))}
      </View>

    </ScrollView>
  )
}

export default Products

const styles = StyleSheet.create({
  list: {
    // justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});