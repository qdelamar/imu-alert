
var actualCode = `
//override addeventlistener:
EventTarget.prototype._addEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function(a, b, c) {
  if(c==undefined)
    c=false;
  this._addEventListener(a,b,c);
  if(!this.eventListenerList)
    this.eventListenerList = {};
  if(!this.eventListenerList[a])
    this.eventListenerList[a] = [];
  this.eventListenerList[a].push({listener:b, options:c});
};


//check regularly (no event available...)
window.eventListenerList = {};

check_imu_loop = setInterval(function() {
  if(  (window.ondevicemotion!=null)
     ||(window.ondeviceorientation!=null)
     ||(window.ondeviceorientationabsolute!=null)
     ||("devicemotion" in window.eventListenerList)
     ||("deviceorientation" in window.eventListenerList)
     ||("deviceorientationabsolute" in window.eventListenerList)
     ){
    alert("This website is accessing IMU!");
    clearInterval(check_imu_loop);
  }
  }, 500);
`;

//inject the code:
var script = document.createElement('script');
script.appendChild(document.createTextNode(actualCode));
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);
