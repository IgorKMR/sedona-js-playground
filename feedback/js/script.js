(function() {

  var minus = document.querySelectorAll('.minus');
  var plus = document.querySelectorAll('.plus');
  var input = document.querySelectorAll('.counter-input');
  var i = 0;

  for (i = 0; i < minus.length; i++) {
    minus[i].addEventListener('click', function(event) {
      var parentInput = this.parentNode.querySelector('.counter-input');
      event.preventDefault();

      if ( this === document.activeElement ) {
        if (parentInput.value > 1 || parentInput.name === "children-count" && parentInput.value > 0) {
          parentInput.value--;
        }
      }
    }, false);
  }

  for (i = 0; i < plus.length; i++) {
    plus[i].addEventListener('click', function(event) {
      var parentInput = this.parentNode.querySelector('.counter-input');
      event.preventDefault();
      parentInput.value++;
    }, false);
  }

  for (i = 0; i < input.length; i++) {
    input[i].addEventListener('keyup', function() {
      this.value = this.value.replace(/\D/g,'');
    }, false);
  }

})();
