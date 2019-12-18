import styled from 'styled-components';

export const VideoContainer = styled.div`
  width: 620px;
  height: 360px;
`;

export const StyledVideo = styled.video``;

const black70 = 'rgba(0, 0, 0, 0.7)';
export const VideoOverlay = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  background-color: ${black70};
  opacity: 0.4;
  z-index: 101;
`;
