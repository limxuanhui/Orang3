import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import VlogPlayerButton from '@components/vlog/VlogPlayerButton';
import VlogPlayerSlider from '@components/vlog/VlogPlayerSlider';
import { type VlogPlayerProps, VlogPlayerStatus } from './types/types';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import { useAppSelector } from '@redux/hooks';
import { AWS_CLOUDFRONT_URL_RAW } from '@env';

const VlogPlayer = ({ vlog, shouldPlay }: VlogPlayerProps) => {
  const { mode } = useAppSelector(state => state.writeFeed);
  const { media } = vlog;
  const [status, setStatus] = useState<VlogPlayerStatus>(
    VlogPlayerStatus.PLAYING,
  );
  const [value, setValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);

  const togglePlay = useCallback(async () => {
    if (status === VlogPlayerStatus.PAUSED) {
      setStatus(VlogPlayerStatus.PLAYING);
    } else {
      setStatus(VlogPlayerStatus.PAUSED);
    }
  }, [status, setStatus]);

  return (
    <View style={styles.container}>
      <Video
        style={[styles.video, { aspectRatio: media.width / media.height }]}
        source={{
          uri:
            mode === 'EDIT'
              ? `${AWS_CLOUDFRONT_URL_RAW}/${media.uri}`
              : media.uri,
        }}
        paused={!shouldPlay || status === VlogPlayerStatus.PAUSED}
        controls={false}
        repeat
        // muted
        resizeMode="contain"
        onLoadStart={() => console.warn('video is loading...')}
        onProgress={data => {
          setValue(data.currentTime);
          // find a better way to fix max duration
          setMaxValue(data.playableDuration);
        }}
        onBuffer={() => {
          console.log('Buffering video...');
        }}
        // onEnd
        // onError
      />
      <VlogPlayerButton status={status} togglePlay={togglePlay} />
      <VlogPlayerSlider value={value} maxValue={maxValue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
  },
  video: {
    // height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    backgroundColor: PALETTE.BLACK,
  },
});

export default VlogPlayer;
