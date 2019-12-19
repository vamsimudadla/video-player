import * as React from 'react';

import videoJS from 'video.js';
import 'video.js/dist/video-js.min.css';

import { VideoContainer } from './styledComponents';
import videoConfig from './config';

import './video-overridden.css';
import './vjs-markers.css';

interface Props {
  canPlay: () => void;
}

class Video extends React.Component<Props> {
  videoPlayer: any;

  canBePlayed: boolean = true;

  componentDidMount() {
    this.setupVideoPlayer();
  }

  componentWillUnmount() {
    if (this.videoPlayer) {
      this.videoPlayer.dispose();
    }
  }

  setupVideoPlayer = () => {
    const options = videoConfig;

    this.videoPlayer = videoJS('video', options, () => {
      videoJS.log('Your player is ready!');
    });

    this.videoPlayer.on('canplay', this.playVideo);
  };

  changeCurrentTime = (timeInSec: number) => {
    this.videoPlayer.currentTime(timeInSec);
  };

  playVideo = () => {
    if (this.canBePlayed) {
      // this.videoPlayer.currentTime(60) By trigger this in canplay event, it is working but not working in the below way in mobiles
      this.props.canPlay();
      this.canBePlayed = false;
    }
  };

  render() {
    return (
      <VideoContainer>
        <video
          className={`video-js vjs-default-skin vjs-big-play-centered`}
          controls
          preload='auto'
          id='video'
          poster='https://html5box.com/html5gallery/images/Big_Buck_Bunny_1_1024.jpg'
          width={640}
          height={360}
          data-setup='{}'
        >
          <source
            src='http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8'
            type='application/x-mpegURL'
          />
        </video>
      </VideoContainer>
    );
  }
}

export default Video;
