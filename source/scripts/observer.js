const observers = new Map();

function initObserver(element, classname, start) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(classname);
        if (entry.target.classList.contains('bubbles')) {
          start();
          observer.unobserve(element);
        }
      }
    });
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
