import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';

const PostCard = ({ post, onDelete, onSaveEdit, navigation }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    if (!title || !body) {
      return alert('Please fill all fields!');
    }
    onSaveEdit(post.id, title, body);
    setEditing(false);
  };

  const handlePostPress = () => {
    navigation.navigate('Post', { post });
  };

  return (
    <Card onPress={handlePostPress} style={styles.card}>
      {editing ? (
        <>
          <TextInput 
            mode="outlined" 
            style={styles.input} 
            value={title} 
            onChangeText={text => setTitle(text)} 
          />
          <TextInput 
            mode="outlined"  
            style={styles.input} 
            value={body} 
            onChangeText={text => setBody(text)} 
          />
          <Card.Actions>
            <Button onPress={handleSave}>Save</Button>
          </Card.Actions>
        </>
      ) : (
        <>
          <Card.Title title={title} />
          <Card.Content>
            <Text variant="bodyMedium">{body}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => onDelete(post.id)}>Delete</Button>
            <Button onPress={handleEdit}>Edit</Button>
          </Card.Actions>
        </>
      )}
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
    borderBottomWidth: 1,
    marginBottom: 12,
  },
});

export default PostCard;

