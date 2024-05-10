import { useCallback, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '@contexts/AuthContext';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';
import { PALETTE } from '@constants/palette';
import type { SettingsScreenProps } from './types/types';
import GypsieButton from '@components/common/buttons/GypsieButton';
import UserIcon from '@components/common/icons/UserIcon';
import LogoutIcon from '@icons/LogoutIcon';
import { DIMENSION } from '@constants/dimensions';

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const { logoutHandler } = useContext(AuthContext);

  const onPressAccount = useCallback(() => {
    navigation.push('Account');
  }, [navigation]);

  // const onPressPrivacy = useCallback(() => {
  //   navigation.push('Privacy');
  // }, [navigation]);

  const onPressLogout = useCallback(() => {
    console.warn('Log out pressed!');
    logoutHandler();
  }, [logoutHandler]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Account</Text>
          <View style={styles.sectionItems}>
            <GypsieButton
              customButtonStyles={({ pressed }) => [
                styles.sectionItem,
                {
                  backgroundColor: pressed ? PALETTE.OFFWHITE : PALETTE.WHITE,
                },
              ]}
              customIconStyles={styles.sectionItemIcon}
              customTextStyles={styles.sectionItemTitle}
              Icon={UserIcon}
              text="Account"
              onPress={onPressAccount}
            />
            {/* <Divider />
            <GypsieButton
              customButtonStyles={({ pressed }) => [
                styles.sectionItem,
                {
                  backgroundColor: pressed ? PALETTE.OFFWHITE : PALETTE.WHITE,
                },
              ]}
              customIconStyles={styles.sectionItemIcon}
              customTextStyles={styles.sectionItemTitle}
              Icon={LockIcon}
              text="Privacy"
              onPress={onPressPrivacy}
            /> */}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Log in</Text>
          <View style={styles.sectionItems}>
            <GypsieButton
              customButtonStyles={({ pressed }) => [
                styles.sectionItem,
                {
                  backgroundColor: pressed ? PALETTE.OFFWHITE : PALETTE.WHITE,
                },
              ]}
              customIconStyles={styles.sectionItemIcon}
              customTextStyles={styles.sectionItemTitle}
              Icon={LogoutIcon}
              text="Log out"
              onPress={onPressLogout}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.OFFWHITE,
  },
  title: {
    marginLeft: 24,
    fontFamily: 'Futura',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    marginHorizontal: 16,
    marginVertical: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: PALETTE.DARKGREY,
  },
  section: { marginVertical: 8, paddingHorizontal: 8 },
  sectionItems: {
    alignSelf: 'center',
    width: DIMENSION.HUNDRED_PERCENT,
    backgroundColor: PALETTE.WHITE,
  },
  sectionItem: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    opacity: 1,
  },
  sectionItemIcon: {
    fontSize: 16,
    color: PALETTE.DARKGREY,
  },
  sectionItemTitle: { marginLeft: 8, fontWeight: 'bold', fontSize: 16 },
});

export default SettingsScreen;
