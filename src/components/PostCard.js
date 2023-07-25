import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';

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
            textColor="#000"
            style={styles.input} 
            value={title} 
            onChangeText={text => setTitle(text)} 
          />
          <TextInput 
            mode="outlined" 
            multiline={true}
            numberOfLines={4}
            textColor="#000" 
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
          <Text style={styles.title}>{title}</Text>
          <Card.Content>
            <Text>{body}</Text>
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
    backgroundColor: '#F8F8F8',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 14,
  },
});

export default PostCard;

