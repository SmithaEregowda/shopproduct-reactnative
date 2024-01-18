import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Cart from "../screens/cart";
import Wishlist from "../screens/wishlist";
import Home from "../screens/home";
import { NavigationContainer } from '@react-navigation/native';

const Tab=createBottomTabNavigator();

export const BottomNavigation=()=>{
return(
    <NavigationContainer>
<Tab.Navigator screenOptions={{
    headerTintColor:"white",
    tabBarActiveTintColor:"green",
    headerStyle:{
        backgroundColor:"green"
    }
}}>
    <Tab.Screen 
    name="Veggies Shop" 
    component={Home}
    options={{
        tabBarLabel:"Home",
        // tabBarIcon:({color,size})=>(
        //     <Ionic
        // )
    }}
    />
    <Tab.Screen name="cart" component={Cart}/>
    <Tab.Screen name="wishlist" component={Wishlist}/>
</Tab.Navigator>
</NavigationContainer>
)
}