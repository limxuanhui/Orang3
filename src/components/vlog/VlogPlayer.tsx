import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Video, {
  OnBufferData,
  OnLoadData,
  OnProgressData,
  OnSeekData,
} from 'react-native-video';
import VlogPlayerButton from '@components/vlog/VlogPlayerButton';
import VlogPlayerSlider from '@components/vlog/VlogPlayerSlider';
import { type VlogPlayerProps, VlogPlayerStatus } from './types/types';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import { printPrettyJson } from '@helpers/functions';

const VlogPlayer = ({ vlog, shouldPlay }: VlogPlayerProps) => {
  const videoRef = useRef<Video>(null);
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

  const scrubVideo = useCallback((value: number | number[]) => {
    console.log('Seeking to value: ', value);
    if (typeof value === 'object') {
      videoRef.current?.seek(value[0]);
    } else if (typeof value === 'number') {
      videoRef.current?.seek(value);
    }
  }, []);

  const onLoadStart = useCallback(() => console.log('Loading video...'), []);

  const onLoad = useCallback((data: OnLoadData) => {
    console.log('Video loaded');
    printPrettyJson(data);
    setMaxValue(data.duration);
  }, []);

  const onBuffer = useCallback((data: OnBufferData) => {
    console.log(
      'OnBuffer: ',
      data.isBuffering ? 'Buffering video...' : 'Not buffering video...',
    );
  }, []);

  const onProgress = useCallback((data: OnProgressData) => {
    console.log('OnProgress: ', data.currentTime);
    setValue(data.currentTime);
  }, []);

  const onSeek = useCallback((data: OnSeekData) => {
    console.log('OnSeek: ', data.seekTime);
    setValue(data.seekTime);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={[styles.video, { aspectRatio: media.width / media.height }]}
        source={{
          uri: media.uri,
        }}
        paused={!shouldPlay || status === VlogPlayerStatus.PAUSED}
        controls={false}
        repeat
        resizeMode="contain"
        onLoadStart={onLoadStart}
        onLoad={onLoad}
        onBuffer={onBuffer}
        onProgress={onProgress}
        onSeek={onSeek}
        // onEnd
        // onError
        // muted
      />
      <VlogPlayerButton status={status} togglePlay={togglePlay} />
      <VlogPlayerSlider
        value={value}
        maxValue={maxValue}
        scrubVideo={scrubVideo}
      />
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
