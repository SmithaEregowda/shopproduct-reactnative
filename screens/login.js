import { ActivityIndicator, Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { GolbalColors } from '../constants/styles'
import { Link, useNavigation } from '@react-navigation/native'
import { login } from '../services/authenticate'
import { AuthContext } from '../store/auth'
import Loader from '../components/common/loader'
import Toast from 'react-native-root-toast'
import Input from '../components/common/input'

const Login = () => {
  const [loginobj,setLoginObj]=useState({});
  const {handleauthToken,setUserId}=useContext(AuthContext)
  const navigation=useNavigation();
  const [loading,setLoading]=useState(false)
  const updateLoginObj=(name,value)=>{
   loginobj[name]=value;
   setLoginObj({...loginobj})
  }

  const logintoApp=()=>{
    setLoading(true)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginobj)
  };
  
  login(requestOptions).then(data => {
     if(data?.token&&data?.user){
      handleauthToken(data?.token);
      setUserId(data?.user);
      // navigation.navigate('home')
     }
     setLoading(false)
     Toast.show('Logged in successfully.', {
      duration: 1500,
      position: Toast.positions.CENTER,
      containerStyle:{
        backgroundColor:"green"
      }
    });
  })
  }

  
  return (
    <View style={styles.loginWrapper}>
      {/* <Text style={styles.title}>LOGIN</Text> */}
      {loading&&<Loader loading={loading} />}
     <SafeAreaView>
     <View>
        <Input
          // label="Email Address"
          onUpdateValue={(value)=>updateLoginObj("username",value)}
          keyboardType="email-address"
          placeholder={"Email Address"}
        />
        <Input
          // label="Password"
          onUpdateValue={(value)=>updateLoginObj("password",value)}
          secure
          placeholder={"Password"}
        />
      </View>
      <View style={styles.forgotCont}>
        <Text style={styles.fgText}>Forgot Password?</Text>
      </View>
        
        <Pressable style={styles.logbtn} onPress={logintoApp}>
          <Text style={styles.btn}>Login</Text>
        </Pressable>
        <View style={styles.signupCont}>
          <Text style={styles.text}>don't have account 
            <Link 
              to={{screen:"signup"}}
              style={styles.link}
            >
              {" "}Signup?
            </Link>
          </Text>
        </View>
     </SafeAreaView>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  loginWrapper:{
    // justifyContent:"center",
    paddingHorizontal:20,
    backgroundColor:GolbalColors.PRIMARY_BTN,
    flex:1,
    paddingTop:200
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
    borderBottomLeftRadius:10
  },
  link:{
    color:GolbalColors.PRIMARY_BTN3,
    margin:25
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
  },signupCont:{
    marginVertical:20
  }
})