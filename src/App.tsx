import React from 'react';
import logo from './logo.svg';
import './App.css';

import Video from './Components/Video';

class App extends React.Component {
  videoRef: any = React.createRef();

  canPlay = () => {
    this.videoRef.current.changeCurrentTime(60);
  };

  render() {
    return <Video ref={this.videoRef} canPlay={this.canPlay} />;
  }
}

export default App;
