'use strict';

;(() => {

  const URL = 'http://httpbin.org/status/200';
  const HTML_CLASS_EMPTY_FIELD = 'entry-field--error';
  const form = new window.Form(document.querySelector('.form'), HTML_CLASS_EMPTY_FIELD, formSubmitCallback);

  function formSubmitCallback() {
    const formData = form.getFormData();
    window.backend.send(URL, formData, uploadDone, uploadError);
  }

  function uploadDone() {
    alert('Данные успешно отправлены!');
    form.reset();
  }

  function uploadError(err) {
    alert(err);
  }

})()