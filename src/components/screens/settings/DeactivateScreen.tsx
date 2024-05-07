import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GypsieButton from '@components/common/buttons/GypsieButton';
import { PALETTE } from '@constants/palette';
import { DEVICE_WIDTH } from '@constants/constants';
import { AuthContext } from '@contexts/AuthContext';
import GypsieBulletText from '@components/common/GypsieBulletText';

const DeactivateScreen = () => {
  const { user, deactivateUserHandler } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {user?.handle}, do you want to deactivate this account?
        </Text>
        <Text style={styles.sectionItemSubtitle}>
          If you deactivate your account:
        </Text>
        <GypsieBulletText
          customBulletStyles={styles.sectionItemSubtitle}
          customTextStyles={styles.sectionItemSubtitle}
          text="No one will see your account and content."
        />
        <GypsieBulletText
          customBulletStyles={styles.sectionItemSubtitle}
          customTextStyles={styles.sectionItemSubtitle}
          text="Information that isn't stored in your account, such as direct
          messages, may still be visible to others."
        />
        <GypsieBulletText
          customBulletStyles={styles.sectionItemSubtitle}
          customTextStyles={styles.sectionItemSubtitle}
          text="Orang3 will continue to keep your data so that you can recover it
          when you reactivate your account."
        />
        <GypsieBulletText
          customBulletStyles={styles.sectionItemSubtitle}
          customTextStyles={styles.sectionItemSubtitle}
          text="You can reactivate your account and recover all content anytime by
          using the same login details."
        />
      </View>
      <GypsieButton
        customButtonStyles={styles.deactivateButton}
        customTextStyles={styles.deactivateText}
        text="Deactivate"
        onPress={deactivateUserHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: PALETTE.OFFWHITE,
  },
  section: {
    paddingHorizontal: 32,
  },
  sectionTitle: {
    marginBottom: 8,
    fontFamily: 'Futura',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionItemSubtitle: {
    marginVertical: 8,
    fontFamily: 'Futura',
    fontWeight: 'normal',
    fontSize: 14,
    color: PALETTE.DARKGREY,
  },
  deactivateButton: {
    bottom: 50,
    height: 40,
    width: DEVICE_WIDTH - 64,
    borderRadius: 8,
    backgroundColor: PALETTE.REDPINK,
  },
  deactivateText: {
    fontFamily: 'Futura',
    fontSize: 14,
    fontWeight: 'bold',
    color: PALETTE.WHITE,
  },
});

export default DeactivateScreen;
