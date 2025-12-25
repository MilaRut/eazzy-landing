/* eslint-disable no-console */
/* eslint-disable no-alert */
const url = 'https://dev-api.eazzy.pro/api/v1/user/answers-to-questions';

function showSuccessModal() {
  document.querySelector('#modal-success').classList.add('is-active');
}

function showErrorModal() {
  document.querySelector('#modal-error').classList.add('is-active');
}

function initFormValidation() {
  const form = document.querySelector('form');
  if (!form) {
    return;
  }

  const nameInput = form.querySelector('input[name="username"]');
  const phoneInput = form.querySelector('input[name="tel"]');
  const commentInput = form.querySelector('input[name="comment"]');
  const agreementCheckbox = form.querySelector('input[name="agreement"]');
  const submitButton = form.querySelector('button[type="submit"]');

  const allErrorElements = form.querySelectorAll('.error');
  allErrorElements.forEach((errorElement) => {
    errorElement.style.display = 'none';
  });

  let nameTouched = false;
  let phoneTouched = false;
  let commentTouched = false;
  let agreementTouched = false;

  initPhoneMask(phoneInput);

  function validateName() {
    const value = nameInput.value.trim();
    const errorElement = nameInput.parentElement.querySelector('.error');

    if (!value) {
      if (nameTouched) {
        showError(errorElement, 'Имя обязательно для заполнения');
      }
      return false;
    }
    if (value.length < 2) {
      if (nameTouched) {
        showError(errorElement, 'Имя должно содержать минимум 2 символа');
      }
      return false;
    }
    hideError(errorElement);
    return true;
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    const errorElement = phoneInput.parentElement.querySelector('.error');
    const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;

    if (!value) {
      if (phoneTouched) {
        showError(errorElement, 'Телефон обязателен для заполнения');
      }
      return false;
    }
    if (!phoneRegex.test(value)) {
      if (phoneTouched) {
        showError(errorElement, 'Введите телефон в формате +7 (999) 999-99-99');
      }
      return false;
    }
    hideError(errorElement);
    return true;
  }

  function validateComment() {
    const value = commentInput.value.trim();
    const errorElement = commentInput.parentElement.querySelector('.error');

    if (!value) {
      if (commentTouched) {
        showError(errorElement, 'Поле обязательно для заполнения');
      }
      return false;
    }
    hideError(errorElement);
    return true;
  }

  function validateAgreement() {
    const errorElement = agreementCheckbox.parentElement.querySelector('.error');

    if (!agreementCheckbox.checked) {
      if (agreementTouched) {
        showError(errorElement, 'Необходимо принять условия соглашения');
      }
      return false;
    }
    hideError(errorElement);
    return true;
  }

  function validateForm() {
    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isCommentValid = validateComment();
    const isAgreementValid = validateAgreement();

    return isNameValid && isPhoneValid && isCommentValid && isAgreementValid;
  }

  function updateSubmitButton() {
    submitButton.disabled = !validateForm();
  }

  function showError(element, message) {
    if (element) {
      element.textContent = message;
      element.style.display = 'inline';
    }
  }

  function hideError(element) {
    if (element) {
      element.style.display = 'none';
    }
  }

  nameInput.addEventListener('focus', () => {
    nameTouched = true;
  });

  phoneInput.addEventListener('focus', () => {
    phoneTouched = true;
  });

  commentInput.addEventListener('focus', () => {
    commentTouched = true;
  });

  agreementCheckbox.addEventListener('focus', () => {
    agreementTouched = true;
  });

  nameInput.addEventListener('input', () => {
    const value = nameInput.value.trim();
    const errorElement = nameInput.parentElement.querySelector('.error');

    if (value && value.length >= 2) {
      hideError(errorElement);
    }
    updateSubmitButton();
  });

  phoneInput.addEventListener('input', () => {
    const value = phoneInput.value.trim();
    const errorElement = phoneInput.parentElement.querySelector('.error');
    const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;

    if (value && phoneRegex.test(value)) {
      hideError(errorElement);
    }
    updateSubmitButton();
  });

  commentInput.addEventListener('input', () => {
    const value = commentInput.value.trim();
    const errorElement = commentInput.parentElement.querySelector('.error');

    if (value) {
      hideError(errorElement);
    }
    updateSubmitButton();
  });

  nameInput.addEventListener('blur', () => {
    nameTouched = true;
    validateName();
    updateSubmitButton();
  });

  phoneInput.addEventListener('blur', () => {
    phoneTouched = true;
    validatePhone();
    updateSubmitButton();
  });

  commentInput.addEventListener('blur', () => {
    commentTouched = true;
    validateComment();
    updateSubmitButton();
  });

  agreementCheckbox.addEventListener('change', () => {
    agreementTouched = true;
    const errorElement = agreementCheckbox.parentElement.querySelector('.error');

    if (agreementCheckbox.checked) {
      hideError(errorElement);
    } else {
      showError(errorElement, 'Необходимо принять условия соглашения');
    }
    updateSubmitButton();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    nameTouched = true;
    phoneTouched = true;
    commentTouched = true;
    agreementTouched = true;

    if (!validateForm()) {
      updateSubmitButton();
      return;
    }

    const formData = {
      username: nameInput.value.trim(),
      tel: phoneInput.value.trim(),
      comment: commentInput.value.trim(),
      agreement: agreementCheckbox.checked
    };

    submitButton.classList.add('loading');
    submitButton.innerHTML = '<span>Отправка...</span>';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        form.reset();
        nameTouched = false;
        phoneTouched = false;
        commentTouched = false;
        agreementTouched = false;
        allErrorElements.forEach((errorElement) => {
          errorElement.style.display = 'none';
        });
        showSuccessModal();
      } else {
        showErrorModal();
      }
    } catch (error) {
      console.error('Ошибка:', error);
      showErrorModal();
    } finally {
      submitButton.innerHTML = '<span>отправить</span>';
      submitButton.classList.remove('loading');
      updateSubmitButton();
    }
  });

  updateSubmitButton();
}

function initPhoneMask(input) {
  if (!input) {
    return;
  }

  input.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 0 && !['7', '8'].includes(value[0])) {
      value = `7${value}`;
    }

    let formattedValue = '+7';

    if (value.length > 1) {
      formattedValue += ` (${value.substring(1, 4)}`;
    }
    if (value.length >= 4) {
      formattedValue += `) ${value.substring(4, 7)}`;
    }
    if (value.length >= 7) {
      formattedValue += `-${value.substring(7, 9)}`;
    }
    if (value.length >= 9) {
      formattedValue += `-${value.substring(9, 11)}`;
    }

    e.target.value = formattedValue;
  });
}

export { initFormValidation };
