import * as React from 'react';

import videoJS from 'video.js';
import 'video.js/dist/video-js.min.css';

import { StyledVideo, VideoContainer, VideoOverlay } from './styledComponents';
import videoConfig from './config';

import './video-overridden.css';
import './vjs-markers.css';

interface VideoProps {
  width: number;
  height: number;
  id: string;
  testId: string;
  videoClassName: string;
  videoContainerClassName: string;
}

interface VideoState {
  isPlaying: boolean;
}

class Video extends React.Component<VideoProps, VideoState> {
  // TODO: annotate type for videoPlayer
  videoPlayer: any;

  static defaultProps = {
    width: 640,
    height: 360,
    id: 'video-player',
    testId: 'test-video-player',
    videoClassName: '',
    videoContainerClassName: ''
  };

  constructor(props: VideoProps) {
    super(props);

    this.state = {
      isPlaying: false
    };
  }

  componentDidMount() {
    this.setupVideoPlayer();
  }

  componentWillUnmount() {
    if (this.videoPlayer) {
      this.videoPlayer.dispose();
    }
  }

  playVideo = () => {
    try {
      const { isPlaying } = this.state;
      if (!isPlaying) {
        if (this.videoPlayer) {
          this.videoPlayer.play();
        }
      }
    } catch (e) {}
  };

  changeCurrentTime = (time: number) => {
    if (this.videoPlayer) {
      this.videoPlayer.currentTime(time);
    }
  };

  changeCurrentTimeAndPlay = (time: number) => {
    this.changeCurrentTime(time);
    this.playVideo();
  };

  setupVideoPlayer = () => {
    const options = videoConfig;
    const { id } = this.props;

    this.videoPlayer = videoJS(id, options, () => {
      videoJS.log('Your player is ready!');
      this.registerEvents();
    });

    this.customizeControlBar();
    this.changeCurrentTimeAndPlay(60);
  };

  registerEvents = () => {
    this.videoPlayer.on('play', this.onPlay);
    this.videoPlayer.on('pause', this.onPause);
    this.videoPlayer.on('ended', this.onEnd);
  };

  customizeControlBar = () => {
    const spacer = document.createElement('div');
    spacer.className = 'vjs-custom-control-spacer vjs-spacer';

    const controlBar = document.getElementsByClassName('vjs-control-bar')[0];
    const playbackRateEl = document.getElementsByClassName(
      'vjs-playback-rate'
    )[0];
    controlBar.insertBefore(spacer, playbackRateEl);
  };

  getCurrentTimeInSec = () => {
    return this.videoPlayer.currentTime().toFixed(0);
  };

  onPlay = () => {
    this.setState({
      isPlaying: true
    });
  };

  getVideoDurationInSec = () => {
    return this.videoPlayer.duration();
  };

  onPause = () => {
    this.setState({
      isPlaying: false
    });
  };

  onEnd = () => {
    this.setState({
      isPlaying: false
    });
  };

  render() {
    const {
      width,
      height,
      id,
      testId,
      videoClassName,
      videoContainerClassName
    } = this.props;
    const { isPlaying } = this.state;
    return (
      <VideoContainer data-testid={testId} className={videoContainerClassName}>
        <StyledVideo
          className={`video-js vjs-default-skin vjs-big-play-centered ${videoClassName}`}
          controls
          preload='auto'
          id={id}
          poster='https://html5box.com/html5gallery/images/Big_Buck_Bunny_1_1024.jpg'
          width={640}
          height={360}
          data-setup='{}'
        >
          <source
            src='https://vedavidh-testing.s3.ap-south-1.amazonaws.com/streaming/hd-video/bbb_sunflower_2160p_60fps_normal.mp4'
            type='video/mp4'
          />
        </StyledVideo>
        {!isPlaying && (
          <VideoOverlay
            onClick={() => {
              this.playVideo();
            }}
          />
        )}
      </VideoContainer>
    );
  }
}

export default Video;
