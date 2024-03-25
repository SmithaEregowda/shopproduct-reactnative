import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/common/input'
import Loader from '../components/common/loader';
import { resetPassword } from '../services/authenticate';
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';
import { GolbalColors } from '../constants/styles';

const ResetPassword = ({navigation,route}) => {
    const [currentPswd,setCurrentPswd]=useState()
    const [newPswd,setNewPswd]=useState();
    const [loading,setLoading]=useState(false);
    const [cnfPassword,setcnfPassword]=useState()
    // const navigation=useNavigation();

    const resetpasswordhandler=()=>{
        setLoading(true)
        if (newPswd !== cnfPassword) {
            setLoading(false)
            Toast.show('password does not match', {
                duration: 1500,
                position: Toast.positions.CENTER,
                containerStyle:{
                  backgroundColor:GolbalColors.error2
                }
              });
            return;
          }
          let data = {
            password: currentPswd,
            newPassword: newPswd
          }
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          };
          console.log("first")
          resetPassword(requestOptions,route.params.resetId).then(data => {
            if(data?.status===200){
                setLoading(false)
               Toast.show('Password Reset  successfully.', {
                duration: 1500,
                position: Toast.positions.CENTER,
                containerStyle:{
                  backgroundColor:"green"
                }
              });
              navigation.navigate("login")
              }else{
                setLoading(false)
                Toast.show(data?.message, {
                 duration: 1500,
                 position: Toast.positions.CENTER,
                 containerStyle:{
                   backgroundColor:GolbalColors.error2
                 }
               });
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
          onUpdateValue={(value)=>setCurrentPswd(value)}
          keyboardType="password"
          placeholder={"Current Password"}
        />
      </View>

      <View>
        <Input
          // label="Email Address"
          onUpdateValue={(value)=>setNewPswd(value)}
          keyboardType="password"
          placeholder={"New Password"}
        />
      </View>

      <View>
        <Input
          // label="Email Address"
          onUpdateValue={(value)=>setcnfPassword(value)}
          keyboardType="password"
          placeholder={"Confirm Password"}
        />
      </View>
        
        <Pressable style={styles.logbtn} onPress={resetpasswordhandler}>
          <Text style={styles.btn}>Reset Password</Text>
        </Pressable>
     </SafeAreaView>
    </View>
   </>
  )
}

export default ResetPassword

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