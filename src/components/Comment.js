import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Button, Card, ActivityIndicator } from 'react-native-paper';

const Comment = ({ comment, onDelete, onSaveEdit }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    if (!text) {
      return alert('Please fill all fields!');
    }
    setSaving(true);
    await onSaveEdit(comment.id, text);
    setSaving(false);
    setEditing(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(comment.id);
    setDeleting(false);
  };

  const handleCancel = () => {
    setText(comment.text);
    setEditing(false);
  };

  return (
    <Card style={styles.commentContainer}>
      <View style={styles.commentContent}>
        {editing ? (
          <>
            <TextInput
              multiline
              mode="outlined"
              style={styles.editInput}
              value={text}
              onChangeText={setText}
            />
            <View style={styles.editButtons}>
              <Button
                mode="text"
                onPress={handleCancel}
                style={styles.cancelButton}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleSave}
                style={styles.saveButton}
                disabled={saving}
              >
                {saving ? <ActivityIndicator color="#fff" /> : 'Save'}
              </Button>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.commentText}>{comment.text}</Text>
            <View style={styles.commentButtons}>
              <Button
                mode="text"
                onPress={handleEdit}
                style={styles.editButton}
                disabled={deleting}
              >
                Edit
              </Button>
              <Button
                mode="contained"
                onPress={handleDelete}
                style={styles.deleteButton}
                disabled={deleting}
              >
                {deleting ? <ActivityIndicator color="#fff" /> : 'Delete'}
              </Button>
            </View>
          </>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  commentContent: {
    padding: 16,
  },
  commentText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    padding: 5,
    paddingLeft: 2,
    paddingBottom: 6,
  },
  editInput: {
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    fontSize: 16,
    padding: 6,
    paddingLeft: 2,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    marginRight: 8,
    color: '#888',
    height: 40,
  },
  saveButton: {
    backgroundColor: '#333',
    height: 40,
  },
  commentButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    color: '#007AFF',
    marginRight: 8,
    height: 40,
  },
  deleteButton: {
    color: '#FF3B30',
    height: 40,
  },
});

export default Comment;
