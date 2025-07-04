import { useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import type { ModalNavigatorNavigationProp } from '../navigators/types/types';
import type { RouteNode, SearchPlaceButtonProps } from './types/types';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import { itineraryPlanner_addPlace } from '@redux/reducers/itineraryPlannerSlice';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { writeTale_updateRoutesType } from '@redux/reducers/writeTaleSlice';

const SearchPlaceButton = ({}: SearchPlaceButtonProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const dispatch = useAppDispatch();
  const { mode, changes } = useAppSelector(state => state.writeTale);

  const onAddPlace = useCallback(
    (routeNode: RouteNode) => {
      dispatch(itineraryPlanner_addPlace({ routeNode }));

      if (mode === 'EDIT') {
        if (changes.routes.type === 'NONE') {
          dispatch(writeTale_updateRoutesType({ type: 'ONLY_EDITED_ROUTES' }));
        }
      }
    },
    [changes.routes.type, dispatch, mode],
  );

  const onPressSearchPlace = useCallback(() => {
    navigation.navigate('Modal', {
      screen: 'PlaceSearch',
      params: { onAddPlace },
    });
  }, [navigation, onAddPlace]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.searchNavButton,
        { opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={onPressSearchPlace} // Solve non-serializable issue
    >
      <Feather name="search" size={24} color={PALETTE.BLACK} />
      <Text>Search for place</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  searchNavButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    width: DIMENSION.HUNDRED_PERCENT,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: PALETTE.LIGHTGREY,
  },
});

export default SearchPlaceButton;
