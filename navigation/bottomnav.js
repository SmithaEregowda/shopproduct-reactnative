import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Cart from "../screens/cart";
import Wishlist from "../screens/wishlist";
import Home from "../screens/home";
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { GolbalColors } from "../constants/styles";
import Orders from "../screens/orders";

const Tab=createBottomTabNavigator();

export const BottomNavigation=()=>{
 
return(
    // <NavigationContainer>
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
                }
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
                },
                headerStyle:{
                    backgroundColor:GolbalColors.PRIMARY_BTN2,
                    borderBottomLeftRadius:35,
                    borderBottomRightRadius:35,
                    height:160
                },
                headerTitleStyle:{
                    textTransform:"uppercase",
                    paddingLeft:150,
                    fontSize:35
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
                },headerStyle:{
                    backgroundColor:GolbalColors.PRIMARY_BTN2,
                    borderBottomLeftRadius:35,
                    borderBottomRightRadius:35,
                    height:160
                },
                headerTitleStyle:{
                    textTransform:"uppercase",
                    paddingLeft:150
                }
                // headerShown:false
            }
        }}
        />
        <Tab.Screen 
        name="orders" 
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
                },headerStyle:{
                    backgroundColor:GolbalColors.PRIMARY_BTN2,
                    borderBottomLeftRadius:35,
                    borderBottomRightRadius:35,
                    height:160
                },
                headerTitleStyle:{
                    textTransform:"uppercase",
                    paddingLeft:150,
                    fontSize:20
                }
            }
        }}
        />
    </Tab.Navigator>
// </NavigationContainer>
)
}