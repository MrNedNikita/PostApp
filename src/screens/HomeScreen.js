import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PostCard from '../components/PostCard';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Post 1',
      body: 'Post body 1',
    },
    {
      id: 2,
      title: 'Post 2',
      body: 'Post body 2',
    },
    {
      id: 3,
      title: 'Post 3',
      body: 'Post body 3',
    },
    {
      id: 4,
      title: 'Post 4',
      body: 'Post body 4',
    },
  ]);

  const handleDelete = (id) => {
    console.warn(id);
  };

  const handleSave = (id, title, body) => {
    console.warn(id, title, body);
  };

  return (
    <ScrollView style={styles.container} scrollVerticalScrollIndicator={false}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onDelete={handleDelete}
          onSave={handleSave}
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
