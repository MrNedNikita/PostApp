import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, addPost, deletePost, editPost } from '../store/actions/postActions.js';
import { fetchComments } from '../store/actions/commentActions.js';
import PostCard from '../components/PostCard';
import FormCard from '../components/FormCard';


const HomeScreen = ({ navigation }) => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchComments());
  }, [dispatch]);

  const handleAddPost = (title, body) => {
    const id = new Date().getTime();
    dispatch(addPost(id, title, body));
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  const handleSaveEdit = (id, title, body) => {
    dispatch(editPost(id, title, body));
  };

  return (
    <ScrollView style={styles.container} scrollVerticalScrollIndicator={false}>
      <FormCard onAddPost={handleAddPost} />
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onDelete={handleDelete}
          onSaveEdit={handleSaveEdit}
          navigation={navigation}
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
});

export default HomeScreen;
