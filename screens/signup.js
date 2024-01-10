import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { GolbalColors } from '../constants/styles'
import { Link } from '@react-navigation/native'

const SignUp = () => {
  return (
    <View style={styles.loginWrapper}>
    {/* <Text style={styles.title}>LOGIN</Text> */}
   <SafeAreaView>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input}  />
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} />
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Mobile Number</Text>
      <TextInput style={styles.input} />
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Adress</Text>
      <TextInput style={styles.input} />
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} />
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Confirm Password</Text>
      <TextInput style={styles.input} />
      </View>
      <View style={styles.logbtn}>
        <Button 
          title='Sign Up' 
          color={GolbalColors.PRIMARY_BTN2}
        />
      </View>
      <View>
        <Text style={styles.text}>don't have account 
          <Link 
            to={{screen:"login"}}
            style={styles.link}
          >
            {" "} Login?
          </Link>
        </Text>
      </View>
   </SafeAreaView>
  </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  loginWrapper:{
    justifyContent:'center',
    alignContent:"center",
    padding:20,
    marginTop:50
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
    padding:2
  },
  input:{
    borderColor:GolbalColors.BORDER1,
    borderWidth:2,
    padding:5,
    margin:1
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
  }
})