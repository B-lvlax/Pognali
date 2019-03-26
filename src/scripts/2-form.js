/*===================================================================
  Forms
=====================================================================*/
'use strict';

(function() {

  document.addEventListener('DOMContentLoaded', function() {
    var
      form = select('#form'),
      form1 = select('#form-1'),
      forms = document.querySelectorAll('.js-validate'),
      inputPhones = select('input[type="tel"]'),
      reset = select('#btnReset'),
      reset1 = select('#btnReset-1');

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

    addEvent(inputPhones, 'blur', function() {
      if (this.value.length === 10) {
        var x = this.value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{2})(\d{2})/);
        this.value = '(' + x[1] + ') ' + x[2] + '-' + x[3] + '-' + x[4];
      }
    });

    /*===================================================================*/

    function sendRequest(someForm) {
      var xhr = new XMLHttpRequest();
      var formData = new FormData(someForm);

      if(!xhr) {
        alert('Cannot create an XMLHTTP instance.');
        return false;
      }

      xhr.onreadystatechange = function() {
        if(this.readyState === 4) {
          if(this.status === 200) {
            alert(this.responseText);
          } else {
            alert('There was a problem with the request.');
          }
        }
      };

      //- xhr.onerror = function() {
        //- if (this.readyState == 4 && this.status == 200) {
          //- alert(this.responseText);
        //- }
      //- };

      xhr.open('POST', 'send.php', true);
      //- xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      //- Set response headers to work in Internet Explorer.
      //- xhr.setRequestHeader('Content-Type', 'application/xml');
      xhr.send(formData);
      //- xhr.send('userName=' + encodeURIComponent(userName));
    }

    /*===================================================================*/

    forms.forEach(function(el) {
      el.setAttribute('novalidate', true);
    });

    function checkForm(form, e) {
      e.preventDefault();

      var
        whisperer = select('input[hidden]', form),
        name = select('input[name="name"]', form),
        pass = select('input[type="password"]', form),
        url = select('input[type="url"]', form),
        mail = select('input[type="email"]', form),
        phone = select('input[type="tel"]', form),
        num = select('input[type="number"]', form),
        date = select('input[type="date"]', form),
        fields = [name, pass, url, mail, phone, num, date],
        hasError = [];

      var
        checkTxtField = /^([a-zа-яё]+)$/i.test(name.value) && name.value.length >= 3,
        checkPass = /^(?=(?:.*?\d){1})(?=(?:.*?[A-Z]))(?=(?:.*?[a-z]))\w{1,}$/.test(pass.value) && 6 <= pass.value.length,
        checkUrl = /^(((https?|ftp)\:\/\/)?([\w-]+\.)?([\w-])+\.(\w)+\/?[\w\?\.\=\&\-\#\+\/]+)$/.test(url.value),
        checkMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value),
        checkPhone = /^\(\d{3}\)\s\d{3}(\-\d{2}){2}$/.test(phone.value), // For it's work well with decimals input must have attribute step.
        checkNum = /^[\d]+([.|,][\d])?$/.test(num.value) && 3 >= num.value.length,
        checkDate = /^\d{4}(\-\d{2}){2}$/.test(date.value);

      fields.forEach(function(el) {
        if (el.name === 'name' && !addStyles(el, checkTxtField)) hasError.push(el);
        if (el.type === 'password' && !addStyles(el, checkPass)) hasError.push(el);
        if (el.type === 'url' && !addStyles(el, checkUrl)) hasError.push(el);
        if (el.type === 'email' && !addStyles(el, checkMail)) hasError.push(el);
        if (el.type === 'tel' && !addStyles(el, checkPhone)) hasError.push(el);
        if (el.type === 'number' && !addStyles(el, checkNum)) hasError.push(el);
        if (el.type === 'date' && !addStyles(el, checkDate)) hasError.push(el);
      });

      if (hasError.length !== 0) {
        form.classList.add('formError');
      } else if (whisperer.value.length !== 0) {
        return;
      } else {
        sendRequest(form);
      }

      setTimeout(function() {
        form.classList.remove('formError');
      }, 600);
    }

    /*===================================================================*/

    form.addEventListener('submit', checkForm.bind(form, form));
    reset.addEventListener('click', removeStyles.bind(reset, form));

    form1.addEventListener('submit', checkForm.bind(form1, form1));
    reset1.addEventListener('click', removeStyles.bind(reset1, form1));

  });

})();
