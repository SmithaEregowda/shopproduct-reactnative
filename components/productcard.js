import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductCard = ({product}) => {
    let API_PATH='https://shop-products-api-1q6w.vercel.app';
    console.log(`${API_PATH}/${product?.productImg}`)
    console.log(product)
  return (
    <View>
        <Image 
            source={{uri:`${API_PATH}/${product?.productImg}`}}
            style={styles.image}
        />
      <Text>{product?.title}</Text>
    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
    image:{
        width:'50%',
        height:200
    }
})