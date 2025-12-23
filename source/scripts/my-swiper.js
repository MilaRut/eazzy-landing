/* eslint-disable no-unused-vars */
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
const swiperCases = document.querySelector('#swiper-cases');
const swiperReviews = document.querySelector('#swiper-reviews');

function initSwiperCases() {
  if (!swiperCases) {
    return;
  }

  const swiper1 = new Swiper(swiperCases, {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 24,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

function initSwiperReviews() {
  if (!swiperReviews) {
    return;
  }

  const swiper2 = new Swiper(swiperReviews, {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 24,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

export { initSwiperCases, initSwiperReviews };
