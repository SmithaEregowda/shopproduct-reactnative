import { ActivityIndicator, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { GolbalColors } from '../constants/styles'
import { Link, useNavigation } from '@react-navigation/native'
import { login } from '../services/authenticate'
import { AuthContext } from '../store/auth'

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
  })
  }

  return (
    <View style={styles.loginWrapper}>
      {/* <Text style={styles.title}>LOGIN</Text> */}
      {loading&&<ActivityIndicator animating={true} size={'large'} style={styles.loader}/>}
     <SafeAreaView>
        <View style={styles.inputBox}>
          <Text style={styles.label}>User Name</Text>
        <TextInput 
        style={styles.input} name={"userName"} 
        onChangeText={(value)=>updateLoginObj("username",value)}
        />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input}
        onChangeText={(value)=>updateLoginObj("password",value)} />
        </View>
        <View style={styles.logbtn}>
          <Button 
            title='Login' 
            color={GolbalColors.PRIMARY_BTN2}
            onPress={logintoApp}
          />
        </View>
        <View>
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
    justifyContent:'center',
    alignContent:"center",
    padding:20,
    marginTop:70
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
    padding:5
  },
  input:{
    borderColor:GolbalColors.BORDER1,
    borderWidth:2,
    padding:5,
    margin:5
  },
  logbtn:{
    margin:5
  },
  link:{
    color:GolbalColors.Link,
    margin:25
  },text:{
    textAlign:"right",
    margin:5
  },
  loader:{
    position:'absolute',
    // left:170,
    width:"130%",
     height:"410%",
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    zIndex: 100,
  }
})