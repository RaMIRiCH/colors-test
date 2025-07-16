import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';

const initBannerSlider = () => {
  const sliderEl = document.querySelector('.banner__swiper');
  if (!sliderEl) return;

  new Swiper(sliderEl, {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.banner__swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.banner__swiper-buttons-next',
      prevEl: '.banner__swiper-buttons-prev',
    },
    on: {
      init: function () {
        console.log('Swiper initialized successfully');
      },
    },
  });
};

export default { init: initBannerSlider };