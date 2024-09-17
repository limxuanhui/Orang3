import { StyleSheet, Text, View } from 'react-native';
import { Card, Image, SocialIcon } from '@rneui/themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DriverNamecardInfo } from '../screens/driver/DriversOverviewScreen';

type DriverNamecardProps = {
  data: DriverNamecardInfo;
};

const DriverNamecard = ({ data }: DriverNamecardProps) => {
  // const driver = {
  //   title: 'The Jeju Expert',
  //   name: 'Joseph Lim',
  //   avatarUri: '/Users/limxuanhui/bluextech/gypsie/assets/avatars/joseph.jpg',
  // };
  return (
    <Card containerStyle={styles.container}>
      <Card.Title>{data.title}</Card.Title>
      <Card.Divider />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: '30%' }}>
          <Image
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
            source={{
              uri: data.avatarUri,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
              borderWidth: 1,
              borderColor: 'red',
              padding: 8,
            }}>
            <FontAwesome name="heart" size={20} color={'orange'} />
            <FontAwesome name="thumbs-up" size={20} color={'orange'} />
          </View>
        </View>
        <View>
          {data.contacts.map(el => (
            <View>
              <Card.Title>{el.name}</Card.Title>
              <SocialIcon
                // style={{ backgroundColor: "limegreen" }}
                type={el.platform}
                iconSize={24}
                button
              />
              <Text>{el.platform}</Text>
              <Text>{el.contact}</Text>
            </View>
          ))}
        </View>
        <View>
          <Card.Title>Portfolio</Card.Title>
          {data.portfolio.map(el => (
            <View>
              <Text>{el}</Text>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
});

export default DriverNamecard;
