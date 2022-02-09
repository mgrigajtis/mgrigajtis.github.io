document.addEventListener('DOMContentLoaded', function() {
  var styles = `
  body {
    overflow: auto !important;
  }

  #christmasLights {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 50px;
      z-index: 50;
      overflow: hidden;
      pointer-events: none;
  }

  .lightrope {
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      position: absolute;
      z-index: 1;
      margin: -15px 0 0 0;
      padding: 0;
      pointer-events: none;
      width: 100%;
  }

  .lightrope li {
    position: relative;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    list-style: none;
    margin: 0;
    padding: 0;
    display: block;
    width: 12px;
    height: 28px;
    border-radius: 50%;
    margin: 20px;
    display: inline-block;
    background: #00f7a5;
    box-shadow: 0px 4.6666666667px 24px 3px #00f7a5;
    -webkit-animation-name: flash-1;
    animation-name: flash-1;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
  }

  .lightrope li:nth-child(2n+1) {
    background: cyan;
    box-shadow: 0px 4.6666666667px 24px 3px rgba(0, 255, 255, 0.5);
    -webkit-animation-name: flash-2;
    animation-name: flash-2;
    -webkit-animation-duration: 0.4s;
    animation-duration: 0.4s;
  }

  .lightrope li:nth-child(4n+2) {
    background: #f70094;
    box-shadow: 0px 4.6666666667px 24px 3px #f70094;
    -webkit-animation-name: flash-3;
    animation-name: flash-3;
    -webkit-animation-duration: 1.1s;
    animation-duration: 1.1s;
  }

  .lightrope li:nth-child(odd) {
    -webkit-animation-duration: 1.8s;
    animation-duration: 1.8s;
  }

  .lightrope li:nth-child(3n+1) {
    -webkit-animation-duration: 1.4s;
    animation-duration: 1.4s;
  }

  .lightrope li:before {
    content: "";
    position: absolute;
    background: #222;
    width: 10px;
    height: 9.3333333333px;
    border-radius: 3px;
    top: -4.6666666667px;
    left: 1px;
  }

  .lightrope li:after {
    content: "";
    top: -14px;
    left: 9px;
    position: absolute;
    width: 52px;
    height: 18.6666666667px;
    border-bottom: solid #222 2px;
    border-radius: 50%;
  }

  .lightrope li:last-child:after {
    content: none;
  }

  .lightrope li:first-child {
    margin-left: -40px;
  }

  @-webkit-keyframes flash-1 {
      0%, 100% {
          background: #00f7a5;
          box-shadow: 0px 4.6666666667px 24px 3px #00f7a5;
      }

      50% {
          background: rgba(0, 247, 165, 0.4);
          box-shadow: 0px 4.6666666667px 24px 3px rgba(0, 247, 165, 0.2);
      }
  }

  @keyframes flash-1 {
      0%, 100% {
          background: #00f7a5;
          box-shadow: 0px 4.6666666667px 24px 3px #00f7a5;
      }

      50% {
          background: rgba(0, 247, 165, 0.4);
          box-shadow: 0px 4.6666666667px 24px 3px rgba(0, 247, 165, 0.2);
      }
  }

  @-webkit-keyframes flash-2 {
      0%, 100% {
          background: cyan;
          box-shadow: 0px 4.6666666667px 24px 3px cyan;
      }

      50% {
          background: rgba(0, 255, 255, 0.4);
          box-shadow: 0px 4.6666666667px 24px 3px rgba(0, 255, 255, 0.2);
      }
  }

  @keyframes flash-2 {
      0%, 100% {
          background: cyan;
          box-shadow: 0px 4.6666666667px 24px 3px cyan;
      }

      50% {
          background: rgba(0, 255, 255, 0.4);
          box-shadow: 0px 4.6666666667px 24px 3px rgba(0, 255, 255, 0.2);
      }
  }

  @-webkit-keyframes flash-3 {
      0%, 100% {
          background: #f70094;
          box-shadow: 0px 4.6666666667px 24px 3px #f70094;
      }

      50% {
          background: rgba(247, 0, 148, 0.4);
          box-shadow: 0px 4.6666666667px 24px 3px rgba(247, 0, 148, 0.2);
      }
  }

  @keyframes flash-3 {
      0%, 100% {
          background: #f70094;
          box-shadow: 0px 4.6666666667px 24px 3px #f70094;
      }

      50% {
          background: rgba(247, 0, 148, 0.4);
          box-shadow: 0px 4.6666666667px 24px 3px rgba(247, 0, 148, 0.2);
      }
  }

  /* Snow styling */
  .snow {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 50;
    overflow: none;

    /* Pass-through click events */
    pointer-events: none;

    /* Encourage hardware acceleration */
    /* 20vh per row of flakes - adjust falling animation too  */
    transform: translate3d(0, -20vh, 0);

    /* Flex used to space the i tags evenly horizontally. Plays nicely at inbetween widths */
    /* Temporarily disable if you are adjusting the number of flakes on screen */
    display:flex;
    justify-content: space-between;

    /* Allow for multi row snowflakes */
    flex-wrap: wrap;
  }

  /* Generic styling of snowflakes, default animation and transform */
  [class^="snow_flake"] {
    will-change: transform;
    display: inline-block;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000;
    animation: falling;
    animation-iteration-count: infinite;

    /* Filter is completely optional and may cause performance issues on low powered GPUs. */
    /* filter: drop-shadow(0 1px 1px rgba(0,0,0,.125)) blur(1px); */
    background-size: contain;
    background-repeat: no-repeat;
    backface-visibility: hidden;

    /* Snowflake image */
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96' fill='%23fff' fill-rule='evenodd'%3E%3Cpath d='M38.2 65l1-9.7 6.8-3.8v7.8L38.2 65zM58 65l-8-5.8v-7.8l6.8 4 1 9.6zm9.8-17l-9 3.8-6.6-3.8 7-4 8.6 4zm-39.4 0l8.7-4 7 4-6.5 3.8-8.8-4zM58 31l-1 9.6-7 4v-8l8-5.7zm-19.8 0l7.8 5.5v8l-6.7-3.8-1-9.8zm12-17L60.5 3.5l2.8 3-13.3 13v12L63 22l-1.7 16 10.2-5.7 5-18.3 4 1-4 14.4 12.2-7 2 3.6-12 7L93 37l-1.3 3.8-18.2-5-10.2 5.8L78 48l-14.7 6.4 10 5.6 18-5 1.2 4-14.3 3.8L90.6 70l-2 3.5L76 66.3l4 14.4-4 1-5-18.2-9.8-5.6L63 73.3 50 64v11.6L63.3 89l-2.8 3L50 81.5V96h-4V81.5L35.4 92l-2.8-3L46 75.8V64.4l-12.8 9.3 1.7-16-10.5 6-5 18-4-1 4-14.3-12.5 7L5 70l13-7.2-14.5-4 1-3.8L23 60l10-5.7L18.3 48l14.4-6.4-10.2-6-18.3 5-1-3.8 14.3-4-12.2-7 2-3.4 12.2 7-4-14.4 4-1 5 18.2 10.4 6-2-16 13 9.2V19.8L32.4 6.3l3-2.8L46 14V0h4v14z'/%3E%3C/svg%3E");
  }

  /* Four sizes, each requires individual origins set */
  [class^="snow_flake"]:nth-child(4n+0) {
    width: 2.5rem;
    height: 2.5rem;
    transform-origin: -5% -5%;
  }

  [class^="snow_flake"]:nth-child(4n+1) {
    width: 2rem;
    height: 2rem;
    transform-origin: 15% 0;
  }

  [class^="snow_flake"]:nth-child(4n+2) {
    width: 1.5rem;
    height: 1.5rem;
    transform-origin: 0 -30%;
  }

  [class^="snow_flake"]:nth-child(4n+3) {
    width: 1rem;
    height: 1rem;
    transform-origin: -100% -100%;
  }

  /* Keep first snowflake close to the edge */
  [class^="snow_flake"]:first-child {
    transform-origin: 60% 40%;
  }

  /* Delay the start times */
  [class^="snow_flake"]:nth-of-type(5n+0) {
    animation-delay: 0s;
  }

  [class^="snow_flake"]:nth-of-type(5n+1) {
    animation-delay: 2s;
  }

  [class^="snow_flake"]:nth-of-type(5n+2) {
    animation-delay: 4s;
  }

  [class^="snow_flake"]:nth-of-type(5n+3) {
    animation-delay: 6s;
  }

  [class^="snow_flake"]:nth-of-type(5n+4) {
    animation-delay: 8s;
  }

  /* Animation durations are calculated to be multiples of each other +/- a few seconds for initial delays */
  [class^="snow_flake"]:nth-child(3n+0) {
    animation-duration: 12s;
  }

  [class^="snow_flake"]:nth-child(3n+1) {
    animation-duration: 18s;
  }

  [class^="snow_flake"]:nth-child(3n+2) {
    animation-duration: 24s;
  }

  /* Tweak timing functions - a tad more random */
  [class^="snow_flake"]:nth-of-type(6n+0) {
    animation-timing-function: ease-in-out;
  }

  [class^="snow_flake"]:nth-of-type(6n+1) {
    animation-timing-function: ease-out;
  }

  [class^="snow_flake"]:nth-of-type(6n+2) {
    animation-timing-function: ease;
  }

  [class^="snow_flake"]:nth-of-type(6n+3) {
    animation-timing-function: ease-in;
  }

  [class^="snow_flake"]:nth-of-type(6n+4) {
    animation-timing-function: linear;
  }

  [class^="snow_flake"]:nth-of-type(6n+5) {
    animation-timing-function: cubic-bezier(0.2, 0.3, 0.8, 0.9);
  }

  /* Tweak opacity - more randomness */
  [class^="snow_flake"]:nth-of-type(7n+0) {opacity: 0.6;}
  [class^="snow_flake"]:nth-of-type(7n+1) {opacity: 0.9;}
  [class^="snow_flake"]:nth-of-type(7n+2) {opacity: 0.5;}
  [class^="snow_flake"]:nth-of-type(7n+4) {opacity: 0.8;}
  [class^="snow_flake"]:nth-of-type(7n+6) {opacity: 0.7;}

  /* Filter is completely optional, and it may cause performance issues on low powered GPUs. */
  [class^="snow_flake"]:nth-of-type(3n+0) {
    filter: drop-shadow(0 1px 1px rgba(0,0,0,.125));
  }

  [class^="snow_flake"]:nth-of-type(3n+1) {
    filter: blur(1px);
  }

  /* Increase number of snowflakes at common device widths */
  .snow_flake-600px,
  .snow_flake-768px,
  .snow_flake-1024px,
  .snow_flake-1280px,
  .snow_flake-1366px,
  .snow_flake-1440px,
  .snow_flake-1600px,
  .snow_flake-1800px,
  .snow_flake-1920px {
    display: none;
  }

  @media (min-width: 300px) {
    .snow_flake-600px {
      display: inline-block;
    }
  }

  @media (min-width: 600px) {
    .snow_flake-600px {
      display: inline-block;
    }
  }

  @media (min-width: 768px) {
    .snow_flake-768px {
      display: inline-block;
    }
  }

  @media (min-width: 1024px) {
    .snow_flake-1024px {
      display: inline-block;
    }
  }

  @media (min-width: 1280px) {
    .snow_flake-1280px {
      display: inline-block;
    }
  }

  @media (min-width: 1366px) {
    .snow_flake-1366px {
      display: inline-block;
    }
  }

  @media (min-width: 1600px) {
    .snow_flake-1600px {
      display: inline-block;
    }
  }

  @media (min-width: 1800px) {
    .snow_flake-1800px {
      display: inline-block;
    }
  }

  @media (min-width: 1920px) {
    .snow_flake-1920px {
      display: inline-block;
    }
  }

  /* Animation for all snowflakes */
  @keyframes falling {
    from {
      transform: translate(0, 0) rotate(0deg) scale(0.8);
    }
    to {
      transform: translate(0, 120vh) rotate(360deg) scale(1.2);
    }
  }

  /* Falling leaves styling */
  .leaves {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 50;
    overflow: none;

    /* Pass-through click events */
    pointer-events: none;

    /* Encourage hardware acceleration */
    /* 20vh per row of leaves - adjust leaves-falling animation too  */
    transform: translate3d(0, -20vh, 0);

    /* Flex used to space the i tags evenly horizontally. Plays nicely at inbetween widths */
    /* Temporarily disable if you are adjusting the number of leaves on screen */
    display:flex;
    justify-content: space-between;

    /* Allow for multi row leaves */
    flex-wrap: wrap;
  }

  /* Generic styling of leaves, default animation and transform */
  [class^="leaf"] {
    will-change: transform;
    display: inline-block;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000;
    animation: leaves-falling;
    animation-iteration-count: infinite;

    /* Filter is completely optional and may cause performance issues on low powered GPUs. */
    /* filter: drop-shadow(0 1px 1px rgba(0,0,0,.125)) blur(1px); */
    background-size: contain;
    background-repeat: no-repeat;
    backface-visibility: hidden;

    /* Leaf image */
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='50px' height='60px' viewBox='0 0 50 60' enable-background='new 0 0 50 60' xml:space='preserve'%3E%3Cimage id='image0' width='50' height='60' x='0' y='0' href='data:image/png;base64,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' /%3E%3C/svg%3E%0A");
  }

  /* Four sizes, each requires individual origins set */
  [class^="leaf"]:nth-child(4n+0) {
    width: 2.5rem;
    height: 2.5rem;
    transform-origin: -5% -5%;
  }

  [class^="leaf"]:nth-child(4n+1) {
    width: 2rem;
    height: 2rem;
    transform-origin: 15% 0;
  }

  [class^="leaf"]:nth-child(4n+2) {
    width: 1.5rem;
    height: 1.5rem;
    transform-origin: 0 -30%;
  }

  [class^="leaf"]:nth-child(4n+3) {
    width: 1rem;
    height: 1rem;
    transform-origin: -100% -100%;
  }

  /* Keep first leaf close to the edge */
  [class^="leaf"]:first-child {
    transform-origin: 60% 40%;
  }

  /* Delay the start times */
  [class^="leaf"]:nth-of-type(5n+0) {
    animation-delay: 0s;
  }

  [class^="leaf"]:nth-of-type(5n+1) {
    animation-delay: 2s;
  }

  [class^="leaf"]:nth-of-type(5n+2) {
    animation-delay: 4s;
  }

  [class^="leaf"]:nth-of-type(5n+3) {
    animation-delay: 6s;
  }

  [class^="leaf"]:nth-of-type(5n+4) {
    animation-delay: 8s;
  }

  /* Animation durations are calculated to be multiples of each other +/- a few seconds for initial delays */
  [class^="leaf"]:nth-child(3n+0) {
    animation-duration: 12s;
  }

  [class^="leaf"]:nth-child(3n+1) {
    animation-duration: 18s;
  }

  [class^="leaf"]:nth-child(3n+2) {
    animation-duration: 24s;
  }

  /* Tweak timing functions - a tad more random */
  [class^="leaf"]:nth-of-type(6n+0) {
    animation-timing-function: ease-in-out;
  }

  [class^="leaf"]:nth-of-type(6n+1) {
    animation-timing-function: ease-out;
  }

  [class^="leaf"]:nth-of-type(6n+2) {
    animation-timing-function: ease;
  }

  [class^="leaf"]:nth-of-type(6n+3) {
    animation-timing-function: ease-in;
  }

  [class^="leaf"]:nth-of-type(6n+4) {
    animation-timing-function: linear;
  }

  [class^="leaf"]:nth-of-type(6n+5) {
    animation-timing-function: cubic-bezier(0.2, 0.3, 0.8, 0.9);
  }

  /* Tweak opacity - more randomness */
  [class^="leaf"]:nth-of-type(7n+0) {opacity: 0.6;}
  [class^="leaf"]:nth-of-type(7n+1) {opacity: 0.9;}
  [class^="leaf"]:nth-of-type(7n+2) {opacity: 0.5;}
  [class^="leaf"]:nth-of-type(7n+4) {opacity: 0.8;}
  [class^="leaf"]:nth-of-type(7n+6) {opacity: 0.7;}

  /* Filter is completely optional, and it may cause performance issues on low powered GPUs. */
  [class^="leaf"]:nth-of-type(3n+0) {
    filter: drop-shadow(0 1px 1px rgba(0,0,0,.125));
  }

  /* Increase number of snowflakes at common device widths */
  .leaf-600px,
  .leaf-768px,
  .leaf-1024px,
  .leaf-1280px,
  .leaf-1366px,
  .leaf-1440px,
  .leaf-1600px,
  .leaf-1800px,
  .leaf-1920px {
    display: none;
  }

  @media (min-width: 300px) {
    .leaf-600px {
      display: inline-block;
    }
  }

  @media (min-width: 600px) {
    .leaf-600px {
      display: inline-block;
    }
  }

  @media (min-width: 768px) {
    .leaf-768px {
      display: inline-block;
    }
  }

  @media (min-width: 1024px) {
    .leaf-1024px {
      display: inline-block;
    }
  }

  @media (min-width: 1280px) {
    .leaf-1280px {
      display: inline-block;
    }
  }

  @media (min-width: 1366px) {
    .leaf-1366px {
      display: inline-block;
    }
  }

  @media (min-width: 1600px) {
    .leaf-1600px {
      display: inline-block;
    }
  }

  @media (min-width: 1800px) {
    .leaf-1800px {
      display: inline-block;
    }
  }

  @media (min-width: 1920px) {
    .leaf-1920px {
      display: inline-block;
    }
  }

  /* Animation for all leaves */
  @keyframes leaves-falling {
    from {
      transform: translate(0, 0) rotate(0deg) scale(0.8);
    }
    to {
      transform: translate(0, 120vh) rotate(360deg) scale(1.2);
    }
  }


  /* Heart Animation Styling */
  @keyframes heartfade {
      0% {
          opacity: 1;
      }

      50% {
          opacity: 0;
      }
  }

  .heart {
      z-index: 50;
      animation: heartfade 6s linear;
      position: absolute;
  }

  .heart:before,
  .heart:after {
      content: "";
      background-color: #fc2a62;
      position: absolute;
      height: 30px;
      width: 45px;
      border-radius: 15px 0px 0px 15px;
  }

  .heart:before {
      transform: rotate(45deg);
  }

  .heart:after {
      left: 10.5px;
      transform: rotate(135deg);
  }`;

  var styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

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
