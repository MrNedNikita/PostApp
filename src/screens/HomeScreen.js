import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, addPost, deletePost, editPost } from '../store/actions/postActions.js';
import { fetchComments } from '../store/actions/commentActions.js';
import PostCard from '../components/PostCard';
import FormCard from '../components/FormCard';

const HomeScreen = ({ navigation }) => {
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
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

  console.warn('posts', posts);
  console.warn('loading', loading);

  return (
    <ScrollView scrollVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <FormCard onAddPost={handleAddPost} />
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007BFF" />
          </View>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handleDelete}
              onSaveEdit={handleSaveEdit}
              navigation={navigation}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default HomeScreen;
