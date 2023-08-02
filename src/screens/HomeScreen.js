import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, addPost, deletePost, editPost } from '../store/actions/postActions.js';
import { fetchComments } from '../store/actions/commentActions.js';
import PostCard from '../components/PostCard';
import FormCard from '../components/FormCard';
import PostModal from '../components/PostModal.js';

const HomeScreen = ({ navigation }) => {
  const posts = useSelector((state) => state.posts.posts);
  const loadingPosts = useSelector((state) => state.posts.loading.fetchPosts);
  const loadingDeletePost = useSelector((state) => state.posts.loading.deletePost);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchComments());
  }, [dispatch]);

  const handleAddPost = (title, body) => {
    const id = new Date().getTime();
    dispatch(addPost(id, title, body));
  };

  const handleDelete = (id) => {
    console.warn(id);
    setPostId(id);
    showModal();
  };

  const deleteTask = () => {
    dispatch(deletePost(postId));
    setTimeout(() => {
      hideModal();
    }, 1000);
  }

  const handleSaveEdit = (id, title, body) => {
    dispatch(editPost(id, title, body));
  };

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <ScrollView scrollVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <FormCard onAddPost={handleAddPost} />
        <PostModal
          modalVisible={modalVisible}
          hideModal={hideModal}
          onDelete={deleteTask}
          loading={loadingDeletePost}
        />
        {loadingPosts ? (
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
