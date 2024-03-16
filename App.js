import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View} from 'react-native';
import Home from './screens/home';
import { AuthContext, AuthContextProvider } from './store/auth';
import { useContext } from 'react';
import Login from './screens/login';
import { GolbalColors } from './constants/styles';
import SignUp from './screens/signup';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import Cart from './screens/cart';
import Wishlist from './screens/wishlist';
import { RootSiblingParent } from 'react-native-root-siblings';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { BottomNavigation } from './navigation/bottomnav';
import WelcomeApp from './screens/welcome';

export default function App() {
  const Stack=createNativeStackNavigator();
  const Tab=createBottomTabNavigator();
  
  const Navigation=()=>{
    const {authToken}=useContext(AuthContext)
    return(
     
      authToken?
        <BottomNavigation />
      :
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
      component={WelcomeApp}
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
              title:""
            }}
       />
      </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <RootSiblingParent>
      <AuthContextProvider>
     <Navigation />
    </AuthContextProvider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
