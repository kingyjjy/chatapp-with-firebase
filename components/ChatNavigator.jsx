import React, { useState, useEffect, useContext} from 'react'
import { AuthenticatedUserContext } from '../context/AuthenticatedUserProvider'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/index'
import { View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {LoginStack, ChatStack} from '../context'

const ChatNavigator = () => {
    const {user, setUser} = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading ] = useState(true);

    useEffect(()=>{
        const unSubscribeAuth = onAuthStateChanged(
            auth,
            async authUser => {
                authUser ? setUser(authUser) : setUser(null);
                setIsLoading(false);
            }
        );
        return unSubscribeAuth;
    }, [user]);

    if(isLoading){
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size='large' color='#00ff00'/>
            </View>
        )
    }
  return (
    <NavigationContainer>
        { user ? <ChatStack/> : <LoginStack/> }
    </NavigationContainer>
  )
}

export default ChatNavigator