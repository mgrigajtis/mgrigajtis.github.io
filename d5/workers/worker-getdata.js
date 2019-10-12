self.addEventListener('message', function(e) {
  if (e.data[0] === 'close') {
    self.close();
  } else {
    // Load the raw anonymous data:
    var url = 'https://raw.githubusercontent.com/mgrigajtis/mgrigajtis.github.io/master/d5/data/data.json';
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
          switch(xmlhttp.status) {
            case 200:
              var data = JSON.parse(xmlhttp.responseText);
              postMessage(data);
              break;
            default:
              postMessage('');
              break;
          }
        }
    };

    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  }
});
