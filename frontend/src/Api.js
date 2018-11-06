import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');

function signal_n_nodes(cb_count_nodes) {
  socket.on('ok', function(msg) {
    if(msg[0] === '$' && msg[1] === '$' && msg[2] === '$'){
      cb_count_nodes(null, msg);
    }
  });
}
function qr_show_hide(cb_show_hide){
  socket.on('ok', function(msg) {
    if(msg[0] === 'q' && msg[1] === 'r' && msg[2] === 'c'){
      cb_show_hide(null, msg);
    }
  });
}
function screen_show_hide(cb_show_hide){
  socket.on('ok', function(msg) {
    if(msg[0] === 's' && msg[1] === 'c' && msg[2] === 'r'){
      cb_show_hide(null, msg);
    }
  });
}
function maps_fresh(refresh){
    refresh => refresh(null, refresh)
}

export { signal_n_nodes, maps_fresh, qr_show_hide, screen_show_hide };
