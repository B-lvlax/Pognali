/*===================================================================
  Forms
=====================================================================*/
'use strict';

(function() {

  document.addEventListener('DOMContentLoaded', function() {
    var
      forms = document.querySelectorAll('.js-validate'),
      inputPhones = document.querySelectorAll('.js-inpPhone'),
      resets = document.querySelectorAll('.js-btnReset');

    /*===================================================================*/

    function removeStyles(form) {
      form.classList.remove('formError');
      form.querySelectorAll('input').forEach(function(el) {
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

    inputPhones.forEach(function(el) {
      el.addEventListener('blur', function() {
        if (this.value.length === 10) {
          var x = this.value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{2})(\d{2})/);
          this.value = '(' + x[1] + ') ' + x[2] + '-' + x[3] + '-' + x[4];
        }
      });
    });

    /*===================================================================*/

    function showResponse(response) {
      showModal();
      modalTitle.innerHTML = modalTitle.innerHTML;
      modalContent.innerHTML = '<b>' + response + '</b>';
    }

    function sendRequest(someForm) {
      var
        xhr = new XMLHttpRequest(),
        formData = new FormData(someForm);

      if(!xhr) {
        showResponse('Cannot create an XMLHTTP instance.');
        // showResponse('Не удалось установить XMLHTTP соединение.');
        return false;
      }

      xhr.onreadystatechange = function() {
        if(this.readyState === 4) {
          if(this.status === 200) showResponse(this.responseText);
          else showResponse(this.responseText);
        }
      };

      xhr.open('POST', 'send.php', true);
      xhr.send(formData);
    }

    /*===================================================================*/

    function checkForm(form, e) {
      e.preventDefault();

      var
        whisperer = form.querySelector('input[hidden]'),
        name = form.querySelector('input[name="name"]'),
        pass = form.querySelector('input[type="password"]'),
        url = form.querySelector('input[type="url"]'),
        mail = form.querySelector('input[type="email"]'),
        phone = form.querySelector('input[type="tel"]'),
        num = form.querySelector('input[type="number"]'),
        date = form.querySelector('input[type="date"]'),
        allFields = [name, pass, url, mail, phone, num, date],
        hasError = [];

      allFields.forEach(function(el) {
        if (el !== null && el.name === 'name') {
          var test = /^([a-zа-яё]+)$/i.test(name.value) && name.value.length >= 3;
          if (!addStyles(el, test)) hasError.push(el);
        }
        if (el !== null && el.type === 'password') {
          var test = /^(?=(?:.*?\d){1})(?=(?:.*?[A-Z]))(?=(?:.*?[a-z]))\w{1,}$/.test(pass.value) && 6 <= pass.value.length;
          if (!addStyles(el, test)) hasError.push(el);
        }
        if (el !== null && el.type === 'url') {
          var test = /^(((https?|ftp)\:\/\/)?([\w-]+\.)?([\w-])+\.(\w)+\/?[\w\?\.\=\&\-\#\+\/]+)$/.test(url.value);
          if (!addStyles(el, test)) hasError.push(el);
        }
        if (el !== null && el.type === 'email') {
          var test = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value);
          if (!addStyles(el, test)) hasError.push(el);
        }
        if (el !== null && el.type === 'tel') {
          var test = /^\(\d{3}\)\s\d{3}(\-\d{2}){2}$/.test(phone.value);
          if (!addStyles(el, test)) hasError.push(el);
        }
        if (el !== null && el.type === 'number') {
          var test = /^[\d]+([.|,][\d])?$/.test(num.value) && 3 >= num.value.length; // For it's work well with decimals input must have attribute step.
          if (!addStyles(el, test)) hasError.push(el);
        }
        if (el !== null && el.type === 'date') {
          var test = /^\d{4}(\-\d{2}){2}$/.test(date.value);
          if (!addStyles(el, test)) hasError.push(el);
        }
      });

      if (hasError.length !== 0) form.classList.add('formError');
      else if (whisperer.value.length !== 0) return;
      else sendRequest(form);

      setTimeout(function() {
        form.classList.remove('formError');
      }, 600);
    }

    /*===================================================================*/

    forms.forEach(function(form) {
      form.setAttribute('novalidate', true);
      form.addEventListener('submit', checkForm.bind(form, form));

      resets.forEach(function(reset) {
        reset.addEventListener('click', removeStyles.bind('reset', form));
      });
    });

  });


})();
