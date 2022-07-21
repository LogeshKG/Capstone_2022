console.clear()
function blurIt(nodes) {

for (let i = 0; i < nodes.length; i++) {
	if (nodes[i].children.length > 0) {
    	
    	blurIt(nodes[i].children);
        }
    else {
    	nodes[i].style.filter = "blur(3px)";
    }
  }
}

function unBlurIt(el) {

el.style.filter = "revert";

}

blurIt(document.body.children);

const elem = document.body;
elem.addEventListener("mouseout", function () {

blurIt(document.body.children);


});

document.addEventListener('mousemove', e => {
  const el = document.elementFromPoint(e.clientX, e.clientY)
  unBlurIt(el)
})

var INITIAL_WAIT = 3000;
var INTERVAL_WAIT = 10000;
var ONE_SECOND = 1000;

var events = ["mouseup", "keydown", "scroll", "mousemove"];
var startTime = Date.now();
var endTime = startTime + INITIAL_WAIT;
var totalTime = 0;
var clickCount = 0;
var buttonClickCount = 0;
var linkClickCount = 0;
var keypressCount = 0;
var scrollCount = 0;
var mouseMovementCount = 0;
var linkClickCount = 0;

setInterval(function () {
  if (!document.hidden && startTime <= endTime) {
      startTime = Date.now();
      totalTime += ONE_SECOND;
      formatTime(totalTime);
    }
  }, ONE_SECOND);

document.addEventListener("DOMContentLoaded", function () {
    events.forEach(function (e) {
      document.addEventListener(e, function () {
        endTime = Date.now() + INTERVAL_WAIT;
        if (e === "mouseup") {
          clickCount++;
          if (event.target.nodeName === 'BUTTON') {
            buttonClickCount++;
          }
          else if (event.target.nodeName === 'A') {
            linkClickCount++;
            console.log(linkClickCount);
          }
        }
        else if (e === "keydown") {
          keypressCount++;
          console.log(keypressCount);
          console.log(formatTime(totalTime));
        }
      });
    });
  });

function formatTime(ms) {
    var seconds = Math.floor(ms / 1000);
    seconds = seconds < 10 ? "0" + seconds : seconds;

    var minutes = Math.floor(ms / (1000 * 60));
    minutes = minutes < 10 ? "0" + minutes : minutes;

    var hours = Math.floor(ms / (1000 * 60 * 60));
    hours = hours < 10 ? "0" + hours : hours; 2

    return hours + ":" + minutes + ":" + seconds;
  }
