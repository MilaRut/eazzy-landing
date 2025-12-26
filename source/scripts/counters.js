import { initObserver } from './observer';

function animateNumbers() {
  const numberElements = document.querySelectorAll('[data-n]');

  numberElements.forEach((el) => {
    const targetValue = parseInt(el.dataset.n, 10);
    const currentValue = parseInt(el.textContent, 10) || 0;
    const duration = 1500;
    let startTime = null;

    if (currentValue === targetValue) {
      return;
    }

    function animate(timestamp) {
      if (!startTime) {
        startTime = timestamp;
      }
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      const easeOut = 1 - Math.pow(1 - percentage, 3);
      const value = Math.ceil(currentValue + (targetValue - currentValue) * easeOut);

      el.textContent = value;

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        el.textContent = targetValue;
      }
    }

    requestAnimationFrame(animate);
  });
}

function initCounters() {
  const statsContainer = document.querySelector('.stats__list');

  if (!statsContainer) {
    return;
  }

  initObserver(statsContainer, 'counters-visible', animateNumbers);
}

export { initCounters };
