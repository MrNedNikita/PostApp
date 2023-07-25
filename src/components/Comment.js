import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';

const Comment = ({ comment, onDelete, onSaveEdit }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    if (!text) {
      return alert('Please fill all fields!');
    }
    onSaveEdit(comment.id, text);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  const handleCancel = () => {
    setText(comment.text);
    setEditing(false);
  };

  return (
    <Card style={styles.comment}>
      {editing ? (
        <View>
          <TextInput
            textColor="#000"
            multiline={true}
            mode="outlined"
            style={styles.input}
            value={text}
            onChangeText={setText}
          />
          <Card.Actions>
            <Button onPress={handleCancel}>Cancel</Button>
            <Button onPress={handleSave}>Save</Button>
          </Card.Actions>
        </View>
      ) : (
        <View>
          <Card.Content>
            <Text style={styles.text}>{comment.text}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={handleEdit}>Edit</Button>
            <Button onPress={handleDelete}>Delete</Button>
          </Card.Actions>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  comment: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 14,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    paddingVertical: 12,
    marginBottom: 8,
    color: '#000',
  },
  input: {
    backgroundColor: '#F8F8F8',
    marginBottom: 12,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

export default Comment;
