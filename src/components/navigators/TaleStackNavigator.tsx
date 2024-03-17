import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import TalesOverviewScreen from '@screens/tale/TalesOverviewScreen';
import type { TaleStackNavigatorParamList } from '@screens/tale/types/types';
import { PALETTE } from '@constants/palette';

const TaleStack = createStackNavigator<TaleStackNavigatorParamList>();

const Title = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>Explore </Text>
      <Text
        style={[
          styles.titleText,
          {
            color: PALETTE.ORANGE,
          },
        ]}>
        Sunday
      </Text>
    </View>
  );
};

const TaleStackNavigator = () => {
  return (
    <TaleStack.Navigator
      initialRouteName="TalesOverview"
      screenOptions={({}) => {
        return { headerShown: false };
      }}>
      <TaleStack.Screen
        name="TalesOverview"
        component={TalesOverviewScreen}
        options={{
          headerShown: true,
          headerLeft: Title,
          headerLeftContainerStyle: { paddingLeft: 20 },
          headerTitle: '',
          headerStyle: { backgroundColor: PALETTE.WHITE },
          headerShadowVisible: false,
        }}
      />
    </TaleStack.Navigator>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
  },
  titleText: {
    fontFamily: 'Lilita One',
    fontSize: 24,
    color: PALETTE.GREYISHBLUE,
  },
});

export default TaleStackNavigator;
