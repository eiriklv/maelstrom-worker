// dependencies
var util = require('util');
var async = require('async');
var request = require('request');

// if no domain is given as the first argument, then abort
if(!process.argv[2]){
    console.log('please input a valid domain to fire requests at');
    return;
}

// set the URI
var domain = 'http://'+process.argv[2]+'/keyword/';
console.log('worker firing requests at: ' + domain);

// array of keywords
var keywords = [
    'something cool',
    'node.js',
    'javascript',
    'mongodb',
    'redis',
    'wow such greatness',
    'such amaze',
    'bitcoins',
    'gibson hummingbird',
    'fender telecaster',
    'dodge SRT-10',
    'porsche 911 turbo',
    'porsche 911 turbo',
    'porsche 911 turbo',
    'porsche 911 turbo',
    'porsche 911 turbo',
    'porsche panamera',
    'tesla model s',
    'steve jobs',
    'mark zuckerberg',
    'crazy internet videos',
    'apple computers',
    'apple computers',
    'apple computers',
    'apple computers',
    'apple computers',
    'apple computers',
    'apple computers',
    'apple computers',
    'apple computers',
    'macbook air',
    'iphone',
    'arduino',
    'raspberry pi',
    'frogner',
    'oslo',
    'instagram',
    'third eye blind',
    'kings of leon',
    'coldplay',
    'callback hell',
    'cryptography',
    'elliptic curve',
    'nintendo',
    'xbox 360',
    'playstation 3'
];

(function run(){
    // run this forever, with a limit of 2 concurrent connections/operations
    async.forever(function(callback){
        async.eachLimit(keywords, 2, function(item, callback){
            console.log(domain+item);
            request(domain+item, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body); // Print the request body
                    callback();
                }
                else{
                    callback(error);
                }
            });
        },
        function(err){
            if(err){
                callback(err);
            }
            else{
                callback();
            }
        });
    },
    function(err){
        // this function will only be called if an error occurs (no if needed)
        console.log(util.inspect(err));
        run();
        return;
    });
})();