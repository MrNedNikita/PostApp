import React, { useState, useRef } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Button, TextInput, Card, ActivityIndicator } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import Comment from '../components/Comment';
import * as Animatable from 'react-native-animatable';
import { addComment, deleteComment, editComment } from '../store/actions/commentActions';

const PostScreen = ({ route }) => {
  const { post } = route.params;
  const [commentText, setCommentText] = useState('');
  const viewRefs = useRef([]);

  const selectPostComments = createSelector(
    (state) => state.comments,
    (_, postId) => postId,
    (comments, postId) => comments.filter((comment) => comment.postId === postId)
  );

  const comments = useSelector((state) => selectPostComments(state, post.id));
  const dispatch = useDispatch();

  const [savingComment, setSavingComment] = useState(false);

  const handleAddComment = async () => {
    if (!commentText) {
      return alert('Please fill all fields!');
    }
    setSavingComment(true);
    const id = new Date().getTime();
    await dispatch(addComment(id, commentText, post.id));
    setSavingComment(false);
    setCommentText('');
  };

  const handleDeleteComment = async (commentId, index) => {
    await viewRefs.current[index].fadeOut(900).then(() => {
      dispatch(deleteComment(commentId));
    });
  };

  const handleSaveEditComment = async (commentId, newText) => {
    await dispatch(editComment(commentId, newText, post.id));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card style={styles.commentForm}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>{post.body}</Text>
          <TextInput
            mode="outlined"
            multiline={true}
            textColor="#000"
            style={styles.input}
            placeholder="Enter your comment"
            value={commentText}
            onChangeText={(text) => setCommentText(text)}
          />
          <Button
            style={styles.button}
            onPress={handleAddComment}
            disabled={savingComment}
          >
            {savingComment ? <ActivityIndicator color="#5a4499" /> : 'Send Comment'}
          </Button>
        </Card>
        {comments.map((comment, index) => (
          <Animatable.View
            key={comment.id}
            animation="fadeIn"
            duration={800}
            easing="ease-in-out"
            ref={(ref) => (viewRefs.current[index] = ref)}
            style={styles.commentCardContainer}
          >
            <Comment
              key={comment.id}
              comment={comment}
              onDelete={() => handleDeleteComment(comment.id, index)}
              onSaveEdit={handleSaveEditComment}
            />
          </Animatable.View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginBottom: 20,
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
  button: {
    padding: 0,
    flex: 1,
    alignSelf: 'center',
    height: 40,
  },
});

export default PostScreen;
