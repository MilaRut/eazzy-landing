import { renderModal } from './render-modal';
const modalOpenElements = document.querySelectorAll('[data-open-modal]');
const modalCloseElements = document.querySelectorAll('[data-close-modal]');
const modals = document.querySelectorAll('.modal');
const modalItems = document.querySelectorAll('.modal__item');

function prepareOpening() {
  modals.forEach((el) => {
    setTimeout(() => {
      el.classList.remove('modal--preload');
    }, 100);
  });
}

function prepareClosing() {
  modals.forEach((el) => {
    el.classList.remove('is-active');
  });
  modalItems.forEach((el) => {
    el.classList.remove('is-active');
  });
}

function initModal() {
  prepareOpening();
  modalOpenElements.forEach((el) => {
    const currentEl = el;
    const modalId = currentEl.getAttribute('data-modal-id');
    const currentModal = document.querySelector(modalId);
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentEl.classList.contains('cases__item-btn')) {
        renderModal(currentEl, 'cases');
      } else if (currentEl.classList.contains('reviews__item')) {
        renderModal(currentEl, 'reviews');
      }
      currentModal.classList.add('is-active');
    });
  });

  modalCloseElements.forEach((el) => {
    el.addEventListener('click', () => {
      prepareClosing();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      prepareClosing();
    }
  });
}

export {initModal};
