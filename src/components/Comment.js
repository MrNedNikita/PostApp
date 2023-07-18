import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';

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

  const handleCancel = () => {
    setText(comment.text);
    setEditing(false);
  };

  return (
    <Card style={styles.comment}>
      {editing ? (
        <View>
          <TextInput
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
            <Button onPress={() => onDelete(comment.id)}>Delete</Button>
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
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default Comment;
