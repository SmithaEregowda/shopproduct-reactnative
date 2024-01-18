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
            name="home" 
            component={Home}
            options={({ navigation, route }) => ({
              title:"Veggies Shop",
              headerRight:()=>{
                return <View>
                 
                  <Button 
                    title='Login/Signup'
                    color={GolbalColors.PRIMARY_BTN}
                    onPress={()=>navigation.navigate('login')}
                  />
                </View>
              }
            })}
       />
       <Stack.Screen 
            name="login" 
            component={Login}
            options={{
              title:"Login to Veggies Shop"
            }}
       />
       <Stack.Screen 
            name="signup" 
            component={SignUp}
            options={{
              title:"Register to Veggies Shop"
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
