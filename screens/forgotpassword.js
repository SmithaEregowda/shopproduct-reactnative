import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/common/input'
import { GolbalColors } from '../constants/styles'
import { forgotpassword } from '../services/authenticate'
import Loader from '../components/common/loader'
import Toast from 'react-native-root-toast'
import { useNavigation } from '@react-navigation/native'

const ForgotPassword = () => {
    const [loading,setLoading]=useState(false)
    const [email,setEmail]=useState();
    const navigation=useNavigation();

    const forgotpassHandler=()=>{
        setLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        };
        forgotpassword(requestOptions).then(data => {
            if(data?.link){
                Toast.show(data?.message, {
                    duration: 1500,
                    position: Toast.positions.CENTER,
                    containerStyle:{
                      backgroundColor:"green"
                    }
                  });
                  navigation.navigate("reset",{
                    resetId:data?.link
                  })
                  setLoading(false)
            }else{
               
                    Toast.show("please verify email", {
                        duration: 1500,
                        position: Toast.positions.CENTER,
                        containerStyle:{
                          backgroundColor:"red"
                        }
                      });
                      setLoading(false)
            }
        })
        
    }

  return (
    <>
    {loading&&<Loader loading={loading} />}
    <View style={styles.forgotWrapper}>
     <SafeAreaView>
     <View>
        <Input
          // label="Email Address"
          onUpdateValue={(value)=>setEmail(value)}
          keyboardType="email-address"
          placeholder={"Email Address"}
        />
      </View>
        
        <Pressable style={styles.logbtn} onPress={forgotpassHandler}>
          <Text style={styles.btn}>Confirm Email Address</Text>
        </Pressable>
     </SafeAreaView>
    </View>
   </>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    forgotWrapper:{
    paddingHorizontal:20,
    backgroundColor:GolbalColors.PRIMARY_BTN,
    flex:1,
    justifyContent:"center",
    paddingBottom:100
    },
    logbtn:{
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: GolbalColors.BG3,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10,
        marginTop:10
    },
    btn:{
      color:GolbalColors.white,
      fontSize:20,
      fontWeight:"600",
      fontStyle:"italic"
    }
})