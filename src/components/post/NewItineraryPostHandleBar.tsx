import { Image, StyleSheet, Text, View } from 'react-native';
import { PALETTE } from '@constants/palette';
import { DIMENSION } from '@constants/dimensions';
import { getImageUrl } from '@helpers/functions';

type NewItineraryPostHandleBarProps = {
  avatarUri: string;
  name: string;
};

const NewItineraryPostHandleBar = ({
  avatarUri,
  name,
}: NewItineraryPostHandleBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarBox}>
        <Image
          style={styles.avatar}
          source={{
            uri: getImageUrl(avatarUri, 'thumbnail'),
          }}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.description}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: DIMENSION.HUNDRED_PERCENT,
    height: 90,
    borderRadius: 16,
    padding: 16,
  },
  avatarBox: {
    marginRight: 16,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: { height: 2, width: 0 },
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  description: {
    fontFamily: 'Lilita One',
    fontSize: 20,
    color: PALETTE.OFFWHITE,
  },
  followButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 'auto',
    // height: 30,
    padding: 8,
    borderRadius: 8,
    backgroundColor: PALETTE.ORANGE,
  },
  followButtonIcon: {
    fontSize: 16,
    color: 'white',
    marginRight: 8,
  },
  followButtonText: {
    fontWeight: 'bold',
  },
});

export default NewItineraryPostHandleBar;
