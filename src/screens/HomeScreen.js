import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { fetchPosts, addPost, deletePost, editPost } from '../store/actions/postActions.js';
import { fetchComments } from '../store/actions/commentActions.js';
import FormCard from '../components/FormCard';
import PostModal from '../components/PostModal.js';
import PostCard from '../components/PostCard';
// import Toast from 'react-native-toast-message';
// import { set } from 'react-native-reanimated';

const HomeScreen = ({ navigation }) => {
  const posts = useSelector((state) => state.posts.posts);
  const loadingPosts = useSelector((state) => state.posts.loading.fetchPosts);
  // const loadingDeletePost = useSelector((state) => state.posts.loading.deletePost);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [postId, setPostId] = useState(null);
  const viewRefs = useRef([]);
  const [addingPost, setAddingPost] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [deleting, setDeleting] = useState(false);
  // const [showSuccessToaster, setShowSuccessToaster] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchComments());
  }, [dispatch]);

  const handleAddPost = async (title, body) => {
    setAddingPost(true);
    const id = new Date().getTime();
    await dispatch(addPost(id, title, body));
    setAddingPost(false);
  };

  const handleDelete = (id, index) => {
    setPostId(id);
    showModal(index);
  };

  const deleteTask = async (index) => {
    setDeleting(true);
    await viewRefs.current[index].fadeOut(300);
    await dispatch(deletePost(postId));
    setDeleting(false);
    hideModal();
    // setShowSuccessToaster(true);
  };

  const handleSaveEdit = async (id, title, body) => {
    setSavingPost(true);
    await dispatch(editPost(id, title, body));
    setSavingPost(false);
  };

  const showModal = (index) => {
    setModalVisible(true);
    setPostId(posts[index].id);
  };

  const hideModal = () => setModalVisible(false);

  const renderSkeleton = () => (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3].map((_, index) => (
        <View key={index} style={styles.skeletonCard} />
      ))}
    </View>
  );

  const renderPostCards = () =>
    posts.map((post, index) => (
      <Animatable.View
        key={post.id}
        animation="fadeIn"
        duration={800}
        easing="ease-in-out"
        ref={(ref) => (viewRefs.current[index] = ref)}
        style={styles.postCardContainer}
      >
        <PostCard
          post={post}
          onDelete={() => handleDelete(post.id, index)}
          onSaveEdit={handleSaveEdit}
          navigation={navigation}
          savingPost={savingPost}
        />
      </Animatable.View>
    ));

  return (
    <ScrollView scrollVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <FormCard
          onAddPost={handleAddPost}
          addingPost={addingPost}
        />
        <PostModal
          modalVisible={modalVisible}
          hideModal={hideModal}
          onDelete={() => deleteTask(posts.findIndex((post) => post.id === postId))}
          deleting={deleting}
        />
        {/* <Toast style={styles.toast} ref={(ref) => Toast.setRef(ref)} /> */}
        {loadingPosts ? renderSkeleton() : renderPostCards()}
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
  skeletonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  skeletonCard: {
    width: '100%',
    height: 170,
    backgroundColor: '#ddd',
    marginBottom: 24,
    borderRadius: 8,
  },
  postCardContainer: {
    marginBottom: 10,
  },
  toast: {
    zIndex: 1,
  },

});

export default HomeScreen;
