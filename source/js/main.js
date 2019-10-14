'use strict';

;(() => {
  const HTML_CLASS_EMPTY_FIELD = 'entry-field--error';
  const form = new window.Form(document.querySelector('.form'), HTML_CLASS_EMPTY_FIELD, formSubmitCallback);
  const url = form.getAction();

  function formSubmitCallback() {
    const formData = form.getFormData();
    window.backend.send(url, formData, uploadDone, uploadError);
  }

  function uploadDone() {
    alert('Данные успешно отправлены!');
    form.reset();
  }

  function uploadError(err) {
    alert(err);
  }

})()