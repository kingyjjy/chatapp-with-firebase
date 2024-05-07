import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/Home";
import Chat from "../screens/Chat";

function LoginStack(){
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Signup" component={Signup}/>
        </Stack.Navigator>
    )
}

function ChatStack(){
    return (
        <Stack.Navigator defaultScreenOptions={Home}>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Chat" component={Chat}/>
        </Stack.Navigator>
    )
}

export {LoginStack, ChatStack}