import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../services/products'
import ProductCard from './productcard';

const Products = () => {
    const [products,setProducts]=useState([]);

    useEffect(()=>{
      console.log("first")
        getListOfProducts();
    },[])

    const getListOfProducts=()=>{
      console.log("secon")
        const requestOptions = {
            method: 'GET',
            // headers: {
            //   Authorization: `Bearer ${token}`
            // },
          };
          getAllProducts(requestOptions)
            .then(data => {
                console.log("data",data)
              setProducts(data?.products)
            //   setPagination(data?.pagination)
            })
    }

  return (
    <View>
      <FlatList 
         data={products}
         keyExtractor={(item)=>item?._id}
         renderItem={(itemData)=>{
            return(
                <ProductCard 
                    product={itemData?.item}
                />
            )
         }}
      />
    </View>
  )
}

export default Products

const styles = StyleSheet.create({})