import Player from "./player.js";
import {timeFormat} from '../utils.js';

export default class AudioPlayer extends Player {
  constructor({container,
              playButton,
              player,
              img,
              header,
              navigation,
              next,
              prev,
              progress,
              volume,
              volumeBtns,
              volumeCurrent,
              volumeUp,
              volumeDown,
              currentTime,
              timeTotal,
              progressTiming}
              ) {
    super({container, playButton, player, volume, volumeCurrent, volumeBtns, volumeUp, volumeDown, currentTime, timeTotal, progressTiming});
    this._img = this._container.querySelector(img);
    this._header = this._container.querySelector(header);
    this._navigation = this._container.querySelector(navigation);
    this._next = this._container.querySelector(next);
    this._prev = this._container.querySelector(prev);
    this._progress = this._container.querySelector(progress);
    this._playList = ['hello', 'flow', 'speed'];
    this._trackIndex = 0;
  }

  acivatePlayer() {
    const track = this._playList[this._trackIndex];
    this._timeTotal.textContent = timeFormat(this._player.duration);
    this._img.src = `./audio/${track}.jpg`;
    if (this._player.src !== `http://127.0.0.1:5500/audio/${track}.mp3`) {
      this._player.src = `./audio/${track}.mp3`;
    }
    this._header.textContent = track.toUpperCase();
  }

  next() {
    if(this._trackIndex !== this._playList.length - 1) {
      this._trackIndex++;
    } else {
      this._trackIndex = 0;
    }
    this.acivatePlayer();
    if(this._isPlayed) {
      this.play();
    }
  }

  prev() {
    if(this._trackIndex !== 0) {
      this._trackIndex--;
    } else {
      this._trackIndex = this._playList.length - 1;
    }
    this.acivatePlayer();
    if(this._isPlayed) {
      this.play();
    }
  }

  init() {
    this.volumeInit();
    this.progressInit();

    this._playButton.addEventListener('click', () => {
      this.acivatePlayer();
      this.togglePlay();
    });

    this._navigation.addEventListener('click', (evt) => {
      const target = evt.target;
      if(target === this._next) {
        this.next();
      }
      if(target === this._prev) {
        this.prev();
      }
    });

    this._player.addEventListener('ended', () => this.next());
  }
}
