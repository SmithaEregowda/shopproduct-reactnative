import { Pressable, SafeAreaView, StyleSheet, Text,  View } from 'react-native'
import React, { useState } from 'react'
import { GolbalColors } from '../constants/styles'
import { Link, useNavigation } from '@react-navigation/native'
import Input from '../components/common/input'
import { signup } from '../services/authenticate'
import Loader from '../components/common/loader'
import Toast from 'react-native-root-toast'

const SignUp = () => {
  const [signupObj,setSignupObj]=useState({});
  const [loading,setLoading]=useState(false)
  const navigation=useNavigation();
  const upadteSignupObj=(name,value)=>{
    signupObj[name]=value;
    setSignupObj({...signupObj})
  }
  const signupHandler=()=>{
    setLoading(true)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupObj)
    };
    signup(requestOptions).then(data => {
        setLoading(false)
        console.log(data)
        if(data?.status===200){
           setLoading(false)
         Toast.show('Signed Up in successfully.', {
          duration: 1500,
          position: Toast.positions.CENTER,
          containerStyle:{
            backgroundColor:"green"
          }
        });
        if (data?.user) {
         navigation.navigate('login')
      }
        }else{
          setLoading(false)
          Toast.show(data?.message?data?.message:data?.data?.[0]?.msg, {
           duration: 1500,
           position: Toast.positions.CENTER,
           containerStyle:{
             backgroundColor:GolbalColors.error2
           }
         });
        }
        
        //setOpenModal(false)
    })
  }
  return (
    <>
    {loading&&<Loader loading={loading} />}
    <View style={styles.sinupWrapper}> 
     <SafeAreaView>
     <View>
     <Input
          // label="Email Address"
          onUpdateValue={(value)=>upadteSignupObj("name",value)}
          keyboardType={"text"}
          placeholder={"Name"}
        />
        <Input
          // label="Email Address"
          onUpdateValue={(value)=>upadteSignupObj("email",value)}
          keyboardType={"text"}
          placeholder={"Email Address"}
        />
        <Input
          // label="Email Address"
          onUpdateValue={(value)=>upadteSignupObj("MobileNumber",value)}
          keyboardType={"number"}
          placeholder={"Mobile Number"}
        />
        <Input
          // label="Email Address"
          onUpdateValue={(value)=>upadteSignupObj("Address",value)}
          keyboardType={"text"}
          placeholder={"Address Details"}
          numberOfLines={3}
        />
        <Input
          // label="Password"
          onUpdateValue={(value)=>upadteSignupObj("password",value)}
          secure
          placeholder={"Password"}
        />
        <Input
          // label="Password"
          onUpdateValue={(value)=>upadteSignupObj("confirmPassword",value)}
          secure
          placeholder={"Confirm Password"}
        />
      </View>
        <Pressable style={styles.logbtn} onPress={signupHandler}>
          <Text style={styles.btn}>Sign Up</Text>
        </Pressable>
        <View style={styles.signinCont}>
          <Text style={styles.text}> Aleready have account 
            <Link 
              to={{screen:"login"}}
              style={styles.link}
            >
              {" "}login?
            </Link>
          </Text>
        </View>
     </SafeAreaView>
    </View></>
  )
}

export default SignUp

const styles = StyleSheet.create({
  sinupWrapper:{
    paddingHorizontal:20,
    backgroundColor:GolbalColors.PRIMARY_BTN,
    flex:1,
    paddingTop:75
  },
  inputBox:{
    marginBottom:20
  },
  title:{
    color:GolbalColors.COLOR1,
    fontSize:25,
    padding:2,
    textAlign:'center'
  },
  label:{
    padding:5,
    backgroundColor:GolbalColors.BG3
  },
  btn:{
    color:GolbalColors.white,
    fontSize:20,
    fontWeight:"600",
    fontStyle:"italic"
  },
  input:{
    borderColor:GolbalColors.BORDER1,
    borderWidth:2,
    padding:5,
    margin:5
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
    marginTop:15
  },
  link:{
    color:GolbalColors.BG3,
    margin:25,
    fontWeight:"800"
  },text:{
    textAlign:"right",
    margin:5,
    fontSize:17,
    color:GolbalColors.white
  },
  forgotCont:{
    marginVertical:20,
    paddingLeft:120
  },fgText:{
    color:GolbalColors.CLR2,
    fontSize:15
  },signinCont:{
    marginVertical:20
  }
})