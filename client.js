'use strict';

var seneca = require('seneca')();
seneca.use(require('seneca-redis-transport'));

seneca.client({type:'redis', host:'localhost', pin:'role:redis'});

seneca.ready(function() {
   seneca.act({role:'redis', cmd:'test'}, function(err, res) {
       console.log(err, res);
   });
});

