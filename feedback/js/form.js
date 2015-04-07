(function() {

  var minus = document.querySelectorAll('.minus');
  var plus = document.querySelectorAll('.plus');
  var input = document.querySelectorAll('.counter-input');
  var i = 0;

  var adults = document.querySelector('.adults');
  var children = document.querySelector('.children');
  var adultsInput = document.querySelector('.people-count');
  var childrenInput = document.querySelector('.children-count');
  var adultTemplate = document.querySelector("#adult-template").innerHTML;
  var childTemplate = document.querySelector("#child-template").innerHTML;
  var travelers = document.querySelector('.travelers');

  var parentInput, number, div, html;

  for (i = 0; i < minus.length; i++) {
    minus[i].addEventListener('click', function(event) {
      parentInput = this.parentNode.querySelector('.counter-input');
      event.preventDefault();

      if ( this === document.activeElement ) {
        if (parentInput.value > 1 || parentInput.name === "children-count" && parentInput.value > 0) {
          parentInput.value--;

          if ( adults === document.activeElement.parentNode) {
            div = document.querySelector(".adult-name").parentNode.parentNode.lastChild;
            travelers.removeChild(div);
          }
          else if ( children === document.activeElement.parentNode) {
            div = document.querySelector(".child-name").parentNode.parentNode.lastChild;
            travelers.removeChild(div);
          }
        }
      }
    }, false);
  }

  for (i = 0; i < plus.length; i++) {
    plus[i].addEventListener('click', function(event) {
      parentInput = this.parentNode.querySelector('.counter-input');
      event.preventDefault();
      parentInput.value++;

      if ( adults === document.activeElement.parentNode) {
        number = adultsInput.value;
        div = document.createElement("div");
        html = Mustache.render(adultTemplate, {
          "number": number
        });
        div.innerHTML = html;
        travelers.appendChild(div);
      }
      else if ( children === document.activeElement.parentNode) {
        number = childrenInput.value;
        div = document.createElement("div");
        html = Mustache.render(childTemplate, {
          "number": number
        });
        div.innerHTML = html;
        travelers.appendChild(div);
      }

    }, false);
  }

  for (i = 0; i < input.length; i++) {
    input[i].addEventListener('keyup', function() {
      this.value = this.value.replace(/\D/g,'');
    }, false);
  }

})();
