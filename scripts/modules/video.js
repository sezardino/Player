export const videoPlayer = () => {
  const vpContainer = document.querySelector('.video');
  const vp = vpContainer.querySelector('.video-player');
  const vpBtnPlay = vpContainer.querySelector('.video-button__play');
  const vpBtnStop = vpContainer.querySelector('.video-button__stop');
  const vpCurrentTime = vpContainer.querySelector('.video-time__passed');
  const vpTotalTime = vpContainer.querySelector('.video-time__total');
  const vpProgress = vpContainer.querySelector('.video-progress');
  const vpVolume = vpContainer.querySelector('.video-volume');
  const vpBtnVolumeUp = vpContainer.querySelector('.video-button__volume-up');
  const vpBtnVolumeDown = vpContainer.querySelector('.video-button__volume-down');
  const vpBtnFullscreen = vpContainer.querySelector('.video-button__fullscreen');
  vp.volume = 0.5;

  const toggleIcon = () => {
    if(vp.paused) {
      vpBtnPlay.classList.add('fa-pause');
      vpBtnPlay.classList.remove('fa-play');
    } else {
      vpBtnPlay.classList.add('fa-play');
      vpBtnPlay.classList.remove('fa-pause');
    }
  };

  const playVideo = () => {
    toggleIcon();
    vp.paused ? vp.play() : vp.pause();
  };

  const stopVideo = () => {
    vp.pause();
    vp.currentTime = 0;
    toggleIcon();
  };

  const checkTime = (n) => n < 10 ? `0${n}` : n;

  const timePassed = () => {
    const currentTime = vp.currentTime;
    const totalTime = vp.duration;
    vpProgress.value = (currentTime / totalTime) * 100;

    const minutesPassed = Math.floor(currentTime / 60);
    const secondsPassed = Math.floor(currentTime % 60);

    const minutesTotal = Math.floor(totalTime / 60);
    const secondsTotal = Math.floor(totalTime % 60);

    vpCurrentTime.textContent = `${checkTime(minutesPassed)}:${checkTime(secondsPassed)}`;
    vpTotalTime.textContent = `${checkTime(minutesTotal)}:${checkTime(secondsTotal)}`;
  };

  const onvpProgressInput = () => {
    vp.currentTime = (vpProgress.value * vp.duration) / 100;
  };

  const onvpVolumeInput = () => {
    vp.volume = vpVolume.value;
  };

  const changeVolume = (n) => {
    if(vp.volume + n * 0.1 < 0) {
      vp.volume = 0;
    } else if (vp.volume + n * 0.1 > 1) {
      vp.volume = 1;
    }
    vp.volume = vp.volume + n * 0.1;
    vpVolume.value = vp.volume;
  };

  const onVpFullscreenClick = () => {
    vp.webkitEnterFullScreen();
  };

  vp.addEventListener('click', playVideo);
  vpBtnPlay.addEventListener('click', playVideo);
  vpBtnStop.addEventListener('click', stopVideo);
  vp.addEventListener('timeupdate', timePassed);
  vpProgress.addEventListener('input', onvpProgressInput);
  vpVolume.addEventListener('input', onvpVolumeInput);
  vpBtnVolumeUp.addEventListener('click', () => changeVolume(1));
  vpBtnVolumeDown.addEventListener('click', () => changeVolume(-1));
  vpBtnFullscreen.addEventListener('click', onVpFullscreenClick);
};
