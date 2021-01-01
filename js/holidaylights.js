document.addEventListener('DOMContentLoaded', function() {
  function putUpChristmasLights() {
    var div = document.createElement('div');
    div.id = 'christmasLights';

    var ul = document.createElement('ul');
    ul.setAttribute('class','lightrope');

    for(var i=0; i<50; i++) {
      var li = document.createElement('li');
      ul.appendChild(li);
    }

    div.appendChild(ul);

    document.body.insertBefore(div, document.body.childNodes[0]);
  }

  function letItSnow() {
    var div = document.createElement('div');
    div.className = 'snow';
    div.innerHTML =  `
      <i class=snow_flake></i>
      <i class=snow_flake></i>
      <i class=snow_flake></i>
      <i class=snow_flake-600px></i>
      <i class=snow_flake-600px></i>
      <i class=snow_flake-600px></i>
      <i class=snow_flake-600px></i>
      <i class=snow_flake-768px></i>
      <i class=snow_flake-768px></i>
      <i class=snow_flake-1024px></i>
      <i class=snow_flake-1024px></i>
      <i class=snow_flake-1024px></i>
      <i class=snow_flake-1280px></i>
      <i class=snow_flake-1280px></i>
      <i class=snow_flake-1366px></i>
      <i class=snow_flake-1600px></i>
      <i class=snow_flake-1600px></i>
      <i class=snow_flake-1800px></i>
      <i class=snow_flake-1800px></i>
      <i class=snow_flake-1920px></i>
      <i class=snow_flake-1920px></i>`;

    document.body.insertBefore(div, document.body.childNodes[0]);
  }

  function leavesAreFalling() {
    var div = document.createElement('div');
    div.className = 'leaves';
    div.innerHTML =  `
      <i class=leaf></i>
      <i class=leaf></i>
      <i class=leaf-600px></i>
      <i class=leaf-768px></i>
      <i class=leaf-1024px></i>
      <i class=leaf-1280px></i>
      <i class=leaf-1366px></i>
      <i class=leaf-1600px></i>
      <i class=leaf-1800px></i>
      <i class=leaf-1920px></i>`;

    document.body.insertBefore(div, document.body.childNodes[0]);
  }

  // Get the current date
  var currentDate = new Date();

  // Get the numeric representation of the month.
  // JavaScripts starts with month 0, so we add 1
  var currentMonth = currentDate.getMonth() + 1;

  // Autumn Actions
  if (currentMonth === 9 || currentMonth === 10 || currentMonth === 11) {
    // Leaves fall during the Autumn months
    leavesAreFalling();
  }

  // Winter Actions
  if (currentMonth === 12 || currentMonth === 1 || currentMonth === 2) {
    // It snows during the Winter months
    letItSnow();

    // We put up the Christmas lights in December
    if (currentMonth === 12) {
      putUpChristmasLights();
    }
  }

  /* For testing */
  // letItSnow();
  // leavesAreFalling();
  // putUpChristmasLights();
});
