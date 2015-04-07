(function() {

  var adultsCounter = document.querySelector('.adults');
  var childrenCounter = document.querySelector('.children');
  var daysCounter = document.querySelector('.days');

  function removeLastTraveler(container) {
    container.removeChild(container.lastChild);
  }

  function addTraveler(container, template, number) {
    var nameBlock = document.createElement("div");
    nameBlock.innerHTML = Mustache.render(template, { "number": number });
    container.appendChild(nameBlock);
  }

  function onKeyup() {
    this.value = this.value.replace(/\D/g,'');
  }

  function listenCountInputChange(counterBlock) {
    var input = counterBlock.querySelector('input');
    var plus = counterBlock.querySelector('.plus');
    var minus = counterBlock.querySelector('.minus');
    var templateName = counterBlock.getAttribute('data-template');
    var template, containerName, container, templateContent;

    input.addEventListener('keyup', onKeyup, false);

    if (templateName === null) {
      minus.addEventListener('click', function(event) {
        event.preventDefault();
        if (input.value > 0) {
          input.value--;
        }
      }, false);

      plus.addEventListener('click', function(event) {
        event.preventDefault();
        input.value++;
      }, false);
    }

    else {
      template = document.querySelector('.' + templateName);
      containerName = counterBlock.getAttribute('data-container');
      container = document.querySelector('.' + containerName);
      templateContent = template.innerHTML;
      minus.addEventListener('click', function(event) {
        event.preventDefault();

        if ( this === document.activeElement ) {
          if (input.value > 1 || input.name === "children-count" && input.value > 0) {
            input.value--;
            removeLastTraveler(container);
          }
        }
      }, false);

      plus.addEventListener('click', function(event) {
        event.preventDefault();
        addTraveler(container, templateContent, ++input.value);
      }, false);

      input.addEventListener('blur', function(event) {
        var currentTravelersCount = container.childNodes.length;
        var newTravelersCount = this.value;
        var i;

        if (newTravelersCount > currentTravelersCount) {
          for (i = currentTravelersCount + 1; i <= newTravelersCount; i++) {
            addTraveler(container, templateContent, i);
          }
        }
        else if (newTravelersCount < currentTravelersCount && newTravelersCount >= input.min) {
          for (i = newTravelersCount; i < currentTravelersCount; i++) {
            removeLastTraveler(container);
          }
        }
      }, false);
    }
  }

  listenCountInputChange(adultsCounter);
  listenCountInputChange(childrenCounter);
  listenCountInputChange(daysCounter);

})();
