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

/*===================================================================*/

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


/* TESTING
=====================================================================*/
function isNum(elem) {
  var val = elem.innerHTML || elem.value;
  return !isNaN(parseInt(val)) && val !== '' && val !== ' ';
}

/*===================================================================*/

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

  if (elems.length === undefined) addClass(elems, 'bgPrlx--single');
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

/*===================================================================*/

function elemPrlx(e) {
  var bodyWidth = document.body.offsetWidth;
  if (!isMobile.any() && bodyWidth >= 768) {
    var elem = this.querySelector('#moveTitle');

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
    bgPrlx('#bgPrlx', '100%', '140%', 5);
  };

  /*===================================================================*/

  var parents = select('#bgPrlx');
  parents.forEach(function(elem) {
    elem.onmousemove = elemPrlx;
  });

  /*===================================================================*/

  var
    allTr = select('#table tr'),
    labels = [];

    allTr.forEach(function(tr) {
      var childs = tr.children;

      for(var i = 0; i < childs.length; i++) {
        if (childs[i].tagName === 'TH') labels.push(childs[i].innerHTML);
        else childs[i].dataset.label = labels[i];
      };
    });

});
