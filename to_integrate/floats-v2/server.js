//use: npm run build

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const history = require('connect-history-api-fallback');
const fs = require('fs');
const request = require('request');

const express = require('express');
const app = express();
const serv = require('http').Server(app);
var io = require('socket.io')(serv, {});

app.use(history({
  index: '/',
  rewrites: [
    {
      from: /^\/(.*)\/(.*)\/?$/i,
      to: () => {
        return '/';
      }
    }
  ]
}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/main.js', function(req, res) {
  res.sendFile(__dirname + '/dist/app.js');
});

const port = process.env.PORT || 2000;
serv.listen(port);
console.log('\nServer started on port ' + port + '.');
var start = (new Date()).getTime();
//-------------------------------------------------

var SOCKET_LIST = {};
var LOGGED_IN = {};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function lastAcquired(time) {
  fs.writeFile('acquired.txt', time, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

var oldPriceDataJSON = null;
var priceDataJSON = null;
function getPriceData() {
  request.get('http://csgobackpack.net/api/GetItemsList/v2/', (error, response, body) => {
    if (error) {
      console.log(error);
      return null;
    }else {
      console.log('Got priceData');
      //marking last time acquired
      lastAcquired(String((new Date()).getTime()));
      //caching
      priceData = JSON.parse(body)['items_list'];
      priceDataJSON = priceData;
      fs.writeFile( (__dirname + '/server/priceData.json'), JSON.stringify(priceData), (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}

//need to get priceData again or not
var acquired = Number(String(fs.readFileSync('acquired.txt')).replace(/\s/g,''));
var now = (new Date()).getTime();
if ( (now - acquired) > (30000*1000)) {
  console.log("It's been over 30,000 seconds! Reacquiring priceData...");
  getPriceData();
}else {
  try {
    priceDataJSON = require(__dirname + '/server/priceData.json');
    console.log('No need for new data yet, got data from local file.');
  }catch(err) {
    console.log("An error occured, regathering priceData.");
    getPriceData();
  }
}

setInterval(function() {
  console.log("It's been 30,000 seconds! Reacquiring priceData...");
  getPriceData();
}, (30000*1000));

//------------------------------------------------------------------------------
io.on('connection', function(socket) {
  //assign id on connection
  SOCKET_LIST[socket.id] = socket;
  socket.on('loggedIn', function() {
    //sending them data
    var waitForData = setInterval(function() {
      if (priceDataJSON != null) {
        console.log('sending data');
        socket.emit('priceData', priceDataJSON);
        clearInterval(waitForData);
      }
    }, 1000);
  });
  console.log(socket.id + ' connected.');
  //delete socket.id on disconnect
  socket.on('disconnect', function () {
    delete SOCKET_LIST[socket.id];
    delete LOGGED_IN[socket.id];
    console.log(socket.id + ' disconnected.');
  });
  //------------------------------------------------
  //logging in
  socket.on('login', function(pass) {
    LOGGED_IN[socket.id] = true;
    if (pass == password) {
      socket.emit('passCheck', true);
    }else {
      socket.emit('passCheck', false);
    }
  });
  //------------------------------------------------
  //getting data from csgofloat
  socket.on('JSONreq', async function(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].constructor.toString().indexOf("Array") == -1) {
        request.get(data[i].url, (error, response, body) => {
          if (error) {
            data[i].jsonres = null;
          }else {
            data[i].jsonres = JSON.parse(body);
          }
        });
      }
      await sleep(500);
    }
    socket.emit('JSONres', data);
  });
  //------------------------------------------------
  //when priceDataJSON changes --> send to all logged in
  setInterval(function() {
    if (oldPriceDataJSON != priceDataJSON) {
      if (socket.id in LOGGED_IN) {
        socket.emit('priceData', priceData);
      }
      oldPriceDataJSON = priceDataJSON;
    }
  }, (300*1000));

});
