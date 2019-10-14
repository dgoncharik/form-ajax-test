'use strict';

;(() => {

  class Form {
    constructor(formElement, html_class_empty, cbSubmit) {
      this._formElement = formElement;
      this._html_class_empty = html_class_empty;
      this._elements = Array.from(this._formElement.elements);
      this._submit = formElement.querySelector('button[type=submit]');
      this.onFormElementSubmit = cbSubmit;
      this._addListeners();
    }

    _addMistake(elem) {
      if(!elem.valueMissing) {
        elem.parentNode.classList.add(this._html_class_empty);
      }
    }

    _removeMistake(elem) {
      elem.parentNode.classList.remove(this._html_class_empty);
    }

    _validateElement(elem) {
      return elem.checkValidity() || /^\s+$/.test(elem.value);
    }

    _validateForm() {
      let valid;
      const invalidElements = [];
      this._elements.forEach((elem) => {
        if (!this._validateElement(elem)) {
          invalidElements.push(elem);
          this._addMistake(elem);
        }
      });
      invalidElements.length > 0 ? valid = false : valid = true;
      return {status: valid, invalid: invalidElements};
    }

    _addListeners() {
      this._elements.forEach((elem) => {
        const tag = elem.tagName;
        if (tag == 'INPUT' || tag == 'SELECT') {
          const typeEvent = tag == 'INPUT' ? 'keyup' : 'change';
          elem.addEventListener(typeEvent, () => {
            this._validateElement(elem) ? this._removeMistake(elem) : this._addMistake(elem);
          } )
        }
      })

      this._submit.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (this._validateForm().status && this.onFormElementSubmit) {
          this.onFormElementSubmit();
        } else {
            const firtInvalidElement = this._validateForm().invalid[0];
            firtInvalidElement.focus();
        }
      });
    }

    getFormData() {
      return new FormData(this._formElement);
    }

    getAction() {
      return this._formElement.getAttribute("action");
    }

    reset() {
      this._formElement.reset();
    }
  }

  window.Form = Form;
})()