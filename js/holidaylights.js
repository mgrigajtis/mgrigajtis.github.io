document.addEventListener('DOMContentLoaded', function() {
  /************************************\
  | generateLightRope                  |
  |                                    |
  | This function returns a UL object  |
  | with 50 li elements.  This is what |
  | ties to the CSS                    |
  \************************************/
  function generateLightRope(callback) {
    var ul = document.createElement('ul');
    ul.setAttribute('class','lightrope');

    for(var i=0; i<50; i++) {
      var li = document.createElement('li');
      ul.appendChild(li);
    }

    if (callback) {
      callback(ul);
    }
  }

  // Get the current date
  var currentDate = new Date();

  // Get the numeric representation of the month.
  // JavaScripts starts with month 0, so we add 1
  var currentMonth = currentDate.getMonth() + 1;

  // This is the DIV that gets appended to the document body
  var div = document.createElement('div');
  generateLightRope(function(ul) {
    div.appendChild(ul);

    // This is the id of the div that gets set based on the month
    var divId = '';

    switch(currentMonth) {
      case 12:
        divId = 'christmasLights';
        break;
    }

    // Append the div to the body if it is a certain time of year
    if (divId !== '') {
      div.id = divId;
      document.body.appendChild(div);
    }
  });
});
