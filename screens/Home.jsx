import React, {useEffect} from 'react'
import { View, TouchableOpacity, Image, StyleSheet, Platform  } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons'
import colors from '../colors'
import { auth } from '../config'
import { signOut } from 'firebase/auth'

const useImage = require("../assets/user.png");

const Home = () => {
    const navigation = useNavigation();
    const logout = ()=>{
        signOut(auth).then(()=>console.log('로그아웃되었습니다.'))
                        .catch((err)=>{ console.error(err); })
    }
    useEffect(()=>{
        navigation.setOptions({
            headerLeft: ()=>(
                <FontAwesome name='search' size={25} color={colors.gray} style={{marginLeft: 20}}/>
            ),
            headerRight: ()=>(
                <View style={{flexDirection:'row', width:'50%', justifyContent:'flex-end', alignItems:'center'}}>
                    <TouchableOpacity onPress={logout}>
                        <AntDesign name='logout' size={25} color={colors.gray}/>
                    </TouchableOpacity>
                    <Image source={useImage} style={{width:50, height:50, marginRight:20}}/>
                </View>
            )
        });
    }, []);

    const navigateToChat = () => {
        navigation.navigate("Chat");
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={navigateToChat} style={styles.chatButton}>
            <Entypo name='chat' size={28} color={colors.lightGray}/>
        </TouchableOpacity>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        backgroundColor:'#fff'
    },
    chatButton: {
        backgroundColor:colors.primary,
        height:60,
        width:60,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        ...Platform.select({
            ios:{
                shadowColor:colors.primary,
                shadowOffset:{
                    width:0,
                    height:2
                },
                shadowOpacity:.9,
                shadowRadius:8
            },
            android:{
                elevation:3
            }
        }),
        marginRight:20,
        marginBottom:50
    }
});