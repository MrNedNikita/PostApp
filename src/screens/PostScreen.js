import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Comment from '../components/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text, TextInput, Card } from 'react-native-paper';
import { addComment, deleteComment, editComment, fetchComments } from '../store/actions/commentActions.js';

const PostScreen = ({ route }) => {
  const { post } = route.params;
  // const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const comments = useSelector((state) => {
    return state.comments.filter((comment) => comment.postId === post.id)
  });
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchComments());
  // }, [dispatch]);

  const handleAddComment = () => {
    if (!commentText) {
      return alert('Please fill all fields!');
    }
    // const newComment = {
    //   id: new Date().getTime(),
    //   text: commentText,
    //   postId: post.id,
    // };
    // setComments([newComment, ...comments]);
    const id = new Date().getTime();
    dispatch(addComment(id, commentText, post.id));
    setCommentText('');
  };

  const handleDeleteComment = (id) => {
    // setComments(comments.filter((comment) => comment.id !== id));
    console.warn(id);
    dispatch(deleteComment(id))
  };

  const handleSaveEditComment = (id, text) => {
    // setComments(
    //   comments.map((comment) => {
    //     if (comment.id === id) {
    //       return {
    //         ...comment,
    //         text: text,
    //       };
    //     }
    //     return comment;
    //   })
    // );
    dispatch(editComment(id, text));
  };

  return (
    <ScrollView style={styles.container}>
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
