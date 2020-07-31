export const tabs = () => {
  const playerBtn = document.querySelectorAll('.player-btn'),
      playerBlock = document.querySelectorAll('.player-block'),
      temp = document.querySelector('.temp'),
      logo = document.querySelector('.logo');

  const hideTab = () => {
    temp.style.display = 'none';
    playerBlock.forEach((item) => item.classList.remove('active'));
    playerBtn.forEach((item) => item.classList.remove('active'));
  };

  playerBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      hideTab();
      btn.classList.add('active');
      playerBlock[index].classList.add('active');
    });
  });

  const onLogoClick = (evt) => {
    evt.preventDefault();
    hideTab();
    temp.style.display = '';
  };

  logo.addEventListener('click', onLogoClick);
};
