import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ProductCard = ({product}) => {
    let API_PATH='https://shop-products-api-1q6w.vercel.app';
  return (
    <View style={styles.card}>
        <MaterialCommunityIcons name="heart-outline" color={"#5f5f5f"} size={25} style={styles.wishicon}/>
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
      <View >
        <View style={styles.btnActions}><Button title='Add To Cart' color={"green"}/></View>
        <View style={styles.btnActions}><Button title='Buy Now' color={"red"}/></View>
      </View>
    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
    card:{
        width:189,
        display:"grid",
        padding:"1rem",
        backgroundColor:"#ccc",
        margin:8,
        padding:8,
        position:"relative"
        },
        wishicon:{
            position:"absolute",
            right:0,
            zIndex:100,
            padding:6
        },
    image:{
        width:'100%',
        height:150,
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
        marginTop:2,
        marginBottom:2
    }
})