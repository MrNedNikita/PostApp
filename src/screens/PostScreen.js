import { View, Text } from "react-native";
import React from "react";

const PostScreen = ({ route }) => {
  const { post } = route.params;

  return (
    <View>
      <Text>{ post.title }</Text>
      <Text>{ post.body }</Text>
    </View>
  );
};

export default PostScreen;
