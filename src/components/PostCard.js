import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
            dense
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            mode="outlined"
            multiline={true}
            numberOfLines={4}
            dense
            textColor="#000"
            style={styles.input}
            value={body}
            onChangeText={text => setBody(text)}
          />
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.button}
              onPress={handleSave}
            >
              Save
            </Button>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{body}</Text>
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.button}
              onPress={() => onDelete(post.id)}
            >
              Delete
            </Button>
            <Button
              style={styles.button}
              onPress={handleEdit}
            >
              Edit
            </Button>
          </View>
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
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    marginLeft: 14,
  },
  body: {
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 14,
    marginTop: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: 80,
    marginHorizontal: 6,
  }
});

export default PostCard;

