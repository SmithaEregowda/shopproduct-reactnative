import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { GolbalColors } from '../../constants/styles'
import { useNavigation } from '@react-navigation/native';

const OrderItem = ({product,orderId,totalPrice}) => {
    let API_PATH='https://shop-products-api-1q6w.vercel.app';
    const navigation=useNavigation();

    const handleoverviewnav=()=>{
       navigation.navigate("orderview",{
        orderId,
        product
       })
    }

  return (
   <TouchableOpacity onPress={handleoverviewnav}>
        <View style={styles.orderCard}>
        <View style={{flexDirection:"row"}}>
        <View style={styles.container1}>
            <View>
            <Text><Text style={styles.title}>Order Id</Text> #{orderId}</Text>
            <Text style={styles.price}>Total Amount:{totalPrice}</Text>
            </View>
            <View>
                {product?.isDeliverd==="Canceled"?
                <Text style={styles.red}>
                    Item Status:Item Has been Cancelled
                    </Text>:
                    <Text style={styles.green}>
                    Item Status:{
                    product?.isDeliverd==="Ordered"?
                    "Just Now Orderd"
                    : product?.isDeliverd==="Canceled"?
                    "Item Has been Cancelled":
                    product?.isDeliverd==="Delivered"?
                    "Item Has been Delivered":
                    "Item in Progress"
                    }
                    </Text>}
            </View>
        </View>
        <View style={styles.container2}>
        <Image 
                source={{uri:`${API_PATH}/${product?.productImg}`}}
                style={styles.image}
                />
        </View>
        </View>
        </View>
   </TouchableOpacity>
  )
}

export default OrderItem

const styles = StyleSheet.create({
    orderCard:{
        borderColor:GolbalColors.BORDER2,
        borderRadius:5,
        borderWidth:2,
        padding:10,
        margin:8,
        shadowColor:GolbalColors.shadow1,
        shadowRadius:2,
        shadowOffset:{width:-2,height:4},
        shadowOpacity:0.2,
        backgroundColor:GolbalColors.white
    },
    image:{
        width:'55%',
        height:120,
        display:"flex",
        justifyContent:"center"
    },
    container1:{
        width:190,
        gap:50
    },
    container2:{
        width:350
    },
    green:{
        color:GolbalColors.PRIMARY_BTN2
    },
    red:{
        color:GolbalColors.error
    },
    title:{
        fontWeight:"600"
    },
    price:{
        color:"#9a9898"
    }
})