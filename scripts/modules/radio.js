export const radioPlayer = () => {
  const radioContainer = document.querySelector('.radio');
  const radioStop = radioContainer.querySelector('.radio-stop');
  const radioNavigation = radioContainer.querySelector('.radio-navigation');
  const radioItems = radioContainer.querySelectorAll('.radio-item');
  const radioImg = radioContainer.querySelector('.radio-cover__img');
  const radioHeader = radioContainer.querySelector('.radio-header__big');

  const audio = new Audio();
  radioStop.disabled = true;

  const toggleStopButton = () => {
    if (audio.paused) {
      radioContainer.classList.add('play');
      radioStop.classList.remove('fa-play');
      radioStop.classList.add('fa-pause');
      audio.play();
    } else {
      radioContainer.classList.remove('play');
      radioStop.classList.remove('fa-pause');
      radioStop.classList.add('fa-play');
      audio.pause();
    }
  };

  const onRadioNavigationChange = (evt) => {
    const target = evt.target;
    audio.src = '';
    audio.src = target.dataset.radioStantion;
    toggleStopButton();
    radioStop.disabled = false;
    radioItems.forEach((item) => {
      item.classList.remove('select');
      if (item.contains(target)) {
        item.classList.add('select');
        radioImg.src = item.querySelector('img').src;
        radioHeader.textContent = item.querySelector('.radio-name').textContent;
      }
    });
  };


  radioNavigation.addEventListener('change', onRadioNavigationChange);
  radioStop.addEventListener('click', toggleStopButton);
};
