import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { TouchableOpacity, View, Image } from 'react-native';
import { collection, addDoc, orderBy, query, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';

const useImage = require("../assets/user.png");

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row', width: '50%', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <TouchableOpacity onPress={logout}>
                        <AntDesign name='logout' size={25} color={colors.gray} />
                    </TouchableOpacity>
                    <Image source={useImage} style={{ width: 50, height: 50, marginRight: 20 }} />
                </View>
            )
        });
    }, []);

    useEffect(() => {
        console.log('useEffect function called');
        const fetchMessages = async () => {
            const collectionRef = collection(database, 'chats');
            const q = query(collectionRef, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const fetchedMessages = [];
            querySnapshot.forEach(doc => {
                fetchedMessages.push(doc.data());
            });
            setMessages(fetchedMessages);
        };
        fetchMessages();
    }, []);

    const logout = () => {
        signOut(auth).then(() => console.log('로그아웃되었습니다.'))
            .catch((err) => { console.error(err); })
    }

    const onSend = useCallback((newMessages = []) => {
        console.log('onsend function called');
        setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
        newMessages.forEach(message => {
            const { _id, createdAt, text, user } = message;
            addDoc(collection(database, 'chats'), {
                _id,
                createdAt,
                text,
                user
            });
        });
    }, []);

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={false}
            showUserAvatar={false}
            onSend={messages => onSend(messages)}
            messagesContainerStyle={{ backgroundColor: '#fff' }}
            textInputStyle={{ backgroundColor: '#fff', borderRadius: 20 }}
            user={{
                _id: auth?.currentUser?.email,
                avatar: useImage
            }}
            renderAvatar={() => null}
            renderSend={() => null}
            renderUsernameOnMessage={true}
        />
    );
}

export default Chat;
