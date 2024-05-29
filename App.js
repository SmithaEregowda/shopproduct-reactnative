import {  StyleSheet} from 'react-native';
import { AuthContext, AuthContextProvider } from './store/auth';
import { useContext } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { BottomNavigation } from './navigation/bottomnav';
import AuthNavigator from './navigation/authnav';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Checkout from "./screens/checkout"
import { NavigationContainer } from '@react-navigation/native';
import OrderOverView from './screens/orderoverView';

export default function App() {
  const Stack=createNativeStackNavigator();
  const Navigation=()=>{
    const {authToken}=useContext(AuthContext)
    console.log(authToken)
    return(
     
      authToken?
      <Stack.Navigator>
        <Stack.Screen 
            name="Veggies Shop"
            component={BottomNavigation}
            options={{
              headerShown:false
            }}
        />
        <Stack.Screen 
            name="checkout"
            component={Checkout}
            // options={{
            //   headerShown:false
            // }}
        />
        <Stack.Screen 
            name="orderview"
            component={OrderOverView}
            // options={{
            //   headerShown:false
            // }}
        />
        </Stack.Navigator>
      :
      <AuthNavigator />
    )
  }


  return (
    <RootSiblingParent>
      <AuthContextProvider>
      <NavigationContainer>
      <Navigation />
      </NavigationContainer>
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
