export default class Tabs {
  constructor({
    tab,
    tabContent,
    header,
    logo
  }) {
    this._tab = document.querySelectorAll(tab);
    this._tabContent = document.querySelectorAll(tabContent);
    this._header = document.querySelector(header);
    this._logo = document.querySelector(logo);
  }

  hideTabs() {
    this._header.style.display = 'none';
    this._tabContent.forEach((item) => item.classList.remove('active'));
    this._tab.forEach((item) => item.classList.remove('active'));
  }

  stopMusic(players) {
    players.forEach((player) => player.stop());
  }

  init(...players) {
    this._tab.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        this.hideTabs();
        btn.classList.add('active');
        this._tabContent[index].classList.add('active');
        this.stopMusic(players);
      });
    });

    this._logo.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.hideTabs();
      this._header.style.display = '';
      this.stopMusic(players);
    });
  }
}
