import { View, ActivityIndicator } from "react-native";
import React from "react";
import { Modal, Portal, Text, Button } from 'react-native-paper';

const PostModal = ({ modalVisible, onDelete, hideModal, loading }) => {
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      ) : (
        <Portal>
          <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Text>Confirm Deletion</Text>
            <Text>Are you sure you want to delete this post?</Text>
            <Button onPress={onDelete}>Delete</Button>
            <Button onPress={hideModal}>Close</Button>
          </Modal>
        </Portal>
      )}
    </View>
  );
};

export default PostModal;
