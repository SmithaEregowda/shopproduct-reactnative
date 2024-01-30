import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../services/products'
import ProductCard from './productcard';
import Loader from './common/loader';
import Toast from 'react-native-root-toast';

const Products = () => {
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
     
        getListOfProducts();
    },[])

   

    const getListOfProducts=()=>{
      setLoading(true)
        const requestOptions = {
            method: 'GET',
            // headers: {
            //   Authorization: `Bearer ${token}`
            // },
          };
          getAllProducts(requestOptions)
            .then(data => {
              
              setProducts(data?.products)
              setLoading(false)
            //   setPagination(data?.pagination)
            })
    }
    let numColumns=2;

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