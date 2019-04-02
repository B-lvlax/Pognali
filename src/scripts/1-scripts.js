'use strict';

console.log('Погнали!');

/*===================================================================
  GLOBAL FUNCTIONS
=====================================================================*/

/* VARS
=====================================================================*/
var
  bodyWidth = document.body.offsetWidth,
  screenMD = 768;


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
  for(var i = 0; i < elems.length; i++) {
    elems[i].addEventListener(event, func);
  }
}
function removeEvent(elems, event, func) {
  if (elems.length === undefined) return elems.removeEventListener(event, func);
  for(var i = 0; i < elems.length; i++) {
    elems[i].remoEventListener(event, func);
  }
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
  var elems = select('.js-moveTitle');

  elems.forEach(function(el) {
    el.parentElement.addEventListener('mousemove', function(e) {
      if (!isMobile.any() && bodyWidth >= screenMD) {
        var elem = this.querySelector('.js-moveTitle');

        elem.style.transform =
        'translate3d(' +
        (e.clientX / 4 - (elem.offsetWidth / 3)) + 'px, ' +
        (e.clientY / 8 - (elem.offsetHeight / 2)) + 'px, 0)';
      }
    });
  });
}

/* MODAL windows
=====================================================================*/
var modal = null, modalTitle, modalContent;

function checkListener(e) {
  if (e.target === modal && e.target.classList.contains('active')) hideModal();
  if (e.keyCode === 27) hideModal();
}

function isModalLink(e) {
  e.preventDefault();
  if (e.target.hasAttribute('href')) modal = document.querySelector(e.target.getAttribute('href'));
  e.target.addEventListener('click', showModal);
}

function showModal() {
  if (modal === null) modal = document.querySelector('.js-modal');

  modalTitle = modal.querySelector('.js-modalTitle');
  modalContent = modal.querySelector('.js-modalContent');

  modal.removeAttribute('aria-hidden');
  modal.setAttribute('aria-modal', 'true');
  modal.classList.add('active');
  modal.querySelector('button[class$="-btnClose"]').addEventListener('click', hideModal);

  window.addEventListener('keydown', checkListener);
  window.addEventListener('click', checkListener);
}

function hideModal() {
  if (modal === null) return;

  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
  modal.classList.remove('active');
  modal.querySelector('button[class$="-btnClose"]').removeEventListener('click', hideModal);
  modal = null;

  window.removeEventListener('keydown', checkListener);
  window.removeEventListener('click', checkListener);
}




/*===================================================================
  OTHER SCRIPTS ONLOAD
=====================================================================*/
document.addEventListener('DOMContentLoaded', function() {

  window.onscroll = function() {
    bgPrlx('.js-bgPrlx', '100%', '140%', 5);
  };

  elemPrlx();

  var btnShow = document.querySelectorAll('.js-showModal');
  btnShow.forEach(function(el) {
    el.addEventListener('click', isModalLink);
  });


  /* Responsive tables
  =====================================================================*/
  (function() {

    var
      allTr = select('.js-table tr'),
      labels = [];

    allTr.forEach(function(tr) {
      var childs = tr.children;

      for(var i = 0; i < childs.length; i++) {
        if (childs[i].tagName === 'TH') labels.push(childs[i].innerHTML);
        else childs[i].dataset.label = labels[i];
      };
    });

  })();


  /* Lazy loading
  =====================================================================*/
  (function() {

    var
      lazyloadImages = select('.js-lazy'),
      lazyloadThrottleTimeout;

    function lazyload() {
      if (lazyloadThrottleTimeout) clearTimeout(lazyloadThrottleTimeout);

      lazyloadThrottleTimeout = setTimeout(function() {
        lazyloadImages.forEach(function(img) {
          if (img.offsetTop < (window.innerHeight + window.pageYOffset)) {
            img.src = img.dataset.src;
            img.classList.remove('js-lazy');
          }
        });

        if (lazyloadImages.length === 0) {
          removeEvent(document, 'scroll', lazyload);
          removeEvent(window, 'resize', lazyload);
          removeEvent(window, 'orientationChange', lazyload);
        }
      }, 20);
    }

    addEvent(document, 'scroll', lazyload);
    addEvent(window, 'resize', lazyload);
    addEvent(window, 'orientationChange', lazyload);

  })();


  /* Smooth scrolling
  =====================================================================*/
  (function() {

    var anchors = select('a[href~="#"]');

    for (var i = 0; i < anchors.length; i++) {
      addEvent(anchors[i], 'click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    }

  })();


  /* Button to scroll Up or Down
  =====================================================================*/
  (function() {

    var
      btn = select('.js-scrollBtn'),
      icon = select('svg', btn),
      flag;

    icon.style.transform = 'rotate(180deg)';

    function setScroll() {
      if (scrollThrottleTimeout) clearTimeout(scrollThrottleTimeout);

      var scrollThrottleTimeout = setTimeout(function() {
        if (window.pageYOffset <= document.body.scrollHeight / 1.75) {
          icon.style.transform = 'rotate(180deg)';
          flag = true;
        } else {
          icon.style.transform = 'rotate(0deg)';
          flag = false;
        }
      }, 20);
    }

    addEvent(document, 'scroll', setScroll);

    function moveTo(e) {
      e.preventDefault();
      if (flag) window.scrollBy(0, window.innerHeight);
      else window.scrollTo(0, 0);
    }

    addEvent(btn, 'click', moveTo);

  })();


  /* Calls from link for mobile devices only
  =====================================================================*/
  (function() {

    if (isMobile.any() && bodyWidth <= screenMD) {
      var linksPhone = select('.js-linkPhone');

      if (linksPhone.length === undefined) linksPhone.href = 'tel:' + linksPhone.dataset.phone;
      else {
        linksPhone.forEach(function(el) {
          el.href = 'tel:' + el.dataset.phone;
        });
      }
    }

  })();


});
