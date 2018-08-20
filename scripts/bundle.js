'use strict';

console.log('Погнали!');

/*===================================================================
  GLOBAL FUNCTIONS
=====================================================================*/

/* DOM
=====================================================================*/
function select(selector, parent) {
  parent = parent || document;
  var selected = parent.querySelectorAll(selector);
  if (selected.length === 1) return selected[0];
  return selected;
}

function addEvent(elems, event, func) {
  if (elems.length === undefined) return elems.addEventListener(event, func);
  elems.forEach(function(elem) {
    elem.addEventListener(event, func);
  });
}
function removeEvent(elems, event, func) {
  if (elems.length === undefined) return elems.removeEventListener(event, func);
  elems.forEach(function(elem) {
    elem.removeEventListener(event, func);
  });
}

function addClass(elem, className) {
  elem.classList.add(className);
}
function removeClass(elem, className) {
  elem.classList.remove(className);
}
function toggleClass(elem, className) {
  elem.classList.toggle(className);
}
function hasClass(elem, className) {
  return elem.classList.contains(className);
}


/* TESTING
=====================================================================*/
function isNum(elem) {
  var val = elem.innerHTML || elem.value;
  return !isNaN(parseInt(val)) && val !== '' && val !== ' ';
}

var isMobile = {
  android: function android() {
    return navigator.userAgent.match(/Android/i);
  },
  blackberry: function blackberry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  ios: function ios() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  opera: function opera() {
    return navigator.userAgent.match(/Opera Mini/i) || navigator.userAgent.match(/opr/i) && typeof window.orientation !== "undefined";
  },
  windows: function windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isMobile.android() || isMobile.blackberry() || isMobile.ios() || isMobile.opera() || isMobile.windows();
  }
};


/* EFFECTS
=====================================================================*/
function bgPrlx(elems, sizeX, sizeY, step) {
  elems = select(elems);

  if (elems.length === undefined) addClass(elems, 'js-bgPrlx--single');
  else {
    if (isMobile.any()) {
      var scrolledY = Math.round(window.pageYOffset);

      elems.forEach(function(elem) {
        elem.style.backgroundAttachment = 'scroll';
        elem.style.backgroundSize = sizeX + ' ' + sizeY;
        elem.style.backgroundPosition =
          'center ' +
          ((scrolledY - Math.round(elem.offsetTop)) / step) + 'px';
      });
    }
  }
}

function elemPrlx(e) {
  var bodyWidth = document.body.offsetWidth;
  if (!isMobile.any() && bodyWidth >= 768) {
    var elem = this.querySelector('.js-moveTitle');

    elem.style.transform =
      'translate3d(' +
      (e.clientX / 4 - (elem.offsetWidth / 3)) + 'px, ' +
      (e.clientY / 8 - (elem.offsetHeight / 2)) + 'px, 0)';
  }
}



/*===================================================================
  OTHER SCRIPTS
=====================================================================*/
document.addEventListener('DOMContentLoaded', function() {

  window.onscroll = function() {
    bgPrlx('.js-bgPrlx', '100%', '140%', 5);
    // bgPrlx('body', '100%', '140%', 5);
  };

  /*===================================================================*/

  var parents = select('.js-bgPrlx');
  parents.forEach(function(elem) {
    elem.onmousemove = elemPrlx;
  });

});

'use strict';

document.addEventListener('DOMContentLoaded', function() {
  var
    wrapper = document.querySelector('.forms'),
    form = wrapper.querySelector('.form'),
    name = wrapper.querySelector('#name'),
    password = wrapper.querySelector('#password'),
    url = wrapper.querySelector('#site'),
    mail = wrapper.querySelector('#mail'),
    phone = wrapper.querySelector('#phone'),
    numFild = wrapper.querySelector('#number'),
    date = wrapper.querySelector('#date'),
    fields = [name, password, url, mail, phone, numField, date],
    reset = wrapper.querySelector('.forms-btn--reset'),
    submit = wrapper.querySelector('.forms-btn--submit');

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

  function checkBirth() {
    var test = /^\d{4}(\-\d{2}){2}$/.test(birth.value);

    if (birth.value === '') {
      birth.classList.remove('fieldValid');
      birth.classList.remove('fieldError');
      birth.value = '';
      return true;
    }
    else {
      if (addStyles(birth, test)) return true;
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
      if (el === surname && !checkTxtField(el, 5)) hasError.push(el);
      if (el === birth && !checkBirth()) hasError.push(el);
      if (el === phone && !checkPhone()) hasError.push(el);
      if (el === mail && !checkMail()) hasError.push(el);
    });

    setTimeout(function() {
      form.classList.remove('formError');
    }, 600);

    setTimeout(function() {
      removeStyles();
    }, 10000);
  }

  reset.onclick = removeStyles;
});

//# sourceMappingURL=bundle.js.map
