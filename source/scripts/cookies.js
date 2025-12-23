const cookies = document.querySelector('.cookies');

function checkCookies() {

  if (!cookies) {
    return;
  }

  function checkCookieConsent() {
    const consent = document.cookie.split('; ').find((row) => row.startsWith('eazzyCookieConsent='));
    return consent ? consent.split('=')[1] === 'true' : false;
  }

  if (!checkCookieConsent()) {
    setTimeout(() => {
      document.querySelector('.cookies').style.display = 'flex';
    }, 2000);
  }

  document.querySelector('.cookies__btn').onclick = function () {
    document.cookie = `eazzyCookieConsent=true; path=/; max-age=${ 60 * 60 * 24 * 30}`;
    document.querySelector('.cookies').style.display = 'none';
  };
}

export {checkCookies};
