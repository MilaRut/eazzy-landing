function initParallax(media) {

  const parallaxLayers = document.querySelectorAll('.parallax img');
  const speeds = [0.5, -0.3, -1, 0.4, 0.3, -0.8];

  function updateParallax() {
    for (let i = 0; i < parallaxLayers.length; i++) {
      const layer = parallaxLayers[i];
      if (!media.matches) {
        layer.style.transform = `translateY(${speeds[i] * (window.scrollY / 2)}px)`;
      }
    }
  }
  document.addEventListener('scroll', updateParallax);
}

export {initParallax};
