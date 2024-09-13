import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  getMessagesByChatId,
  addMessage,
  deleteChatMessages,
} from '../store/database';
import HeaderComponent from '../components/HeaderComponent';
import { colors } from '../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

// Placeholder images for user and agent profile pictures
const agentProfilePic = 'https://picsum.photos/200';
// const userProfilePic = 'https://picsum.photos/200';

const HelpAndSupport = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatId = 1; // Assume chat ID is always 1
  const userId = 1; // Assume the user's ID
  const agentId = 2; // Assume the agent's ID

  const flatListRef = useRef(null);

  useEffect(() => {
    // Fetch chat messages when the component mounts
    const fetchMessages = async () => {
      const fetchedMessages = await getMessagesByChatId(chatId);
      setMessages(fetchedMessages);
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim().length === 0) {
      return;
    }

    // Add the new message to the database
    await addMessage(chatId, userId, newMessage);

    // Update the local message list
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now().toString(),
        chat_id: chatId,
        sender_id: userId,
        content: newMessage,
      },
    ]);

    setNewMessage(''); // Clear the input field
  };

  const handleNewChat = async () => {
    // Delete previous chat messages
    await deleteChatMessages(chatId);

    // Start a new chat with an initial message from the agent
    await addMessage(chatId, agentId, 'Hi there, how can I help you?');

    // Fetch messages for the new chat
    const fetchedMessages = await getMessagesByChatId(chatId);
    setMessages(fetchedMessages);
  };

  const renderMessage = ({ item }) => {
    const isAgent = item.sender_id === agentId;
    return (
      <View
        style={[
          styles.messageContainer,
          isAgent ? styles.agentMessage : styles.userMessage,
        ]}
      >
        {isAgent && (
          <Image source={{ uri: agentProfilePic }} style={styles.profilePic} />
        )}
        <Text
          style={[
            styles.messageText,
            isAgent ? styles.agentMessageColor : styles.userMessageColor,
          ]}
        >
          {item.content}
        </Text>
        {/* {!isAgent && (
          <Image source={{ uri: userProfilePic }} style={styles.profilePic} />
        )} */}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-2 pt-1"
      >
        {/* Chat Header */}
        <HeaderComponent
          title="Help and Feedback"
          showThirdButton={true}
          handleThirdButton={handleNewChat}
        />

        {/* Chat Body */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.chatBody}
          onContentSizeChange={() => {
            setTimeout(() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
          }}
        />

        {/* Chat Bottom */}
        <View style={styles.chatBottom}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message"
          />
          <TouchableOpacity onPress={handleSendMessage}>
            <MaterialIcons
              name="send"
              size={30}
              color={colors.deviceMenuIconPink}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HelpAndSupport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  chatBody: {
    flexGrow: 1,
    padding: 15,
    marginRight: 15,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  agentMessage: {
    justifyContent: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  messageText: {
    padding: 11,
    borderRadius: 10,
    maxWidth: '70%',
    fontFamily: 'Shift-Type-Basic',
    fontSize: 18,
    color: colors.textBtmSheet,
  },
  agentMessageColor: {
    backgroundColor: colors.deviceMenuIconPink,
  },
  userMessageColor: {
    backgroundColor: colors.lightBlue,
  },
  chatBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    color: 'black',
    fontFamily: 'Shift-Type-Basic',
    fontSize: 18,
    backgroundColor: colors.lightBlue,
  },
});
