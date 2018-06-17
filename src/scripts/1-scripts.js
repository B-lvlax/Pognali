'use strict';

console.log('Погнали!');

/* DOM
=====================================================================*/
function select(selector, parent) {
  parent = parent || document;
  return parent.querySelector(selector);
}
function selectAll(selector, parent) {
  parent = parent || document;
  return parent.querySelectorAll(selector);
}

function removeClass(elem, className) {
  if (elem.classList) elem.classList.remove(className);
}
function addClass(elem, className) {
  if (elem.classList) elem.classList.add(className);
}
function hasClass(elem, className) {
  if (elem.classList) return elem.classList.contains(className);
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
    return navigator.userAgent.match(/Opera Mini/i);
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
function bgPrlx(elems, size, step) {
  elems = document.querySelectorAll(elems);

  if (elems.length === 1) {
    var body = document.body;
    body.classList.add('bgPrlx--single');
  } else {
    if (isMobile.any()) {
      var scrolledY = Math.round(window.pageYOffset);

      elems.forEach(function(elem) {
        elem.style.backgroundAttachment = 'scroll';
        elem.style.backgroundSize = 'center' + size + '%';
        elem.style.backgroundPosition = 'center ' + ((scrolledY - Math.round(elem.offsetTop)) / step) + 'px';
      });
    }
  }
}

function elemPrlx(e) {
  if (!isMobile.any()) {
    var elem = this.querySelector('.caption');

    elem.style.transform =
      'translate3d(' +
      (e.clientX / 8 - (elem.offsetWidth / 4)) + 'px, ' +
      (e.clientY / 8 - (elem.offsetHeight / 2)) + 'px, 0)';
  }
}

/* OTHER SCRIPTS
=====================================================================*/
document.addEventListener('DOMContentLoaded', function() {

  window.onscroll = function() {
    bgPrlx('.bgPrlx', 140, 5);
    // bgPrlx('.bgPrlx--1', 140, 5);
  };

  var parents = document.querySelectorAll('.bgPrlx');
  parents.forEach(function(elem) {
    elem.onmousemove = elemPrlx;
  });

});
