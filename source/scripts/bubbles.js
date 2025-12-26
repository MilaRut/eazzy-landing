import { initObserver, disconnectObserver } from './observer';
const animationElem = document.querySelector('.bubbles');

export function startBubblesAnimation() {
  if (!animationElem) {
    return;
  }
  const bubbles = animationElem.querySelectorAll('.bubble');

  if (bubbles.length === 0) {
    return;
  }

  let startPosition;
  try {
    const containerHeight = animationElem.offsetHeight;
    startPosition = -Math.round(containerHeight * 1.1);
  } catch (e) {
    startPosition = -750;
  }

  bubbles.forEach((el) => {
    el.style.transition = 'none';
    el.style.transform = `translateY(${startPosition}px)`;
  });

  void animationElem.offsetHeight;

  bubbles.forEach((el, index) => {
    const duration = 1200 + Math.random() * 3000;

    const delay = index * 30 + Math.random() * 500;

    const easings = [
      'cubic-bezier(0.34, 1.56, 0.64, 1)',
      'cubic-bezier(0.42, 0, 0.58, 1)',
      'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      'ease-out',
      'ease-in-out'
    ];
    const easing = easings[Math.floor(Math.random() * easings.length)];

    el.style.transition = `transform ${duration}ms ${easing} ${delay}ms`;
    el.style.transform = 'translateY(0)';
  });

  disconnectObserver(animationElem);
}

function initBubblesAnimation() {
  if (!animationElem) {
    return;
  }

  initObserver(animationElem, 'start', startBubblesAnimation);
}

export { initBubblesAnimation };
