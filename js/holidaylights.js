document.addEventListener('DOMContentLoaded', function() {
  function generateHeartsOnClick() {
    function generateHeart(x, y, xBound, xStart, scale) {
        var heart = document.createElement('div');
        heart.setAttribute('class', 'heart');
        brd.appendChild(heart);
        heart.time = duration;
        heart.x = x;
        heart.y = y;
        heart.bound = xBound;
        heart.direction = xStart;
        heart.style.left = heart.x + 'px';
        heart.style.top = heart.y + 'px';
        heart.scale = scale;
        heart.style.transform = 'scale(' + scale + ',' + scale + ')';
        if (hearts === null)
            hearts = [];
        hearts.push(heart);
        return heart;
    }

    function frame() {
        var current = Date.now();
        var deltaTime = current - before;
        before = current;
        for (i in hearts) {
            var heart = hearts[i];
            heart.time -= deltaTime;
            if (heart.time > 0) {
                heart.y -= speed;
                heart.style.top = heart.y + 'px';
                heart.style.left = heart.x + heart.direction * heart.bound * Math.sin(heart.y * heart.scale / 30) / heart.y * 100 + "px";
            }
            else {
                heart.parentNode.removeChild(heart);
                hearts.splice(i, 1);
            }
        }
    }

    function check() {
        if (down) {
            var start = 1 - Math.round(Math.random()) * 2;
            var scale = Math.random() * Math.random() * 0.8 + 0.2;
            var bound = 30 + Math.random() * 20;
            generateHeart(event.pageX - brd.offsetLeft + cursorXOffset, event.pageY - brd.offsetTop + cursorYOffset, bound, start, scale);
        }
    }

    var brd = document.createElement('div');
		document.body.insertBefore(brd, document.getElementById('board'));

    var duration = 3000;
    var speed = 0.5;
    var cursorXOffset = 0;
    var cursorYOffset = 195;
    var hearts = [];
    var down = false;
    var event = null;

    document.onmousedown = function (e) {
        down = true;
        event = e;
    };

    document.onmouseup = function (e) {
        down = false;
    };

    document.onmousemove = function (e) {
        event = e;
    };

    document.ontouchstart = function (e) {
        down = true;
        event = e.touches[0];
    };

    document.ontouchend = function (e) {
        down = false;
    };

    document.ontouchmove = function (e) {
        event = e.touches[0];
    };

    var before = Date.now();
    var id = setInterval(frame, 5);
    var gr = setInterval(check, 100);
  }

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

  // Get the day of the month
  var currentDay = currentDate.getDate();

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

    // On Valentine's Day generate little hearts on click
    if (currentMonth === 2 && currentDay === 14) {
      generateHeartsOnClick();
    }
  }

  /* For testing */
  // letItSnow();
  // leavesAreFalling();
  // putUpChristmasLights();
  // generateHeartsOnClick();
});
