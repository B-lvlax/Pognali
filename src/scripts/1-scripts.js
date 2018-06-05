'use strict';

console.log('Погнали!');

// To prevent dragging imagges an links on page
document.addEventListener("dragstart", function( event ) {
  event.preventDefault();
  document.getElementsByTagName('img', 'a');
}, false);

