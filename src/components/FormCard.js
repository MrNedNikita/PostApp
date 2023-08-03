import React, { useState } from "react";
import { StyleSheet, Text } from 'react-native';
import { Card, TextInput, Button, ActivityIndicator } from "react-native-paper";

const FormCard = ({ onAddPost, savingPost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleAddPost = () => {
    if (!title || !body) {
      return alert("Please fill all fields!");
    }
    onAddPost(title, body);
    setTitle("");
    setBody("");
  };

  return (
    <Card style={styles.card}>
      <Text color="red" style={styles.title}>Add Post</Text>
      <Card.Content>
        <TextInput
          label="Title"
          mode="outlined"
          textColor="#000"
          style={styles.input}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          label="Body"
          multiline={true}
          mode="outlined"
          textColor="#000"
          style={styles.input}
          value={body}
          onChangeText={text => setBody(text)}
        />
      </Card.Content>
      <Button 
        style={styles.button} 
        onPress={handleAddPost}
        disabled={savingPost}
      >
        {savingPost ? <ActivityIndicator color="#5a4499" /> : 'Add Post'}
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#F8F8F8',
    color: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14,
    color: '#000',
  },
  button: {
    padding: 0,
    flex: 1,
    alignSelf: 'center',
    height: 40,
  },
});

export default FormCard;
