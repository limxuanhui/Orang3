import { Image, StyleSheet, View } from "react-native";
import { PALETTE } from "../../utils/constants/palette";
import { DEVICE_WIDTH } from "../../utils/constants/constants";

// Create an avatar that shows GypsieSkeleton when loading image,
// is pressable, scale on press and navigates to profile page
type GypsieAvatarProps = {
  uri: string;
};

const GypsieAvatar = ({ uri }: GypsieAvatarProps) => {
  return (
    <Image
      style={styles.avatar}
      source={{ uri }}
      // loadingIndicatorSource={{}}
      // onLoad={x => console.log("GypsieAvatar Image loaded... ", x)}
      // defaultSource={{}}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 40,
    width: 40,
    margin: 4,
    borderWidth: 2,
    borderColor: PALETTE.LIGHTGREY,
    borderRadius: 20,
  },
});

export default GypsieAvatar;
