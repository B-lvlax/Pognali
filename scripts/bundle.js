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
  for (var i = 0; i < elems.length; i++) {
    elems[i].addEventListener(event, func);
  }
}
function removeEvent(elems, event, func) {
  if (elems.length === undefined) return elems.removeEventListener(event, func);
  for (var i = 0; i < elems.length; i++) {
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

  /* Parallax effect
  =====================================================================*/
  window.onscroll = function() {
    bgPrlx('#bgPrlx', '100%', '140%', 5);
  };


  /* Fixed background image effect
  =====================================================================*/
  var parents = select('#bgPrlx');
  parents.forEach(function(elem) {
    elem.onmousemove = elemPrlx;
  });


  /* Responsive tables
  =====================================================================*/
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


  /* Button to scroll Up or Down
  =====================================================================*/
  (function() {

    var
      btn = select('#scrollBtn'),
      icon = select('svg', btn),
      flag;

    icon.style.transform = 'rotate(180deg)';

    function setScroll() {
      if (scrollThrottleTimeout) clearTimeout(scrollThrottleTimeout);

      var scrollThrottleTimeout = setTimeout(function() {
        if (window.pageYOffset <= document.body.scrollHeight / 2) {
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

});

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

    forms.forEach(function(el) {
      el.setAttribute('novalidate', true);
    });

    function checkForm(form, e) {
      var
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
        e.preventDefault();
        form.classList.add('formError');
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
//# sourceMappingURL=bundle.js.map
