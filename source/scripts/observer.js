const observers = new Map();

function initObserver(element, classname, callback) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(classname);

        if (callback && typeof callback === 'function') {
          callback();
          observer.unobserve(element);
        }

        if (entry.target.classList.contains('bubbles')) {
          if (callback && typeof callback === 'function') {
            callback();
            observer.unobserve(element);
          }
        }
      }
    });
  }, {
    threshold: 0.1
  });

  observer.observe(element);
  observers.set(element, observer);
}

function disconnectObserver(element) {
  if (observers.has(element)) {
    observers.get(element).disconnect();
    observers.delete(element);
  }
}

export { initObserver, disconnectObserver };
