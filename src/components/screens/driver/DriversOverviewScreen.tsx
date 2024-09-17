import { SectionList, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { SocialMediaType } from '@rneui/themed';
import DriverNamecard from '@components/driver/DriverNamecard';
import GypsieSkeleton from '@components/common/GypsieSkeleton';

type ContactInfo = {
  platform: SocialMediaType;
  contact: string;
  name: string;
};

export type DriverNamecardInfo = {
  title: string;
  name: string;
  contacts: ContactInfo[];
  portfolio: string[];
  avatarUri?: string;
};

const DATA: DriverNamecardInfo[] = [
  {
    title: 'The Jeju Expert',
    name: 'Joseph Lim',
    contacts: [
      {
        platform: 'whatsapp',
        contact: '+6512345678',
        name: 'Joseph Lim',
      },
    ],
    portfolio: ['@jason/memotrip', '@jennie/memotrip2'],
    avatarUri: '/Users/limxuanhui/bluextech/gypsie/assets/avatars/joseph.jpg',
  },
];

const DriversOverviewScreen = () => {
  const data: DriverNamecardInfo[] = DATA;

  return (
    <View style={styles.container}>
      {data.map(el => (
        <DriverNamecard data={el} />
      ))}
      <View
        style={{ width: 200, height: 300, borderWidth: 0, borderColor: 'red' }}>
        <GypsieSkeleton />
      </View>
      <SectionList
        sections={[
          { title: 'a', data: [1, 2, 3] },
          { title: 'b', data: [4, 5, 6] },
        ]}
        renderItem={el => <Text>{el.item}</Text>}
        ItemSeparatorComponent={Divider}
      />

      {/* <Skeleton /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: "skyblue",
  },
});

export default DriversOverviewScreen;
