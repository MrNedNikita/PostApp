import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, addPost, deletePost, editPost } from '../store/actions/postActions.js';
import { fetchComments } from '../store/actions/commentActions.js';
import FormCard from '../components/FormCard';
import PostModal from '../components/PostModal.js';
import * as Animatable from 'react-native-animatable';
import PostCard from '../components/PostCard';

const HomeScreen = ({ navigation }) => {
  const posts = useSelector((state) => state.posts.posts);
  const loadingPosts = useSelector((state) => state.posts.loading.fetchPosts);
  const loadingDeletePost = useSelector((state) => state.posts.loading.deletePost);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [postId, setPostId] = useState(null);
  const viewRefs = useRef([]);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchComments());
  }, [dispatch]);

  const handleAddPost = (title, body) => {
    const id = new Date().getTime();
    dispatch(addPost(id, title, body));
  };

  const handleDelete = (id, index) => {
    setPostId(id);
    showModal(index);
  };

  const deleteTask = (index) => {
    viewRefs.current[index].fadeOut(300).then(() => {
      dispatch(deletePost(postId));
      hideModal();
    });
  };

  const handleSaveEdit = (id, title, body) => {
    dispatch(editPost(id, title, body));
  };

  const showModal = (index) => {
    setModalVisible(true);
    setPostId(posts[index].id);
  };

  const hideModal = () => setModalVisible(false);

  return (
    <ScrollView scrollVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <FormCard onAddPost={handleAddPost} />
        <PostModal
          modalVisible={modalVisible}
          hideModal={hideModal}
          onDelete={() => deleteTask(posts.findIndex(post => post.id === postId))}
          loading={loadingDeletePost}
        />
        {loadingPosts ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#5a4499" />
          </View>
        ) : (
          posts.map((post, index) => (
            <Animatable.View
              key={post.id}
              animation="fadeIn"
              duration={800}
              easing="ease-in-out"
              ref={ref => viewRefs.current[index] = ref}
              style={styles.postCardContainer}
            >
              <PostCard
                post={post}
                onDelete={() => handleDelete(post.id, index)}
                onSaveEdit={handleSaveEdit}
                navigation={navigation}
              />
            </Animatable.View>
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
  postCardContainer: {
    marginBottom: 10,
  },
});

export default HomeScreen;
