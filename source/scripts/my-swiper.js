/* eslint-disable no-unused-vars */
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const swiperCases = document.querySelector('#swiper-cases');
const swiperReviews = document.querySelector('#swiper-reviews');

let swiperReviewsInstance = null;

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

  if (window.innerWidth < 641) {
    if (swiperReviewsInstance) {
      return;
    }

    swiperReviewsInstance = new Swiper(swiperReviews, {
      modules: [Navigation],
      slidesPerView: 'auto',
      spaceBetween: 24,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  } else {
    destroySwiperReviews();
  }
}

function destroySwiperReviews() {
  if (swiperReviewsInstance) {
    swiperReviewsInstance.destroy(true, true);
    swiperReviewsInstance = null;
  }
}

function handleResize() {
  initSwiperReviews();
}

function initSwipers() {
  initSwiperCases();
  initSwiperReviews();

  window.addEventListener('resize', handleResize);
}

export {initSwipers};
