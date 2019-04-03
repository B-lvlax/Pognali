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
function bgPrlx(items, sizeX, sizeY, step) {
  var elems = document.querySelectorAll(items);

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

/*===================================================================*/

function elemPrlx(e) {
  var elems = document.querySelectorAll('.js-moveTitle');

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
    el.addEventListener('click', function(e) {
      e.preventDefault();
      if (e.target.hasAttribute('href')) {
        modal = document.querySelector(e.target.getAttribute('href'));
        showModal();
      }
    });
  });


  /* Responsive tables
  =====================================================================*/
  (function() {

    var
      allTr = document.querySelectorAll('.js-table tr'),
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
      lazyloadImages = document.querySelectorAll('.js-lazy'),
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
          document.removeEventListener('scroll', lazyload);
          window.removeEventListener('resize', lazyload);
          window.removeEventListener('orientationChange', lazyload);
        }
      }, 20);
    }

    document.addEventListener('scroll', lazyload);
    window.addEventListener('resize', lazyload);
    window.addEventListener('orientationChange', lazyload);

  })();


  /* Smooth scrolling
  =====================================================================*/
  (function() {

    var anchors = document.querySelectorAll('a[href~="#"]');

    for (var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', function(e) {
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
      btn = document.querySelector('.js-scrollBtn'),
      icon = btn.querySelector('svg'),
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

    document.addEventListener('scroll', setScroll);

    function moveTo(e) {
      e.preventDefault();
      if (flag) window.scrollBy(0, window.innerHeight);
      else window.scrollTo(0, 0);
    }

    btn.addEventListener('click', moveTo);

  })();


  /* Calls from link for mobile devices only
  =====================================================================*/
  (function() {

    if (isMobile.any() && bodyWidth <= screenMD) {
      var linksPhone = document.querySelectorAll('.js-linkPhone');

      linksPhone.forEach(function(el) {
        el.href = 'tel:' + el.dataset.phone;
      });
    }

  })();


});
