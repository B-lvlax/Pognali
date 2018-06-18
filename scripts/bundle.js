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
function bgPrlx(elems, sizeX, sizeY, step) {

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
  if (!isMobile.any()) {
    var
      elem = this.querySelector('.js-moveTitle'),
      bodyWidth = document.body.offsetWidth;

    elem.parentElement.style.overflow = 'hidden';
    if (bodyWidth < 1024) {
      elem.style.transform =
        'translate3d(' +
        (e.clientX / 4 - (elem.offsetWidth / 4)) + 'px, ' +
        (e.clientY / 8 - (elem.offsetHeight / 2)) + 'px, 0)';
    } else {
      elem.style.transform =
        'translate3d(' +
        (e.clientX / 4 - (elem.offsetWidth / 2)) + 'px, ' +
        (e.clientY / 8 - (elem.offsetHeight / 2)) + 'px, 0)';
    }
  }
}


/*===================================================================
  OTHER SCRIPTS
=====================================================================*/
document.addEventListener('DOMContentLoaded', function() {

  window.onscroll = function() {
    // bgPrlx('.js-bgPrlx', 'auto', '140%', 5);
    bgPrlx('body', 'auto', '140%', 5);
  };

  /*===================================================================*/

  var parents = select('.js-bgPrlx');
  parents.forEach(function(elem) {
    elem.onmousemove = elemPrlx;
  });

});

//# sourceMappingURL=bundle.js.map
