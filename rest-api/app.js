const express = require('express');
global.mongoose = require('mongoose');
const mongoConfig = require('./configs/db').mongo;
mongoose.connect(`mongodb://${mongoConfig.HOST}:27017/test`,  { 
    useUnifiedTopology: true,
    useNewUrlParser: true });
const routes = require('./routes');
const app = express();
const router = routes(express);
app.use('/', router);
app.listen(8080);
