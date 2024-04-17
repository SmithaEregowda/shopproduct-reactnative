import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import welcomeApp from '../screens/welcome'
import Login from '../screens/login';
import SignUp from '../screens/signup';
import ForgotPassword from '../screens/forgotpassword'; 
import ResetPassword from '../screens/resetpassword'


const AuthNavigator = () => {
    const Stack=createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
       headerStyle:{
        backgroundColor:"green"
       },
       headerTintColor:"white"
      }}
    >
    
        <Stack.Screen 
        name="welcome" 
        component={welcomeApp}
        options={{
        title:"VEGGIES SHOP"
        }}
        />
    
     <Stack.Screen 
          name="login" 
          component={Login}
          options={{
            headerShown:false
          }}
     />
     <Stack.Screen 
          name="signup" 
          component={SignUp}
          options={{
            headerShown:false
          }}
     />
     <Stack.Screen 
          name="forgot" 
          component={ForgotPassword}
          options={{
            headerShown:false
          }}
     />
     <Stack.Screen 
          name="reset" 
          component={ResetPassword}
          options={{
            headerShown:false
          }}
     />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthNavigator

const styles = StyleSheet.create({})