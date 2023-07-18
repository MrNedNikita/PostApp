import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, addPost, deletePost, editPost } from '../store/actions/postActions.js';
import PostCard from '../components/PostCard';
import FormCard from '../components/FormCard';


const HomeScreen = ({ navigation }) => {
  // const [posts, setPosts] = useState([]);

  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddPost = (title, body) => {
    // const newPost = {
    //   id: new Date().getTime(),
    //   title: title,
    //   body: body,
    // };
    // setPosts([newPost, ...posts]);
    const id = new Date().getTime();
    dispatch(addPost(id, title, body));
  };

  const handleDelete = (id) => {
    // setPosts(posts.filter(post => post.id !== id));
    dispatch(deletePost(id));
  };

  const handleSaveEdit = (id, title, body) => {
    // setPosts(posts.map(post => {
    //   if (post.id === id) {
    //     return {
    //       ...post,
    //       title: title,
    //       body: body,
    //     };
    //   }
    //   return post;
    // }));
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
