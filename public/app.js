var express = require('express'),
    app = express.createServer();

app.use(express.logger());
app.set('view engine', 'ejs');
app.set('view options', {
    layout: false
});

app.get('/', function(req, res){
    res.render('header');
});

app.listen(5555);
console.log('Express server started on port %s', app.address().port);