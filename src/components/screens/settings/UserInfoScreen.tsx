import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PALETTE } from '@constants/palette';
import { AuthContext } from '@contexts/AuthContext';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';

const UserInfoScreen = () => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Name</Text>
          <Text style={styles.text}> {`${user?.name}`}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Handle</Text>
          <Text style={styles.text}>@{user?.handle}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Email</Text>
          <Text style={styles.text}>{user?.email}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Joined at</Text>
          <Text style={styles.text}>{user?.createdAt?.slice(0, 10)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.OFFWHITE,
  },
  detailsContainer: {
    alignSelf: 'center',
    padding: 16,
    backgroundColor: PALETTE.WHITE,
    width: DEVICE_WIDTH - 16,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 8,
  },
  title: {
    marginRight: 8,
    fontFamily: 'Futura',
    fontSize: 16,
    fontWeight: 'bold',
    color: PALETTE.GREYISHBLUE,
  },
  text: {
    fontFamily: 'Futura',
    fontSize: 16,
    fontWeight: 'normal',
    color: PALETTE.DARKGREY,
  },
});

export default UserInfoScreen;
