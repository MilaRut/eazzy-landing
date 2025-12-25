function setHeaderOnScroll() {
  let prevScrollPosition = 0;
  const header = document.querySelector('.header');
  const SCROLL_THRESHOLD = 50;

  window.addEventListener('scroll', () => {

    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollPosition < SCROLL_THRESHOLD) {
      header.classList.add('header--default');
    } else {
      header.classList.remove('header--default');
    }

    if (currentScrollPosition > prevScrollPosition) {
      header.classList.add('header--collapsed');
    } else {
      header.classList.remove('header--collapsed');
    }
    prevScrollPosition = Math.max(0, currentScrollPosition);
  });
}

export {setHeaderOnScroll};
