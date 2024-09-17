import { Image, StyleSheet, View } from 'react-native';
import { PALETTE } from '../../utils/constants/palette';

// Create an avatar that shows GypsieSkeleton when loading image,
// is pressable, scale on press and navigates to profile page
type GypsieAvatarProps = {
  uri: string;
};

// const Skeleton = createShimmerPlaceholder(LinearGradient);

// type GSkeletonProps = {};

// const GSkeleton = ({ children }: PropsWithChildren<GSkeletonProps>) => {
//   return (
//     <Skeleton
//       ref={}
//       style={}
//       shimmerStyle={}
//       shimmerColors={}
//       contentStyle={}
//       height={}
//       width={}
//       LinearGradient={}
//       key={}
//       containerProps={}
//       shimmerContainerProps={}
//       shimmerWidthPercent={}
//       duration={1}
//       location={}
//       stopAutoRun={}
//       visible={}
//       delay={}
//       isReversed={}
//       isInteraction={}
//       // children={}
//       // childrenContainerProps={}
//     >
//       {children}
//     </Skeleton>
//   );
// };

const GypsieAvatar = ({ uri }: GypsieAvatarProps) => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <View
      style={{
        // backgroundColor: "green",
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={styles.avatar}
        source={{ uri }}
        // loadingIndicatorSource={{}}
        // onLoad={x => console.log("GypsieAvatar Image loaded... ", x)}
        // defaultSource={{}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 40,
    width: 40,
    margin: 4,
    borderWidth: 2,
    borderColor: PALETTE.LIGHTGREY,
    borderRadius: 20,
  },
});

export default GypsieAvatar;
