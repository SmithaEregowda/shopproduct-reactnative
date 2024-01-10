import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductCard = ({product}) => {
    let API_PATH='https://shop-products-api-1q6w.vercel.app';
  return (
    <View style={styles.card}>
        <Image 
            source={{uri:`${API_PATH}/${product?.productImg}`}}
            style={styles.image}
        />
      <View style={styles.details}>
      <View>
      <Text style={styles.title}>{product?.title}</Text>
      <Text style={styles.subtitle}>{product?.subTitle}</Text>
      </View>
      <Text style={styles.price}>RS.{product?.price}</Text>
      </View>
      <View style={styles.btnActions}>
        <Button title='Add To Cart' color={"green"}/>
        <Button title='Buy Now' color={"red"}/>
      </View>
    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
    card:{
        width:300,
        display:"grid",
        padding:"1rem",
        backgroundColor:"#ccc",
        margin:8,
        padding:8
        },
    image:{
        width:'100%',
        height:200,
        display:"flex",
        justifyContent:"center"
    },
    title:{
        fontSize:18,
        textTransform:"capitalize",
        width:100,
        justifyContent:"center"
    },
    details:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    price:{
        fontSize:18,
        color:"green"
    },
    btnActions:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:4,
        marginBottom:4
    }
})