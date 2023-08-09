import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button, Card } from 'react-native-paper';

const PostCard = ({ post, onDelete, onSaveEdit, navigation, savingPost }) => {
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
            placeholder="Title"
          />
          <TextInput
            mode="outlined"
            multiline={true}
            dense
            textColor="#000"
            style={styles.input}
            value={body}
            onChangeText={text => setBody(text)}
            placeholder="Write your post here..."
          />
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.saveButton}
              mode="contained"
              onPress={handleSave}
              disabled={savingPost}
            >
              {savingPost ? <ActivityIndicator color="#fff" /> : 'Save'}
            </Button>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{body}</Text>
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.deleteButton}
              mode="outlined"
              onPress={() => onDelete(post.id)}
            >
              Delete
            </Button>
            <Button
              style={styles.editButton}
              mode="contained"
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
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f0f0f0',
    fontSize: 16,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 2,
    color: '#333333',
    padding: 4,
  },
  body: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 15,
    padding: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  deleteButton: {
    marginHorizontal: 8,
    height: 40,
  },
  editButton: {
    marginHorizontal: 8,
    height: 40,
  },
  saveButton: {
    height: 40,
  },
});

export default PostCard;
