export const audioPlayer = () => {
  const audioContainer = document.querySelector('.audio');
  const audioImg = audioContainer.querySelector('.audio-img');
  const audioHeader = audioContainer.querySelector('.audio-header');
  const audioPlayer = audioContainer.querySelector('.audio-player');
  const audioNavigation = audioContainer.querySelector('.audio-navigation');
  const audioPlay = audioContainer.querySelector('.audio-button__play');
  const audioCurrentTime = audioContainer.querySelector('.audio-time__passed');
  const audioProgress = audioContainer.querySelector('.audio-progress');
  const audioProgressTiming = audioContainer.querySelector('.audio-progress__timing');
  const audioTimeTotal = audioContainer.querySelector('.audio-time__total');

  const playList = ['hello', 'flow', 'speed'];
  let trackIndex = 0;

  const timeFormat = (time) => {
    let minutes = Math.round(time / 60);
    let seconds = Math.round(time % 60);
    minutes = minutes <= 9 ? `0${minutes}` : minutes;
    seconds = seconds <= 9 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
  };

  const play = () => {
    const isPlayed = audioPlayer.paused;
    const track = playList[trackIndex];
    audioTimeTotal.textContent = timeFormat(audioPlayer.duration);

    audioImg.src = `/audio/${playList[trackIndex]}.jpg`;
    audioPlayer.src = `/audio/${playList[trackIndex]}.mp3`;
    audioHeader.textContent = playList[trackIndex].toUpperCase();

    if(isPlayed) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  };

  const onAudioPlayClick = () => {
    audioContainer.classList.toggle('play');
    audioPlay.classList.toggle('fa-pause');
    if(audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
    play();
  };

  const nextTrack = () => {
    if(trackIndex !== playList.length - 1) {
      trackIndex++;
    } else {
      trackIndex = 0;
    }
    play();
  };

  const prevTreck = () => {
    if(trackIndex !== 0) {
      trackIndex--;
    } else {
      trackIndex = playList.length - 1;
    }
    play();
  };

  const onAudioNavigationClick = (evt) => {
    const target = evt.target;

    if(target.classList.contains('audio-button__prev')) {
      prevTreck();
    }

    if(target.classList.contains('audio-button__next')) {
      nextTrack();
    }
  };

  const onAudioPlayerTimeUpdate = () => {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progress = currentTime / duration * 100;

    audioProgressTiming.style.width = progress + '%';

    audioCurrentTime.textContent = timeFormat(currentTime);
  };

  const onAudioProgressClick = (evt) => {
    const allWidth = audioProgress.clientWidth;
    const width = evt.offsetX;
    const progress = width / allWidth * audioPlayer.duration;
    audioPlayer.currentTime = progress;
  };

  const onAudioPlayerEnded = () => {
    nextTrack();
    audioPlayer.play();
  };

  audioTimeTotal.textContent = timeFormat(audioPlayer.duration);
  audioNavigation.addEventListener('click', onAudioNavigationClick);
  audioPlay.addEventListener('click', onAudioPlayClick);
  audioPlayer.addEventListener('timeupdate', onAudioPlayerTimeUpdate);
  audioProgress.addEventListener('click', onAudioProgressClick);
  audioPlayer.addEventListener('ended', onAudioPlayerEnded);
};
