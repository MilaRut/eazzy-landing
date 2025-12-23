const toTopBtn = document.querySelector('.to-top-wrapper');

function scrollToTop() {
  if (!toTopBtn) {
    return;
  }

  toTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    }
    );
  });
}

function showButton() {
  if (!toTopBtn) {
    return;
  }

  window.addEventListener('scroll', () => {
    const coeff = window.scrollY / 1000;
    if (window.scrollY <= 1000) {
      toTopBtn.style.opacity = coeff;
    } else {
      toTopBtn.style.opacity = 1;
    }
  });
}

export { scrollToTop, showButton };
