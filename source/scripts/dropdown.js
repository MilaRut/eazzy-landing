const triggers = document.querySelectorAll('.js-dropdown-trigger');

function removeClass(el1, el2) {
  el1.classList.remove('is-active');
  el2.classList.remove('is-active');
}

function showDropdownList() {
  triggers.forEach((trigger) => {
    const currentTrigger = trigger;
    const dataId = currentTrigger.getAttribute('data-id');
    const currentList = document.querySelector(dataId);
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (!currentList.classList.contains('is-active')) {
        currentList.classList.add('is-active');
        currentTrigger.classList.add('is-active');
      } else {
        removeClass(currentList, currentTrigger);
      }
    });
    document.addEventListener('click', (e) => {
      if (currentList.classList.contains('is-active') && e.target !== trigger && !trigger.contains(e.target)) {
        removeClass(currentList, currentTrigger);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        removeClass(currentList, currentTrigger);
      }
    });
  });
}

export {showDropdownList};
