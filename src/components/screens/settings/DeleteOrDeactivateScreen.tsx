import { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';
import { PALETTE } from '@constants/palette';
import GypsieButton from '@components/common/buttons/GypsieButton';
import { ModalNavigatorNavigationProp } from '@navigators/types/types';
import ChevronRightIcon from '@icons/ChevronRightIcon';
import { DIMENSION } from '@constants/dimensions';
import { Divider } from 'react-native-paper';

const DeleteOrDeactivateScreen = () => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();

  const onPressUserInfo = useCallback(() => {
    navigation.push('Modal', { screen: 'Deactivate' });
  }, [navigation]);

  const onPressDeleteOrDeactivate = useCallback(() => {
    navigation.push('Modal', { screen: 'Delete' });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <View style={styles.sectionItems}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Delete or deactivate?</Text>
              <Text style={styles.sectionSubtitle}>
                If you want to leave Orang3 temporarily, simply deactivate your
                account. If you choose to delete your account instead, you won't
                be able to recover it after 30 days.
              </Text>
            </View>
            <GypsieButton
              customButtonStyles={styles.sectionItem}
              customIconStyles={styles.sectionItemIcon}
              customTextStyles={styles.sectionItemTitle}
              customSubtextStyles={styles.sectionItemSubtitle}
              Icon={ChevronRightIcon}
              text="Deactivate account"
              subtext="No one can see your account, including all content that is stored in it. Reactivate your account and recover all content anytime."
              onPress={onPressUserInfo}
            />
            <Divider />
            <GypsieButton
              customButtonStyles={styles.sectionItem}
              customIconStyles={styles.sectionItemIcon}
              customTextStyles={styles.sectionItemTitle}
              customSubtextStyles={styles.sectionItemSubtitle}
              Icon={ChevronRightIcon}
              text="Delete account permanently"
              subtext="Your account and content will be deleted permanently. You may cancel the deletion request by reactivating your account within 30 days."
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
  section: {
    width: DIMENSION.HUNDRED_PERCENT,
    paddingHorizontal: 32,
  },
  sectionHeader: {},
  sectionTitle: {
    fontFamily: 'Futura',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    marginTop: 8,
    fontFamily: 'Futura',
    fontWeight: 'normal',
    fontSize: 14,
    color: PALETTE.DARKGREY,
  },
  sectionItems: {
    width: DIMENSION.HUNDRED_PERCENT,
    backgroundColor: PALETTE.OFFWHITE,
  },
  sectionItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sectionItemIcon: {
    position: 'absolute',
    top: 16,
    right: 0,
    fontSize: 18,
    color: PALETTE.BLACK,
  },
  sectionItemTitle: {
    fontFamily: 'Futura',
    fontWeight: 'normal',
    fontSize: 16,
  },
  sectionItemSubtitle: {
    marginTop: 4,
    fontFamily: 'Futura',
    fontWeight: 'normal',
    fontSize: 14,
    color: PALETTE.GREY,
  },
});
export default DeleteOrDeactivateScreen;
