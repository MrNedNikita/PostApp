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
    <View style={styles.comment}>
      {editing ? (
        <View>
          <TextInput
            textColor="#000"
            multiline={true}
            mode="flat"
            dense
            style={styles.input}
            value={text}
            onChangeText={setText}
          />
          <View style={styles.buttonsContainer}>
            <Button
              mode="text"
              onPress={handleCancel}
              style={styles.button}
            >
              Cancel
            </Button>
            <Button
              mode="text"
              onPress={handleSave}
              style={styles.button}
            >
              Save
            </Button>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.text}>{comment.text}</Text>
          <View style={styles.buttonsContainer}>
            <Button style={styles.button} mode="text" onPress={handleEdit}>Edit</Button>
            <Button style={styles.button} mode="text" onPress={handleDelete}>Delete</Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
    paddingVertical: 2,
    marginBottom: 10,
    marginLeft: 22,
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 0,
    marginHorizontal: 6,
    marginVertical: -10,
    paddingVertical: 2,
    paddingLeft: 0,
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

export default Comment;
