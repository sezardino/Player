export const timeFormat = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60).toFixed(0);
  minutes = minutes <= 9 ? `0${minutes}` : minutes;
  seconds = seconds <= 9 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
};
