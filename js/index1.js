var mousetimeout;
var keypresstimeout;
var keydowntimeout;
var keyuptimeout;
var screensaver_active = false;
var idletime = 900;

// detect whether the mouse is moving
$(document).mousemove(function(){
  clearTimeout(mousetimeout);
  if (screensaver_active) {
    stop_screensaver();
  }
  mousetimeout = setTimeout(show_screensaver, 1000 * idletime);
})

$(document).keypress(function(){
  clearTimeout(keypresstimeout);
  if (screensaver_active) {
    stop_screensaver();
  }
  keypresstimeout = setTimeout(show_screensaver, 1000 * idletime);
})

$(document).keydown(function(){
  clearTimeout(keydowntimeout);
  if (screensaver_active) {
    stop_screensaver();
  }
  keydowntimeout = setTimeout(show_screensaver, 1000 * idletime);
})

$(document).keyup(function(){
  clearTimeout(keyuptimeout);
  if (screensaver_active) {
    stop_screensaver();
  }
  keyuptimeout = setTimeout(show_screensaver, 1000 * idletime);
})



// show screensaver function
function show_screensaver(){
  $("#screensaver").fadeIn();
  screensaver_active = true;
  screensaver_animation();
}

// function start screensaver
function screensaver_animation(){
  if (screensaver_active) {
    $("#screensaver").animate({
      backgroundColor: changeColor()}, screensaver_animation);
    }
}

// change color function
function changeColor() {
  myColor = "#000";
  return myColor;
}


// stop screensaver
function stop_screensaver(){
  $("#screensaver").fadeOut();
  screensaver_active = false;
}