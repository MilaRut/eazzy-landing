import { initModal } from './modal';
import { checkCookies } from './cookies';
import { initSwiperCases, initSwiperReviews } from './my-swiper';
import { initParallax } from './parallax';
import { initBubblesAnimation } from './bubbles';
import { scrollToTop, showButton } from './top-btn';
import { initFormValidation } from './form';
import { copyEmail } from './copy';

const mediaQueriesMob = window.matchMedia('(max-width: 1023px)');

window.addEventListener('DOMContentLoaded', () => {
  initModal();
  checkCookies();
  initSwiperCases();
  initSwiperReviews();
  mediaQueriesMob.addEventListener('change', initParallax);
  initParallax(mediaQueriesMob);
  initBubblesAnimation();
  scrollToTop();
  showButton();
  initFormValidation();
  copyEmail();
});
