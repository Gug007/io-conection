import fs from 'fs'

const getRandom = (min, max) =>  Math.floor(Math.random() * (max - min + 1)) + min;

export default ioClient => {
  return function() {
    send()
    console.log('Connected!');
  }

  function send() {
    const random = getRandom(10, 200)
    setTimeout(() => {
      ioClient.emit('message', { data: random });
      if(ioClient.connected) {
        send()
        console.log('edge >>', random );
      }
    }, random)
  }
}