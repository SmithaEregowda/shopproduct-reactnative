import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../store/auth';
import { getwishlistByUser ,removefromwishlist,postWishList} from '../services/wishlist';
import Loader from '../components/common/loader'
import Toast from 'react-native-root-toast'
import TochableIcons from "../components/common/touchableicon"
import { postCart } from '../services/cart';

const ProductCard = ({product,pageType,getWishlistProds}) => {
    let API_PATH='https://shop-products-api-1q6w.vercel.app';
    const navigation=useNavigation();
    const {authToken,userId}=useContext(AuthContext);
    const [wishListItems, setWishListItems] = useState([])
    const [loading,setLoading]=useState(false)
    const checkoutHandler=()=>{
        navigation.navigate("checkout",{
            product:product
        })
    }

    useFocusEffect(
      useCallback(()=>{
        if(userId&&authToken&&pageType==="home"){
          getWishListByUserId(authToken,userId)
      }
      },[userId,authToken,pageType])
    )

    // useEffect(()=>{
    //     if(userId&&authToken&&pageType==="home"){
    //         getWishListByUserId(authToken,userId)
    //     }
    // },[userId,authToken,pageType])

  const getWishListByUserId = (token, user) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    getwishlistByUser(user, requestOptions).then((data) => {
      setWishListItems(data?.wishlist?.products)
    })
  }

    const handleWishlistIconClick = () => {
        if(wishListItems && wishListItems.length > 0 &&
            wishListItems.findIndex(p => p.productId.toString() ===
             product?._id) > -1){
                removefromwishlisthandler()
             }else{
                addtoWishListHandler()
             }
      };

      const removefromwishlisthandler = () => {
        setLoading(true)
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        };
        removefromwishlist(userId, product?._id, requestOptions)
            .then((data) => {
                Toast.show('Removed from wishlist successfully.', {
                    duration: 1500,
                    position: Toast.positions.CENTER,
                    containerStyle:{
                      backgroundColor:"green"
                    }
                  });
                if(pageType==="wishlist"){
                  getWishlistProds()
                  setLoading(false)
                }
                if(pageType==="home"){
                  getWishListByUserId(authToken,userId)
                }
                setLoading(false)
                
            })
      }

      const addtoWishListHandler = () => {
        setLoading(true)
        if(authToken){
          const payload = {
            userId: userId,
            prodId: product?._id
          }
          
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify(payload)
          };
      
          postWishList(requestOptions).then((data) => {
            Toast.show('added to wishlist successfully.', {
                duration: 1500,
                position: Toast.positions.CENTER,
                containerStyle:{
                  backgroundColor:"green"
                }
              });
              getWishListByUserId(authToken,userId)
            setLoading(false)
          })
        }
      }

      const handleAddToCart = () => {
        setLoading(true)
          const payload = {
            userId: userId,
            prodId: product?._id
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
            setLoading(false)
          })
        
      }

  return (
    <>
    {loading&&<Loader loading={loading} />}
    <View style={styles.card}>
        {
          pageType==="home"?
          <TochableIcons 
            name={`${ (wishListItems && wishListItems.length > 0 &&
                    wishListItems.findIndex(p => p.productId.toString() ===
                     product?._id) > -1) ?"heart":"heart-outline"}`} 
                     color={"#5f5f5f"} 
                     size={25}
                     style={styles.wishicon}
                     handleClick={handleWishlistIconClick}
                     wishListItems={wishListItems}
                     />:pageType==="wishlist"? <TochableIcons 
                              name={"trash-can-outline"} 
                              color={"#ea0f0f"} 
                              size={25}
                              style={styles.wishicon}
                              handleClick={removefromwishlisthandler}
                              wishListItems={wishListItems}
                              />:""
        }
              
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
        <View style={styles.btnActions}>
          <Button title='Add To Cart' color={"green"} onPress={()=>handleAddToCart()}/>
        </View>
        {
        pageType==="home"&&
        <View style={styles.btnActions}>
          <Button title='Buy Now' color={"red"} onPress={()=>checkoutHandler(product)}/>
        </View>
        }
      </View>
    </View>
   </>
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