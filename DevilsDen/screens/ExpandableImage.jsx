import React, { useState } from "react";
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

const ExpandableImage = ({ source }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={source} style={styles.thumbnail} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <Image source={source} style={styles.fullImage} />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    width: 230, // Adjust as needed
    height: 300, // Adjust as needed
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Faded background
  },
  fullImage: {
    width: "90%", // Adjust as needed
    height: "80%", // Adjust as needed
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10, // Easier touch target
  },
  closeText: {
    color: "white",
    fontSize: 16,
  },
});

export default ExpandableImage;
