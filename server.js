const express = require('express'),


cookieParser = require('cookie-parser'),
log = require('morgan'),
path = require('path'),
cors = require('cors'),
multer = require('multer'),
upload = multer(),
app = express(),
PORT = process.env.PORT || 8080,
NODE_ENV = process.env.NODE_ENV || 'development';

const numCPUs = require('os').cpus().length;
const cluster = require('cluster');

app.set('port', PORT);
app.set('env', NODE_ENV);
app.use(cors());
app.use(log('tiny'));
// parse application/json
app.use(express.json());
// parse raw text
app.use(express.text());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// parse multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));
app.use(cookieParser());

const db =  require('./Database/index');


/**
 * Imaplimentation of load balancing 
 * this will create a worker for each cpu core.
 * server is responsible for handling the load balancing.
 * if there is a crush on the server it will not affect the other workers.
 * requests will be distributed perfectly regardless of if there is a crush on the server.
 */

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
    console.log(`
    Master server ${process.pid} is running,
    Leaf server is unitilizing ${numCPUs} CPU cores's for better 
    performance and handling load balancing`);
        
    console.log(`Number of CPU's :`, numCPUs)
    
    // create workers for each cpu.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork(); // this will create a worker for each cpu core.
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`server-worker ${worker.process.pid} died`);
        cluster.fork(); // this will create a new worker if one of the workers dies.
    });
} else {

require('./routes')(app); // import routes

// catch 404
app.use((req, res, next) => {
    // log.error(`Error 404 on ${req.url}.`);
    res.status(404).send({ status: 404, error: 'Not found' });
});

// catch errors
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const msg = err.error || err.message;
    // log.error(`Error ${status} (${msg}) on ${req.method} ${req.url} with payload ${req.body}.`);
    res.status(status).send({ status, error: msg });
});

module.exports = app;
// start the server
app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on Port ${app.get('port')} | Environment : ${app.get('env')}`);
});

}