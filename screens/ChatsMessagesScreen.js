import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  Text,
} from "react-native";
import React, { useState, useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import { UserType } from "../UserContext";

const ChatsMessagesScreen = () => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [message, setMessage] = useState("");
  const route = useRoute();
  const { recepientId } = route.params;
  const { userId, setUserId } = useContext(UserType);

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const handleSend = async (messageType, imageUri) => {
    try {
      const formData = new formData();
      formData.append("senderId", userId);
      formData.append("recepientId", recepientId);
    } catch (error) {
      console.log("Error sending the message", error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#f0f0f0 " }}>
      <ScrollView>{/*All the chat messages goes here*/}</ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          marginBottom: showEmojiSelector ? 0 : 25,
        }}
      >
        <Entypo
          onPress={handleEmojiPress}
          style={{ marginRight: 5 }}
          name="emoji-happy"
          size={24}
          color="gray"
        />

        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type Your message..."
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginHorizontal: 8,
          }}
        >
          <Entypo name="camera" size={24} color="gray" />
          <Feather name="mic" size={24} color="gray " />
        </View>

        <Pressable
          onPress={() => handleSend("text")}
          style={{
            backgroundColor: "#dcbfa6",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 20,
            marginLeft: 10,
          }}
        >
          <Ionicons name="send" size={22} color="black" />
        </Pressable>
      </View>

      {showEmojiSelector && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessage((prevMessage) => prevMessage + emoji);
          }}
          style={{ height: 250 }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatsMessagesScreen;

const styles = StyleSheet.create({});
