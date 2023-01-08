import { avatars } from "../pages/images";

export const getAvatar = () => {
  const pos = getRandomNumber(0, avatars?.length - 1);
  return avatars[pos];
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
