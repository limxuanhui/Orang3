import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../utils/constants/constants";
import { AvatarScreenProps } from "../../../utils/types/profile";
import { PALETTE } from "../../../utils/constants/palette";
import { DIMENSION } from "../../../utils/constants/dimensions";

const AvatarScreen = ({ navigation, route }: AvatarScreenProps) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: route.params.avatarUri }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.BLACK,
  },
  image: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
  },
});

export default AvatarScreen;
