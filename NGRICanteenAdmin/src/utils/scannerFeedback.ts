import { successSound, errorSound } from "./scannerSound";

export async function playSuccessFeedback() {
  try {
    successSound.currentTime = 0;
    await successSound.play();
  } catch (err) {
    console.warn("Unable to play success sound", err);
  }

  if ("vibrate" in navigator) {
    navigator.vibrate(150);
  }
}

export async function playErrorFeedback() {
  try {
    errorSound.currentTime = 0;
    await errorSound.play();
  } catch (err) {
    console.warn("Unable to play error sound", err);
  }

  if ("vibrate" in navigator) {
    navigator.vibrate([100, 100, 100]);
  }
}