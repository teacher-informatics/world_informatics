function myTimer(){
    let js_timer = document.querySelector('.js_timer');
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    
    if (seconds < 9) {
        seconds = '0' + seconds;
    }
      
    if (minutes < 9) {
        minutes = '0' + minutes;
    }
      
    if (hours < 9) {
        hours = '0' + hours;
    }

    if (day < 9) {
        day = '0' + day;
    }
      
    js_timer.innerHTML = year + '-' + month + '-' + day + ' '+ hours + ':' +  minutes + ':' +    seconds;
}
  
    const myTimeout = setInterval(myTimer, 1000);
  
  
  
  