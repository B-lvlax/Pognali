'use strict';

document.addEventListener('DOMContentLoaded', function() {
  var
    wrapper = select('#forms'),
    form = select('#form', wrapper),
    name = select('#name', wrapper),
    password = select('#password', wrapper),
    url = select('#site', wrapper),
    mail = select('#mail', wrapper),
    phone = select('#phone', wrapper),
    numFild = select('#number', wrapper),
    date = select('#date', wrapper),
    // fields = [name, password, url, mail, phone, numField, date],
    fields = [name, password, url, mail, phone, date],
    reset = select('#btn-reset', wrapper),
    submit = select('#btn-submit', wrapper);

  /*===================================================================*/

  function removeStyles() {
    form.classList.remove('formError');
    fields.forEach(function(el) {
      el.classList.remove('fieldError');
      el.classList.remove('fieldValid');
    });
  }

  function addStyles(elem, state) {
    if (state) {
      elem.classList.remove('fieldError');
      elem.classList.add('fieldValid');
      return true;
    } else {
      elem.classList.remove('fieldValid');
      elem.classList.add('fieldError');
      return false;
    }
  }

  /*===================================================================*/

  function checkTxtField(field, length) {
    var test = /^([a-zа-яё]+)$/i.test(field.value) && field.value.length >= length;

    if (addStyles(field, test)) return true;
    else return false;
  }

  /*===================================================================*/

  function checkDate() {
    var test = /^\d{4}(\-\d{2}){2}$/.test(date.value);

    if (date.value === '') {
      date.classList.remove('fieldValid');
      date.classList.remove('fieldError');
      date.value = '';
      return true;
    }
    else {
      if (addStyles(date, test)) return true;
      else return false;
    }
  }

  /*===================================================================*/

  function checkPhone() {
    var test = /^\(\d{3}\)\s\d{3}(\-\d{2}){2}$/.test(phone.value);

    if (addStyles(phone, test)) return true;
    else return false;
  }

  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  function mask(e) {
    var
      matrix = this.defaultValue,
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = this.value.replace(/\D/g, '');

    def.length >= val.length && (val = def);

    matrix = matrix.replace(/[X\d]/g, function(a) {
      return val.charAt(i++) || 'X';
    });

    this.value = matrix;
    i = matrix.lastIndexOf(val.substr(-1));
    i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf('X');
    setCursorPosition(i, this);
  }

  phone.addEventListener('input', mask, false);

  /*===================================================================*/

  function checkMail() {
    var test = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value);

    if (addStyles(mail, test)) return true;
    else return false;
  }

  /*===================================================================*/


  form.onsubmit = function(e) {
    submit.setAttribute('formvalidate', false);
    var hasError = [];

    fields.forEach(function(el) {
      if (el === name && !checkTxtField(el, 3)) hasError.push(el);
      if (el === date && !checkDate()) hasError.push(el);
      if (el === phone && !checkPhone()) hasError.push(el);
      if (el === mail && !checkMail()) hasError.push(el);
    });

    setTimeout(function() {
      form.classList.remove('formError');
    }, 600);

    setTimeout(function() {
      removeStyles();
    }, 10000);

    if (hasError) {
      e.preventDefault();
      form.classList.add('formError');
    }
  }

  reset.onclick = removeStyles;
});
