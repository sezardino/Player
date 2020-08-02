import {
  audioPlayer
} from './modules/audio.js';
import {
  radioPlayer
} from './modules/radio.js';
import {
  videoPlayer
} from './modules/video.js';
import {
  tabs
} from './modules/tabs.js';
import AudioPlayer from './components/audioPlayer.js';
import VideoPlayer from './components/videoPlayer.js';
import RadioPlayer from './components/radioPlayer.js';
import Tabs from './components/tabs.js';



// videoPlayer();
// radioPlayer();
// audioPlayer();
// tabs();

const audio = new AudioPlayer({
  container: '.audio',
  playButton: '.audio-button__play',
  player: '.audio-player',
  img: '.audio-img',
  header: '.audio-header',
  navigation: '.audio-navigation',
  next: '.audio-button__next',
  prev: '.audio-button__prev',
  currentTime: '.audio-time__passed',
  progress: '.progress',
  volume: '.progress--volume',
  volumeCurrent: '.progress__current-v',
  volumeBtns: '.volume',
  volumeUp: '.volume-button__up',
  volumeDown: '.volume-button__down',
  progressTiming: '.progress__current-pr',
  timeTotal: '.audio-time__total'
});

const video = new VideoPlayer({
  container: '.video',
  playButton: '.video-button__play',
  stopButton: '.video-button__stop',
  fullScreenButton: '.video-button__fullscreen',
  player: '.video-player',
  currentTime: '.video-time__passed',
  timeTotal: '.video-time__total',
  progress: '.progress',
  volume: '.progress--volume',
  volumeCurrent: '.progress__current-v',
  volumeBtns: '.volume',
  volumeUp: '.volume-button__up',
  volumeDown: '.volume-button__down',
  progressTiming: '.progress__current-pr',
});
const radio = new RadioPlayer({
  container: '.radio',
  player: new Audio(),
  playButton: '.radio-stop',
  navigation: '.radio-navigation',
  items: '.radio-item',
  img: '.radio-cover__img',
  header: '.radio-header__big',
  volume: '.progress--volume',
  volumeCurrent: '.progress__current-v',
  volumeBtns: '.volume',
  volumeUp: '.volume-button__up',
  volumeDown: '.volume-button__down',
});

const tab = new Tabs({
  tab: '.player-btn',
  tabContent: '.player-block',
  header: '.temp',
  logo: '.logo'
});

audio.init();
video.init();
radio.init();
tab.init(radio, audio, video);
