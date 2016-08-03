'use strict';

var seneca = require('seneca')();
seneca.use(require('seneca-redis-transport'));

seneca.add({role:'redis', cmd:'*'}, function(args, done) {
    done(null, {test: args.cmd });
});

seneca.listen({type:'redis', host:'localhost', pin:'role:redis'});
