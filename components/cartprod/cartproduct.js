import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { GolbalColors } from '../../constants/styles'
import TochableIcons from '../common/touchableicon';
import { AuthContext } from '../../store/auth';
import { postCart, removefromCart } from '../../services/cart';
import Toast from 'react-native-root-toast';

const CartProduct = ({prod,cartItems,setLoading,getCartByUserInfo,page}) => {
    
    let prodQty=cartItems?.products?.find((item)=>item?.product===prod?._id)?.quantity;
    let API_PATH='https://shop-products-api-1q6w.vercel.app';
    const {userId,authToken}=useContext(AuthContext)

    const updateCartHandler = (qty) => {
        setLoading(true)
        const payload = {
            userId: userId,
            prodId: prod?._id,
            quantity: qty
        }
       
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify(payload)
        };
        postCart(requestOptions).then((data) => {
            Toast.show(data?.message, {
                duration: 1500,
                position: Toast.positions.CENTER,
                containerStyle:{
                  backgroundColor:data?.status==200?'green':"red"
                }
              });
              if(data?.status===200||data?.status===201){
                getCartByUserInfo()
              }
            setLoading(false)
            //router.reload('/cart')
        })

    }

    const removefromCartHandler = () => {
        setLoading(true)
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        };
        removefromCart(userId, prod?._id, requestOptions)
            .then((data) => {
                Toast.show(data?.message, {
                    duration: 1500,
                    position: Toast.positions.CENTER,
                    containerStyle:{
                      backgroundColor:data?.status==200?'green':"red"
                    }
                  });
                  if(data?.status===200||data?.status===201){
                    getCartByUserInfo()
                  }
                setLoading(false)
                //router.reload('/cart')
            })
    }

  return (
    <View style={styles.cartCard}>
      <View style={styles.cardConatiner}>
        <View style={styles.itemInfo}>
        <View style={styles.itemText}>
            {page!=="checkout"&&
            <View style={styles.removeCart}>
            <TochableIcons 
                name={"cart-remove"} 
                color={GolbalColors.error2} 
                size={30}
                // style={styles.wishicon}
                handleClick={removefromCartHandler}
            />
        </View>
        }
            <View style={styles.textInfo}>
            <Text style={styles.title}>{prod?.title}</Text>
            <Text style={styles.subtitle}>{prod?.subTitle}</Text>
            </View>
        </View>
            <Image 
            source={{uri:`${API_PATH}/${prod?.productImg}`}}
            style={styles.image}
            />
            
             <View><Text style={styles.title}>Rs.{prod?.price}</Text></View>
        </View>
        {page!=="checkout"&&
        <View style={styles.qtyInfo}>
            
        <View style={styles.qtyIcon}>
        <TochableIcons 
            name={"plus"} 
            color={GolbalColors.white} 
            size={25}
            // style={styles.wishicon}
            handleClick={()=>updateCartHandler(prodQty+1)}
        />
        </View>
        <View >
        <Text style={styles.qtyText}>{prodQty}</Text>
        </View>
        <View style={styles.qtyIcon2}>
        <TochableIcons 
            name={"minus"} 
            color={GolbalColors.white} 
            size={25}
            // style={styles.wishicon}
            handleClick={()=>updateCartHandler(prodQty-1)}
        />
        </View>
        <View><Text style={styles.totalPrice}>Rs.{prod?.price*prodQty}</Text></View>
    </View>
    }
      </View>
    </View>
  )
}

export default CartProduct

const styles = StyleSheet.create({
    cartCard:{
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
    cardConatiner:{
        flexDirection:"row"
    },
    itemInfo:{
        flex:1,
        
    },
    itemText:{
        flexDirection:"row",
        gap:15
    },
    textInfo:{
        marginLeft:50
    },
    removeCart:{
        position:"absolute",
        backgroundColor:GolbalColors.PRIMARY_BTN,
        left:-10,
        top:-10,
        padding:10
        },
    title:{
        textTransform:"capitalize"
    },
    subtitle:{
        paddingVertical:5,
        color:GolbalColors.COLOR2
    },
    qtyInfo:{
        justifyContent:"flex-end",
        padding:10,
        flexDirection:"column",
        gap:15,
        width:70,
        paddingTop:40
       },
    image:{
        width:'85%',
        height:130,
        display:"flex",
        justifyContent:"center"
    },
    qtyIcon:{
        backgroundColor:GolbalColors.PRIMARY_BTN,
        borderRadius:50,
        padding:3,
        width:33
    },
    qtyIcon2:{
        backgroundColor:GolbalColors.error,
        borderRadius:50,
        padding:3,
        width:33
    },
    qtyText:{
        fontSize:16,
        paddingLeft:10
    },
    totalPrice:{
        color:GolbalColors.error
    }
})