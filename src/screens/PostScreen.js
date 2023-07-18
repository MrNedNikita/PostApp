import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Comment from '../components/Comment';
import { Button, Text, TextInput, Card } from 'react-native-paper';

const PostScreen = ({ route }) => {
  const { post } = route.params;
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (!commentText) {
      return alert('Please fill all fields!');
    }
    const newComment = {
      id: new Date().getTime(),
      text: commentText,
      postId: post.id,
    };
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleSaveEditComment = (id, text) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            text: text,
          };
        }
        return comment;
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <Card style={styles.commentForm}>
        <TextInput
          mode="outlined"
          style={styles.input}
          placeholder="Enter your comment"
          value={commentText}
          onChangeText={(text) => setCommentText(text)}
        />
        <Button style={styles.addButton} onPress={handleAddComment}>
          Add Comment
        </Button>
      </Card>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onDelete={handleDeleteComment}
          onSaveEdit={handleSaveEditComment}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    marginBottom: 16,
  },
  commentForm: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default PostScreen;
