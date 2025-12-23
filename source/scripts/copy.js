/* eslint-disable no-console */
function copyEmail() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('legal__copy')) {
      const email = e.target.closest('.legal__contact').querySelector('a').textContent;
      console.log(email);

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          console.log('Text copied to clipboard');
          e.target.classList.add('is-active');
          setTimeout(() => {
            e.target.classList.remove('is-active');
          }, 1500);
        }).catch((error) => {
          console.error('Clipboard API error:', error);
          // Fallback для Firefox Android
          copyWithExecCommand(email, e.target);
        });
      } else {
        // Fallback для браузеров без Clipboard API
        copyWithExecCommand(email, e.target);
      }
    }
  });
}

function copyWithExecCommand(text, button) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.cssText = 'position:absolute;left:-9999px;opacity:0;';
  document.body.appendChild(textArea);
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (successful) {
      console.log('Text copied to clipboard (execCommand)');
      button.classList.add('is-active');
      setTimeout(() => {
        button.classList.remove('is-active');
      }, 1500);
    }
  } catch (error) {
    document.body.removeChild(textArea);
    console.error('execCommand error:', error);
  }
}

export { copyEmail };
