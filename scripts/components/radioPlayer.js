import Player from "./player.js";

export default class RadioPlayer extends Player {
  constructor({
    container,
    playButton,
    navigation,
    items,
    img,
    header,
    player,
    volume,
    volumeCurrent,
    volumeBtns,
    volumeUp,
    volumeDown
  }) {
    super({
      container,
      player,
      playButton,
      volume,
      volumeCurrent,
      volumeBtns,
      volumeUp,
      volumeDown
    });
    this._items = this._container.querySelectorAll(items);
    this._img = this._container.querySelector(img);
    this._header = this._container.querySelector(header);
    this._navigation = this._container.querySelector(navigation);
  }

  togglePlay() {
    if (this._player.paused) {
      this._container.classList.add('play');
      this._playButton.classList.remove('fa-play');
      this._playButton.classList.add('fa-pause');
      this._player.play();
    } else {
      this._container.classList.remove('play');
      this._playButton.classList.remove('fa-pause');
      this._playButton.classList.add('fa-play');
      this._player.pause();
    }
  }

  inicializePlayer(evt) {
    const target = evt.target;
    this._player.src = '';
    this._player.src = target.dataset.radioStantion;
    this.togglePlay();
    this._playButton.disabled = false;
    this._items.forEach((item) => {
      item.classList.remove('select');
      if (item.contains(target)) {
        item.classList.add('select');
        this._img.src = item.querySelector('img').src;
        this._header.textContent = item.querySelector('.radio-name').textContent;
      }
    });
  }

  init() {
    this.volumeInit();
    this._playButton.disabled = true;
    this._navigation.addEventListener('change', (evt) => this.inicializePlayer(evt));
    this._playButton.addEventListener('click', () => this.togglePlay());
  }
}
