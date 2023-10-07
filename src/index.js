import "./index.css";
// import "./modal";

import config from "./config.json";
import { flamesArray, videosObj } from "./constants";
// eslint-disable-next-line object-curly-newline
import {
  getAgeEntity,
  getFlameEntity,
  getTextEntity,
  getVideoEntity,
} from "./utils";

function preloadVideo(videoSrc) {
  const video = new Audio(videoSrc);
  video.preload = "auto";
  video.load();
}

document.addEventListener("DOMContentLoaded", function () {
  const videoPaths = [
    "./assets/videos/video-1.mp4",
    "./assets/videos/video-2.mp4",
    "./assets/videos/video-3.mp4",
    "./assets/videos/video-4.mp4",
    "./assets/videos/video-5.mp4",
    "./assets/videos/video-6.mp4",
  ];
  // Предзагрузка каждого видеофайла
  videoPaths.forEach((videoPath) => {
    preloadVideo(videoPath);
  });

  // eslint-disable-next-line no-undef
  AFRAME.registerComponent("birthday-party", {
    init() {
      const sceneEl = document.querySelector("a-scene");
      const cakeEl = sceneEl.querySelector("#cake-parent");
      flamesArray.forEach((flame) => {
        const flameEntity = getFlameEntity(flame);
        cakeEl.appendChild(flameEntity);
        return flame;
      });

      const tvContainerEl = sceneEl.querySelector("#tv-container");

      Object.keys(videosObj).forEach((key) => {
        videosObj[key] = { ...videosObj[key], ...config.videosObj[key] };
      });

      Object.keys(videosObj).forEach((key) => {
        const videoEntity = getVideoEntity(videosObj[key], `video-${key}`);
        tvContainerEl.appendChild(videoEntity);
      });

      // const textEl = getTextEntity(config.name);
      // sceneEl.appendChild(textEl);
      const ageEl = getAgeEntity(config.age);
      sceneEl.appendChild(ageEl);
    },
  });
});
