import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Cart from "../screens/cart";
import Wishlist from "../screens/wishlist";
import Home from "../screens/home";
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { GolbalColors } from "../constants/styles";
import Orders from "../screens/orders";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Checkout from "../screens/checkout";

const Tab=createBottomTabNavigator();

export const BottomNavigation=()=>{
    const Stack=createNativeStackNavigator();
return(
    <NavigationContainer>
        <Stack.Screen 
            name="checkout"
            component={Checkout}
        />
<Tab.Navigator screenOptions={{
    headerTintColor:"white",
    tabBarActiveTintColor:"green",
    tabBarVisibilityAnimationConfig:true,
    headerStyle:{
        backgroundColor:"green",
    },
    tabBarStyle: {
        backgroundColor:GolbalColors.BORDER1,
        height:50
    }
}}
>
    <Tab.Screen 
    name="Veggies Shop" 
    component={Home}
    options={(route)=>{
        return{
            tabBarLabel:"Home",
            tabBarIcon:({focused,color,size})=>{
                let sizeicons=size;
                if(route.route.name==="Veggies Shop"&&focused){
                    sizeicons=size*1.5;
                }
                return(
                    <MaterialCommunityIcons name="home" color={color} size={sizeicons}/>
                )
            },
            // tabBarBadge:"Test"
        }
    }}
    />
    <Tab.Screen 
    name="cart" 
    component={Cart}
    options={(route)=>{
        return{
            tabBarLabel:"Cart",
            tabBarIcon:({focused,color,size})=>{
                let sizeicons=size;
                if(route.route.name==="cart"&&focused){
                    sizeicons=size*1.5;
                }
                return(
                    <MaterialCommunityIcons name="cart" color={color} size={sizeicons}/>
                )
            }
        }
    }}
    />
    <Tab.Screen 
    name="wishlist" 
    component={Wishlist}
    options={(route)=>{
        return{
            tabBarLabel:"Wishlist",
            tabBarIcon:({focused,color,size})=>{
                let sizeicons=size;
                if(route.route.name==="wishlist"&&focused){
                    sizeicons=size*1.5;
                }
                return(
                    <MaterialCommunityIcons name="cards-heart" color={color} size={sizeicons}/>
                )
            },
            // headerShown:false
        }
    }}
    />
    <Tab.Screen 
    name="Orders" 
    component={Orders}
    options={(route)=>{
        return{
            tabBarLabel:"orders",
            tabBarIcon:({focused,color,size})=>{
                let sizeicons=size;
                if(route.route.name==="orders"&&focused){
                    sizeicons=size*1.5;
                }
                return(
                    <MaterialCommunityIcons name="view-list" color={color} size={sizeicons}/>
                )
            }
        }
    }}
    />
</Tab.Navigator>
</NavigationContainer>
)
}