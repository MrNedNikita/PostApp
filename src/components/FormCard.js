import React, { useState } from "react";
import { StyleSheet } from 'react-native';
import { Card, TextInput, Button } from "react-native-paper";

const FormCard = ({ onAddPost }) => {
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
      <Card.Title title="Add Post" />
      <Card.Content>
        <TextInput
          label="Title"
          mode="outlined"
          style={styles.input}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          label="Body"
          mode="outlined"
          style={styles.input}
          value={body}
          onChangeText={text => setBody(text)}
        />
      </Card.Content>
      <Card.Actions>
        <Button onPress={handleAddPost}>Add Post</Button>
      </Card.Actions>
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
  },
});

export default FormCard;
