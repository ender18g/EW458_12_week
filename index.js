const startBtn = document.getElementById('startBtn');
const timerEl = document.getElementById('timerEl');
const robotEl = document.getElementById('robotEl')


const ip = '192.168.8.104';
const port = 9012;
const name = 'india'

const ros = new ROSLIB.Ros({
  url: `ws://${ip}:${port}`
});

ros.on('connection', ()=>{
  console.log('CONNECTED');
});

// make odom topic
const odomTopic = new ROSLIB.Topic({
  ros:ros,
  name: `/${name}/odom`,
  messageType: 'nav_msgs/Odometry'
});

// make odom subscriber
odomTopic.subscribe((msg)=>{
  const pos = msg.pose.pose.position;
  // move our robot to the new x,y
  const scale = 50
  robotEl.style.transform = `translate(${scale * pos.x}px, ${scale * pos.y}px)`


})










let time_ms = 58000;

startBtn.addEventListener('click', ()=>{
  console.log('button clicked');

    // make a setinterval to increment the time
    setInterval(()=>{
      // increase time
      time_ms += 10;
      // get units
      const minutes = Math.floor(time_ms/(1000 * 60));
      const seconds = Math.floor(time_ms%(1000 * 60)/(1000));
      const ms = time_ms % 1000;
    // change my timerel to the time
    timerEl.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}:${ms.toString().padStart(3,'0')}`;
    }, 10)
})