/**
 * When `responsive` option set as true, some control bar components
 * will be hidden based on the breakpoint. Check the below source file
 * https://github.com/videojs/video.js/blob/master/src/css/components/_adaptive.scss#L1&L20
 */

const config = {
   fluid: true,
   responsive: true,
   playbackRates: [ 0.5, 1, 1.5, 2 ],
   controlBar: {
      children: [
         'playToggle',
         'volumePanel',
         'currentTimeDisplay',
         'timeDivider',
         'durationDisplay',
         'progressControl',
         'playbackRateMenuButton',
         'subsCapsButton',
         'fullscreenToggle'
      ]
   }
}

export default config
