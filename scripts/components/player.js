import {timeFormat} from '../utils.js';

export default class Player {
  constructor({container,
    playButton,
    player,
    volume,
    volumeCurrent,
    volumeBtns,
    volumeUp,
    volumeDown,
    progressTiming,
    currentTime,
    timeTotal}) {
    this._container = document.querySelector(container);
    this._playButton = this._container.querySelector(playButton);
    this._player = player.tagName === 'AUDIO' ? new Audio() : this._container.querySelector(player);
    this._volume = this._container.querySelector(volume);
    this._volumeCurrent = this._container.querySelector(volumeCurrent);
    this._volumeBtns = this._container.querySelector(volumeBtns);
    this._volumeUp = this._container.querySelector(volumeUp);
    this._volumeDown = this._container.querySelector(volumeDown);
    this._currentTime = this._container.querySelector(currentTime);
    this._progressTiming = this._container.querySelector(progressTiming);
    this._timeTotal = this._container.querySelector(timeTotal);
    this._isPlayed = false;
  }
  stop() {
    this._player.pause();
    this._player.currentTime = 0;
    this._container.classList.remove('play');
    this._playButton.classList.remove('fa-pause');
    this._playButton.classList.add('fa-play');
  }

  pause() {
    this._player.pause();
  }

  play() {
    this._player.play();
  }

  togglePlay() {
    this._isPlayed = this._player.paused;
    this._container.classList.toggle('play');
    this._playButton.classList.toggle('fa-pause');
    if(this._isPlayed) {
      this.play();
    } else {
      this.pause();
    }
  }

  volumeChange() {
    const volume = 1;
    const currentVolume = this._player.volume;
    let progress = currentVolume / volume * 100;
    progress = progress <= 0 ? 0 : progress >= 100 ? 100 : progress;
    this._volumeCurrent.style.width = progress + '%';
  }

  changeVolume(n) {
    let volume = this._player.volume;
    volume += n * 0.1;
    volume = volume <= 0 ? 0 : volume >= 1 ? 1 : volume;
    this._player.volume = volume.toFixed(1);
  }

  volumeInit() {
    this._volumeCurrent.style.width = this._player.volume * 100 + '%';

    this._player.addEventListener('volumechange', () => this.volumeChange());

    this._volume.addEventListener('click', (evt) => {
      const width = evt.offsetX;
      const allWidth = this._volume.clientWidth;
      const progress = width / allWidth;
      this._player.volume = progress;
    });

    this._volumeBtns.addEventListener('click', (evt) => {
      const target = evt.target;
      if(target === this._volumeDown) {
        this.changeVolume(-1);
      }
      if(target === this._volumeUp) {
        this.changeVolume(1);
      }
    });
  }

  progressInit(evt) {
    this._timeTotal.textContent = timeFormat(this._player.duration);
    this._player.addEventListener('timeupdate', () => {
      const duration = this._player.duration;
      const currentTime = this._player.currentTime;
      const progress = currentTime / duration * 100;
      this._progressTiming.style.width = progress + '%';
      this._currentTime.textContent = timeFormat(currentTime);
    });

    this._progress.addEventListener('click', (evt) => {
      const allWidth = this._progress.clientWidth;
      const width = evt.offsetX;
      const progress = width / allWidth * this._player.duration;
      this._player.currentTime = progress;
    });
  }
}
