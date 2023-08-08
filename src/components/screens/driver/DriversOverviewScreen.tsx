import { Pressable, StyleSheet, Text, View } from "react-native";
import DriverNamecard from "../../driver/DriverNamecard";
import { launchImageLibrary } from "react-native-image-picker";

type ContactInfo = {
  platform: "Whatsapp";
  contactNumber: number;
  handle: string;
};

type DriverNamecardInfo = {
  name: string;
  contacts: ContactInfo[];
  portfolio: string[];
};

const DATA: DriverNamecardInfo[] = [
  {
    name: "Jackson",
    contacts: [
      {
        platform: "Whatsapp",
        contactNumber: 12345678,
        handle: "jacksonnny",
      },
    ],
    portfolio: ["woaejowajcb", "oawjaeoabnc"],
  },
];

const DriversOverviewScreen = () => {
  const data: DriverNamecardInfo[] = DATA;

  return (
    <View style={styles.container}>
      {data.map(el => (
        <DriverNamecard />
      ))}    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "skyblue",
  },
});

export default DriversOverviewScreen;
