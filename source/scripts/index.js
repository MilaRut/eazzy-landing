import { setHeaderOnScroll } from './header';
import { initParallax } from './parallax';
import { showDropdownList } from './dropdown';
import { checkCookies } from './cookies';
import { scrollToTop, showButton } from './top-btn';
import { initCounters } from './counters';
import { initSwipers } from './my-swiper';
import { initBubblesAnimation } from './bubbles';
import { copyEmail } from './copy';
import { initFormValidation } from './form';
import { initModal } from './modal';

const mediaQueriesMob = window.matchMedia('(max-width: 1023px)');

window.addEventListener('DOMContentLoaded', () => {
  setHeaderOnScroll();
  mediaQueriesMob.addEventListener('change', initParallax);
  initParallax(mediaQueriesMob);
  showDropdownList();
  checkCookies();
  scrollToTop();
  showButton();
  initCounters();
  initSwipers();
  initBubblesAnimation();
  copyEmail();
  initFormValidation();
  initModal();
});
