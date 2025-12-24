import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Link } from 'expo-router';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { useThemeColors } from '@/contexts/ThemeColors';
import Header, { HeaderIcon } from '@/components/Header';
import Avatar from '@/components/Avatar';
import ThemedText from '@/components/ThemedText';
import ActionSheetThemed from '@/components/ActionSheetThemed';
import Icon from '@/components/Icon';
import PageLoader from '@/components/PageLoader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mockChats } from '@/lib/chats';
import { getAIResponse, AIMessage } from '@/lib/ai';

interface Message {
    id: string;
    text: string;
    timestamp: string;
    isSent: boolean;
}


export default function ChatDetailScreen() {
    const insets = useSafeAreaInsets();
    const { id } = useLocalSearchParams();
    const chatUser = mockChats.find(u => u.id === id) || mockChats[0];

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>(
        id === '5' ? [
            { id: '1', text: 'Hola... uugh, ¿estás ahí? Estoy aburridísima...', timestamp: 'Ahora', isSent: false }
        ] : [
            { id: '1', text: 'Hola, ¿cómo estás?', timestamp: '9:30 AM', isSent: false },
            { id: '2', text: '¡Hola! Todo bien, gracias. ¿Y tú?', timestamp: '9:31 AM', isSent: true },
        ]
    );
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const inputRef = useRef<TextInput>(null);
    const flatListRef = useRef<FlatList>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const scrollToBottom = useCallback(() => {
        if (flatListRef.current && messages.length > 0) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages.length]);

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Scroll to bottom after loading
            setTimeout(scrollToBottom, 100);
        }, 1000);

        // Set up keyboard listeners
        const keyboardWillShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => {
                setKeyboardHeight(e.endCoordinates.height);
                // Scroll to bottom when keyboard shows
                setTimeout(scrollToBottom, 100);
            }
        );

        const keyboardWillHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                setKeyboardHeight(0);
                // Scroll to bottom when keyboard hides
                setTimeout(scrollToBottom, 100);
            }
        );

        return () => {
            clearTimeout(timer);
            keyboardWillShowListener.remove();
            keyboardWillHideListener.remove();
        };
    }, [scrollToBottom]);

    // Effect to scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    if (isLoading) {
        return <PageLoader text="Loading chat..." />;
    }

    const handleSend = async () => {
        if (message.trim()) {
            const userText = message.trim();
            const newMessage: Message = {
                id: Date.now().toString(),
                text: userText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isSent: true,
            };

            const updatedMessages = [...messages, newMessage];
            setMessages(updatedMessages);
            setMessage('');

            // AI Bot specific logic
            if (id === '5') {
                setIsTyping(true);

                // Convert current messages to AI format
                const aiHistory: AIMessage[] = updatedMessages.map(m => ({
                    role: m.isSent ? 'user' : 'assistant',
                    content: m.text
                }));

                // Add delay for realism
                setTimeout(async () => {
                    const aiResponse = await getAIResponse(aiHistory);
                    const botMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        text: aiResponse,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        isSent: false,
                    };
                    setMessages(prev => [...prev, botMessage]);
                    setIsTyping(false);
                }, 1500);
            }
        }
    };

    const renderMessage = ({ item }: { item: Message }) => (
        <View
            className={`flex-row ${item.isSent ? 'justify-end' : 'justify-start'} mb-4 px-4`}
        >
            <View
                className={`rounded-2xl px-4 py-2 max-w-[80%] ${item.isSent ? 'bg-highlight' : 'bg-light-secondary dark:bg-dark-secondary'}`}
            >
                <ThemedText className={item.isSent ? 'text-white' : ''}>{item.text}</ThemedText>
                <ThemedText className={`text-xs mt-1 ${item.isSent ? 'text-white/70' : 'text-light-subtext dark:text-dark-subtext'}`}>
                    {item.timestamp}
                </ThemedText>
            </View>
        </View>
    );

    const rightComponents = [
        <HeaderIcon
            icon="MoreVertical"
            onPress={() => actionSheetRef.current?.show()}
        />
    ];

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <View
                //style={{ paddingBottom: insets.bottom }}
                className="flex-1 bg-light-primary dark:bg-dark-primary">
                <Header
                    title={chatUser.name}
                    className='border-b border-light-secondary dark:border-dark-secondary'
                    showBackButton
                    rightComponents={rightComponents}
                    leftComponent={
                        <View className='mr-2'>
                            <Avatar
                                size="sm"
                                src={chatUser.avatar}
                                name={chatUser.name}
                                className='mr-1'
                            />
                        </View>
                    }
                />

                <FlatList
                    ref={flatListRef}
                    //style={{ paddingBottom: insets.bottom + 200 }}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={
                        isTyping ? (
                            <View className="px-4 py-2 ml-4 mb-4 bg-light-secondary dark:bg-dark-secondary rounded-2xl self-start">
                                <ThemedText className="italic text-xs opacity-60">Escribiendo...</ThemedText>
                            </View>
                        ) : null
                    }
                    contentContainerStyle={{
                        paddingTop: 20, paddingBottom: 20
                    }}
                    onContentSizeChange={scrollToBottom}
                    onLayout={scrollToBottom}
                />


                <View
                    style={{
                        paddingBottom: insets.bottom,
                        //bottom: Platform.OS === 'ios' ? keyboardHeight : 0
                        //position: Platform.OS === 'ios' ? 'absolute' : 'relative'
                    }}
                    className="p-2 pb-0  z-50  w-full  border-t border-light-secondary dark:border-dark-secondary bg-light-primary dark:bg-dark-primary"
                >
                    <View className="flex-row items-end bg-light-secondary dark:bg-dark-secondary rounded-xl px-4 py-2">
                        <TextInput
                            ref={inputRef}
                            value={message}
                            onChangeText={setMessage}
                            placeholder="Type a message..."
                            placeholderTextColor="#999"
                            multiline
                            onFocus={() => {
                                // Add a space when the input is focused
                                if (!message) {
                                    setMessage(' ');
                                }
                                // Ensure we scroll to bottom when keyboard appears
                                setTimeout(scrollToBottom, 0);
                            }}
                            className="flex-1 max-h-32 text-black dark:text-white"
                            style={{
                                minHeight: 30,
                                fontSize: 16,
                                lineHeight: Platform.OS === 'android' ? 30 : 0,
                                paddingTop: Platform.OS === 'android' ? 0 : 5,
                                paddingBottom: Platform.OS === 'android' ? 0 : 0
                            }}
                        />
                        <TouchableOpacity
                            onPress={handleSend}
                            className="ml-2 mb-1"
                            disabled={!message.trim()}
                        >
                            <Icon
                                name="Send"
                                size={24}
                                className={message.trim() ? 'text-highlight' : 'opacity-50'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>


                <ActionSheetThemed
                    ref={actionSheetRef}
                    gestureEnabled
                    containerStyle={{
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20
                    }}
                >
                    <View className="p-4">
                        <TouchableOpacity className="py-4 flex-row items-center">
                            <Icon name="User" size={20} className="mr-3" />
                            <ThemedText>View Profile</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity className="py-4 flex-row items-center">
                            <Icon name="Slash" size={20} className="mr-3" />
                            <ThemedText>Block User</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity className="py-4 flex-row items-center">
                            <Icon name="Flag" size={20} className="mr-3" />
                            <ThemedText>Report User</ThemedText>
                        </TouchableOpacity>
                    </View>
                </ActionSheetThemed>
            </View>
        </KeyboardAvoidingView>
    );
}
