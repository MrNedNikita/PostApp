import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Modal, Portal, Text, Button, ActivityIndicator } from 'react-native-paper';

const { width } = Dimensions.get("window");

const PostModal = ({ modalVisible, onDelete, hideModal, loading, deleting }) => {
  const containerStyle = { ...styles.container, width: width * 0.8 };
  const buttonContainerStyle = styles.buttonContainer;

  return (
    <Portal>
      <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        {/* {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#5a4499" />
          </View>
        ) : ( */}
          <View style={styles.modalContent}>
            <Text style={styles.title}>Confirm Deletion</Text>
            <Text style={styles.subtitle}>Are you sure you want to delete this post?</Text>
            <View style={buttonContainerStyle}>

              <Button
                mode="outlined"
                onPress={hideModal}
                style={styles.closeButton}
                labelStyle={styles.buttonLabel}
              >
                Close
              </Button>
              <Button
                mode="contained"
                onPress={onDelete}
                style={styles.deleteButton}
                labelStyle={styles.buttonLabel}
              >
                {deleting ? <ActivityIndicator color="#fff" /> : 'Delete'}
              </Button>
            </View>
          </View>
        {/* )} */}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#777',
  },
  deleteButton: {
    height: 40,
  },
  closeButton: {
    borderColor: '#5a4499',
    marginRight: 10,
  },
  buttonLabel: {
    fontSize: 16,
  },
});

export default PostModal;
