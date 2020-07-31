import {timeFormat} from '../utils.js';
import Player from "./player.js";

export default class VideoPlayer extends Player {
  constructor({container,
              playButton,
              player,
              stopButton,
              currentTime,
              timeTotal,
              progress,
              volume,
              volumeCurrent,
              volumeBtns,
              volumeUp,
              volumeDown,
              progressTiming,
              fullScreenButton
            }) {
    super({container, playButton, player, volume, volumeCurrent, volumeBtns, volumeUp, volumeDown, currentTime, timeTotal, progressTiming});
    this._stopButton = this._container.querySelector(stopButton);
    this._currentTime = this._container.querySelector(currentTime);
    this._timeTotal = this._container.querySelector(timeTotal);
    this._progress = this._container.querySelector(progress);
    this._progressTiming = this._container.querySelector(progressTiming);
    this._fullScreenButton = this._container.querySelector(fullScreenButton);
    }

  stop() {
    this.pause();
    this._container.classList.add('play');
    this._playButton.classList.remove('fa-pause');
    this._player.currentTime = 0;

  }

  init() {
    this.volumeInit();
    this.progressInit();
    this._playButton.addEventListener('click', () => {
      this.togglePlay();
    });
    this._player.addEventListener('click', () => {
      this.togglePlay();
    });
    this._stopButton.addEventListener('click', () => {
      this.stop();
    });
    this._fullScreenButton.addEventListener('click', () => {
      this._player.webkitEnterFullScreen();
    });
  }
}
