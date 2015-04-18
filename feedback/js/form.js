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

  function listenCountInputChange(counterBlock) {
    var input = counterBlock.querySelector('input');
    var plus = counterBlock.querySelector('.plus');
    var minus = counterBlock.querySelector('.minus');
    var templateName = counterBlock.getAttribute('data-template');
    var button = counterBlock.querySelectorAll('button');
    var template, containerName, container, i, result, travelersNumber;

    function toggleButtonState(disabled) {
      plus.disabled = disabled;
      minus.disabled = disabled;
    }

    if (templateName === null) {
      minus.addEventListener('click', function(event) {
        event.preventDefault();
        if (this === document.activeElement && input.value > (input.min || 0)) {
          input.value--;
        }
      }, false);
      plus.addEventListener('click', function(event) {
        event.preventDefault();
        input.classList.remove('invalid');
        input.value++;
      }, false);

      input.addEventListener('blur', function(event) {
        var daysCount = this.value;
        result = daysCount.match(/^\d+$/g);
        if (result === null) {
          if (daysCount === '') {
            toggleButtonState(false);
          }
          else {
            toggleButtonState(true);
            input.classList.add('invalid');
          }
        }
        else {
          toggleButtonState(false);
          input.classList.remove('invalid');
        }
      }, false);
    }

    else {
      template = document.querySelector('.' + templateName).innerHTML;
      containerName = counterBlock.getAttribute('data-container');
      container = document.querySelector('.' + containerName);
      travelersNumber = input.value;
      result = travelersNumber.match(/^\d+$/g);

      minus.addEventListener('click', function(event) {
        event.preventDefault();
        if ( this === document.activeElement ) {
          if (input.value > input.min) {
            input.value--;
            removeLastTraveler(container);
          }
        }
      }, false);

      plus.addEventListener('click', function(event) {
        event.preventDefault();
        input.classList.remove('invalid');
        addTraveler(container, template, ++input.value);
      }, false);

      input.addEventListener('blur', function(event) {
        var currentTravelersCount = container.childNodes.length;
        var newTravelersCount = this.value;
        result = newTravelersCount.match(/^\d+$/g);

        if (result === null || newTravelersCount < input.min) {
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
          if (newTravelersCount === '') {
            toggleButtonState(false);
          }
          else {
            toggleButtonState(true);
            input.classList.add('invalid');
          }
        }

        else {
          toggleButtonState(false);
          input.classList.remove('invalid');
          if (newTravelersCount > currentTravelersCount) {
            for (i = currentTravelersCount + 1; i <= newTravelersCount; i++) {
              addTraveler(container, template, i);
            }
          }
          else if (newTravelersCount < currentTravelersCount && newTravelersCount >= input.min) {
            for (i = newTravelersCount; i < currentTravelersCount; i++) {
              removeLastTraveler(container);
            }
          }
        }
      }, false);
    }
  }

  listenCountInputChange(adultsCounter);
  listenCountInputChange(childrenCounter);
  listenCountInputChange(daysCounter);

})();
