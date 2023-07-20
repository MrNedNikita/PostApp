import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import Comment from '../components/Comment';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextInput, Card } from 'react-native-paper';
import { addComment, deleteComment, editComment } from '../store/actions/commentActions.js';

const PostScreen = ({ route }) => {
  const { post } = route.params;
  const [commentText, setCommentText] = useState('');
  const selectPostComments = createSelector(
    (state) => state.comments,
    (_, postId) => postId,
    (comments, postId) => comments.filter((comment) => comment.postId === postId)
  );

  const comments = useSelector((state) => selectPostComments(state, post.id));
  const dispatch = useDispatch();

  const handleAddComment = () => {
    if (!commentText) {
      return alert('Please fill all fields!');
    }
    const id = new Date().getTime();
    dispatch(addComment(id, commentText, post.id));
    setCommentText('');
  };

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id))
  };

  const handleSaveEditComment = (id, text) => {
    dispatch(editComment(id, text, post.id));
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.commentForm}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
        <TextInput
          mode="outlined"
          style={styles.input}
          placeholder="Enter your comment"
          value={commentText}
          onChangeText={(text) => setCommentText(text)}
        />
        <Button style={styles.addButton} onPress={handleAddComment}>
          Send Comment
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
    </ScrollView>
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
    color: '#000',
  },
  body: {
    fontSize: 16,
    marginBottom: 16,
    color: '#000',
  },
  commentForm: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F8F8F8',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default PostScreen;
