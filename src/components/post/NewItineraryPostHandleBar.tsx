import { useCallback } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AddCircleIcon from "../common/icons/AddCircleIcon";
import GypsieButton from "../common/buttons/GypsieButton";
import { PALETTE } from "../../utils/constants/palette";

type NewItineraryPostHandleBarProps = {
  avatarUri: string;
  name: string;
};

const NewItineraryPostHandleBar = ({
  avatarUri,
  name,
}: NewItineraryPostHandleBarProps) => {
  const onPressFollow = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatarBox}>
        <Image
          style={styles.avatar}
          source={{ uri: avatarUri }}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.description}>{name}</Text>
      <GypsieButton
        customButtonStyles={styles.followButton}
        customIconStyles={styles.followButtonIcon}
        customTextStyles={styles.followButtonText}
        Icon={AddCircleIcon}
        text="Follow"
        onPress={onPressFollow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 90,
    borderRadius: 16,
    backgroundColor: PALETTE.LIGHTERGREY,
    // justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  avatarBox: {
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: { height: 2, width: 0 },
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  description: { fontFamily: "Lilita One", fontSize: 20 },
  followButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "auto",
    // height: 30,
    padding: 8,
    borderRadius: 8,
    backgroundColor: PALETTE.ORANGE,
  },
  followButtonIcon: {
    fontSize: 16,
    color: "white",
    marginRight: 8,
  },
  followButtonText: {
    fontWeight: "bold",
  },
});

export default NewItineraryPostHandleBar;
