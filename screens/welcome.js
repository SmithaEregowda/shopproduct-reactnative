import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAssets } from 'expo-asset';
import { GolbalColors } from '../constants/styles';
import { useNavigation } from '@react-navigation/native';

const WelcomeApp = () => {
    const [assets, error] = useAssets([require('../assets/veg1.png'),]);
    const navigation=useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.firstcont}>
            {assets&&
                <View style={styles.image}>
                    <Image source={assets[0]}/>
                </View>
            }
        </View>
        <SafeAreaView style={styles.secondcont}>
        <View style={styles.btnContainer}>
        
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("login")}>
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.WelcomeApp}>Welcome To</Text>
        <Text style={styles.title}>Veggies Shop</Text>
        </View>
        </View>
        </SafeAreaView>
    </View>
  )
}

export default WelcomeApp

const styles = StyleSheet.create({
    container:{
       display:"flex",
       flex:1,
       gap:70
    },
    image:{
        justifyContent:"center",
        alignItems:"center",
        marginBottom:50
    },
    firstcont:{
        padding:10,
        flex:1
    },
    secondcont:{
        backgroundColor:GolbalColors.PRIMARY_BTN,
        flex:1,
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
    },
    textContainer:{
        // flex:1,
        justifyContent:"center",
        alignItems:"center",
        marginTop:25
    },
    title:{
        fontSize:40,
        // paddingLeft:100,
        // color:GolbalColors.PRIMARY_BTN2,
        fontWeight:"600"
        
    },
    WelcomeApp:{
        fontSize:25
    },
    button:{
        backgroundColor:GolbalColors.BG1,
        padding:15,
        width:200,
        justifyContent:"center",
        alignItems:"center",
        marginTop:50,
        borderRadius: 15,
    },
    btnText:{
        fontSize:20,
        color:GolbalColors.white,
    },
    btnContainer:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:GolbalColors.PRIMARY_BTN,
        padding:10,
        width:"auto",
        borderRadius: 50,
        // flex:1
    }
})