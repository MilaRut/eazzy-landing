import { casesData } from './cases-data';
const casesModalName = document.querySelector('.modal-cases__name');
const casesModalLinks = document.querySelector('.modal-cases__more');
const casesModalContent = document.querySelector('.modal-cases__content');
const reviewsModalContent = document.querySelector('.modal-reviews__content');
const reviewsModalDownload = document.querySelector('.modal__download');

function renderModal(el, type) {
  if (type === 'cases') {
    casesModalName.textContent = '';
    casesModalLinks.innerHTML = '';
    casesModalContent.innerHTML = '';
    const currentId = el.dataset.case;
    const caseData = casesData[currentId];
    casesModalName.textContent = caseData.title;
    let linkHtml = '';
    caseData.links.forEach((link, index) => {
      linkHtml += `
        <a class="modal-cases__more-link" href="${link.href}" target="_blank">${link.text}</a>`;
      if (caseData.links.length > 1 && index < caseData.links.length - 1) {
        linkHtml += '&nbsp;|&nbsp;';
      }
      casesModalLinks.innerHTML = linkHtml;
      casesModalContent.innerHTML = caseData.content;
    });
  } else if (type === 'reviews') {
    reviewsModalContent.innerHTML = '';
    reviewsModalDownload.href = '';
    const currentImageSrc = el.querySelector('img').dataset.src;
    const image = document.createElement('img');
    image.src = currentImageSrc;
    reviewsModalDownload.href = currentImageSrc;
    reviewsModalContent.appendChild(image);
  }
}

export { renderModal };
