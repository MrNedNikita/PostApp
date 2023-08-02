import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { Modal, Portal, Text, Button } from 'react-native-paper';

const PostModal = ({ modalVisible, onDelete, hideModal, loading }) => {
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <Portal>
      <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007BFF" />
          </View>
        ) : (
          <>
            <Text>Confirm Deletion</Text>
            <Text>Are you sure you want to delete this post?</Text>
            <Button onPress={onDelete}>Delete</Button>
            <Button onPress={hideModal}>Close</Button>
          </>
        )}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});

export default PostModal;
