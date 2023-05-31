import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { DEVICE_HEIGHT } from "../../utils/constants/constants";

const RouteNameModal = ({
  initialValue,
  onCancel,
  onAddRoute,
  onUpdateRouteName,
}: any) => {
  const [name, setName] = useState<string>(initialValue);

  const onConfirm = useCallback(() => {
    if (initialValue === "") {
      onAddRoute(name);
    } else {
      onUpdateRouteName(name);
    }
  }, [name, initialValue, onAddRoute, onUpdateRouteName]);

  const confirmButtonIsDisabled = name === "";

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>New route name</Text>
      <TextInput
        style={styles.modalTextInput}
        placeholder="Enter route name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.modalControls}>
        <Pressable
          style={({ pressed }) => [
            styles.modalControl,
            styles.cancelButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.modalControl,
            styles.confirmButton,
            {
              opacity: pressed ? 0.7 : 1,
              backgroundColor: confirmButtonIsDisabled
                ? "#cccccc"
                : "#0000ff55",
            },
          ]}
          onPress={onConfirm}
          disabled={confirmButtonIsDisabled}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignSelf: "center",
    justifyContent: "space-between",
    top: DEVICE_HEIGHT / 2 - 100,
    height: 200,
    width: 300,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    padding: 8,
    elevation: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { height: 4, width: 0 },
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    // marginTop: 8
  },
  modalTextInput: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#cccccc",
    padding: 8,
    backgroundColor: "#ffffff",
  },
  modalControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "30%",
    width: "100%",
    // backgroundColor: "#ffff00",
    borderRadius: 8,
    // borderBottomLeftRadius: 16,
    // borderBottomRightRadius: 16,
  },
  modalControl: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "50%",
    borderWidth: 1,
    borderRadius: 8,
    // borderColor: "#eeeeee",
  },
  cancelButton: {
    borderColor: "#ff0000",
  },
  cancelButtonText: {
    color: "ff0000",
  },
  confirmButton: {
    // backgroundColor: "#0000ff",
  },
  confirmButtonText: {
    color: "#ffffff",
  },
});

export default RouteNameModal;
