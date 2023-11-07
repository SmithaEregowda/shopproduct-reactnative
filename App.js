import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import Home from './screens/home';

export default function App() {
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
              name="home" 
              component={Home}
              options={{
                title:"Veggies Shop"
              }}
         />
        </Stack.Navigator>
    </NavigationContainer>
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
