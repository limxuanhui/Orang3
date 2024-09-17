import { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import GypsieButton from '@components/common/buttons/GypsieButton';
import DeleteIcon from '@icons/DeleteIcon';
import UserIcon from '@icons/UserIcon';
import { PALETTE } from '@constants/palette';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';
import { useNavigation } from '@react-navigation/native';
import { ModalNavigatorNavigationProp } from 'components/navigators/types/types';
import { Divider } from 'react-native-paper';

const AccountScreen = () => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();

  const onPressUserInfo = useCallback(() => {
    navigation.push('Modal', { screen: 'UserInfo' });
  }, [navigation]);

  const onPressDeleteOrDeactivate = useCallback(() => {
    navigation.push('Modal', { screen: 'DeleteOrDeactivate' });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
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
              text="User Information"
              onPress={onPressUserInfo}
            />
            <Divider />
            <GypsieButton
              customButtonStyles={({ pressed }) => [
                styles.sectionItem,
                {
                  backgroundColor: pressed ? PALETTE.OFFWHITE : PALETTE.WHITE,
                },
              ]}
              customIconStyles={styles.sectionItemIcon}
              customTextStyles={styles.sectionItemTitle}
              Icon={DeleteIcon}
              text="Delete or Deactivate Account"
              onPress={onPressDeleteOrDeactivate}
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
  section: { marginVertical: 8 },
  sectionItems: {
    alignSelf: 'center',
    width: DEVICE_WIDTH - 16,
    backgroundColor: PALETTE.WHITE,
  },
  sectionItem: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    opacity: 1,
  },
  sectionItemIcon: {
    position: 'absolute',
    marginLeft: 16,
    fontSize: 18,
    color: PALETTE.DARKGREY,
  },
  sectionItemTitle: { marginLeft: 32, fontWeight: 'bold', fontSize: 16 },
});

export default AccountScreen;
