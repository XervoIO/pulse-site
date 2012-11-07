require('nodefly').profile(
  '1234567890',
  'Pulse Site'
);

var express = require('express'),
    app = express.createServer(),
    email = require("nodemailer"),
    gaab = require('./gaab');

app.configure(function(){
  app.enable('view cache');
  app.use(express.static(__dirname + '/public', { maxAge: 86400000 /* one day */ }));
  app.use(express.bodyParser());
  app.set('view engine', 'ejs');
});

app.configure('staging' , function(){
  app.use(express.basicAuth(function (username, password) {
    return 'pulse' === username & 'staging' === password;
  }));
});

app.get('/', function(req, res) {
  var buttonTest = gaab.setupTest('Download Button', [
    {name : 'black', chance : 25},
    {name : 'green', chance : 25},
    {name : 'red', chance : 25},
    {name : 'blue', chance : 25}
  ]);
  res.render('index', {page : 'index', buttonTest : buttonTest});
});

app.get('/sign-up-thanks', function(req, res) {
  res.render('sign-up-thanks', {page : 'index'});
});

app.get('/sign-up-confirmed', function(req, res) {
  res.render('sign-up-confirmed', {page : 'index'});
});

// old documentation redirects
app.get(/^\/docs\/symbols\/([^\/]+).html?/, function(req, res) {
  res.redirect('/docs/api/symbols/' + req.params[0],301);
});

app.get('/docs', function(req, res) {
  res.render('docs/index', {
    page : 'docs',
    title : 'Pulse Engine : Documentation',
    description : 'Documentation to help you build games with Pulse game engine.'
  });
});

app.get('/docs/getting-started', function(req, res) {
  res.render('docs/getting-started', {
    page : 'docs',
    title : 'Pulse Engine : Getting Started',
    description : 'Getting started guide for Pulse game engine. It shows how to build a basic game.'
  });
});

app.get('/docs/video-build-your-first-game', function(req, res) {
  res.render('docs/video-first-game', {
    page : 'docs',
    title : 'Pulse Engine : Your First Game Video',
    description : 'Video tutorial on how to build for first game for Pulse game engine.'
  });
});

app.get('/docs/using-debug-panel', function(req, res) {
  res.render('docs/using-debug-panel', {
    page : 'docs',
    title : 'Pulse Engine : Using the Debug Module',
    description : 'How to get the most out of the Pulse Debug module.'
  });
});

app.get('/docs/using-physics-module', function(req, res) {
  res.render('docs/using-physics-module', {
    page : 'docs',
    title : 'Pulse Engine : Using the Physics Module',
    description : 'How to implement the physics module in your game.'
  });
});

app.get('/docs/api', function(req, res) {
  res.render('docs/api/index', {
    page : 'api',
    title : 'Pulse Engine : API Documentation Index',
    description : 'Index for API documentation including class references for Pulse game engine.'
  });
});

app.get('/docs/api/:id', function(req, res) {
  res.render('docs/api/' + req.params.id, {
    page : 'api',
    title : 'Pulse Engine : API Documentation',
    description : 'API documentation including class references for Pulse game engine.'
  });
});

app.get('/docs/api/symbols/:id', function(req, res) {
  res.render('docs/api/symbols/' + req.params.id + '.ejs', {
    page : 'api',
    title : 'Pulse Engine : ' + req.params.id + ' API Documentation',
    description : 'Class reference for the ' + req.params.id + ' class for Pulse game engine.'
  });
});

app.get('/demos', function(req, res) {
  res.render('demos/index', {
    page : 'demos',
    title : 'Pulse Engine : Demos',
    description : 'Demostrations index for the Pulse game engine.'
  });
});

app.get('/demos/megaman', function(req, res) {
  res.render('demos/megaman', {
    page : 'demos',
    title : 'Pulse Engine : Megaman Demo',
    description : 'Megaman demonstation including downloadable source code for the Pulse game engine.',
    breadcrumbs : [
      {name : 'Index', link : '/'},
      {name : 'Demos', link : '/demos'},
      {name : 'Megaman'}
    ]
  });
});

app.get('/demos/hello-world', function(req, res) {
  res.render('demos/hello-world', {
    page : 'demos',
    title : 'Pulse Engine : Hello World Demo',
    description : 'Hello World demonstation including source code for the Pulse game engine.',
    breadcrumbs : [
      {name : 'Index', link : '/'},
      {name : 'Demos', link : '/demos'},
      {name : 'Hello World'}
    ]
  });
});

app.get('/demos/debug-ball-world', function(req, res) {
  res.render('demos/debug-ball-world', {
    page : 'demos',
    title : 'Pulse Engine : Ball World with Debug Module Demo',
    description : 'Simple demo showing off how the Pulse Debug module works. Makes life easier when building game code with Pulse.',
    breadcrumbs : [
      {name : 'Index', link : '/'},
      {name : 'Demos', link : '/demos'},
      {name : 'Ball World'}
    ]
  });
});

app.get('/demos/physics', function(req, res) {
  res.render('demos/physics', {
    page : 'demos',
    title : 'Pulse Engine : Physics Module Demo',
    description : 'Simple demo showing how to use the Pulse physics module with Box2d',
    breadcrumbs : [
      {name : 'Index', link : '/'},
      {name : 'Demos', link : '/demos'},
      {name : 'Physics Demo'}
    ]
  });
});

app.get('/demos/snake', function(req, res) {
  res.render('demos/snake', {
    page : 'demos',
    title : 'Pulse Engine : Snake Demo',
    description : 'The classic game of Snake demonstation including downloadable source code for the Pulse game engine.',
    breadcrumbs : [
      {name : 'Index', link : '/'},
      {name : 'Demos', link : '/demos'},
      {name : 'Snake'}
    ]
  });
});

app.get('/about', function(req, res) {
  res.render('about', {
    page : 'about',
    title : 'Pulse Engine : About',
    description : 'Megaman demonstation including downloadable source code for the Pulse game engine.'
  });
});

app.get('/contact', function(req, res) {
  res.render('contact', {
    page : 'contact',
    action : 'form',
    title : 'Pulse Engine : Contact',
    description : 'Contact page for the Pulse game engine.'
  });
});

app.post('/contact', function(req, res) {

  var smtpTransport = email.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      user: "admin@example.com",
      pass: "1234567890"
    }
  });

  var message = "From: " + req.body.name + " <" + req.body.email + "> " +
                req.body.message;

  // setup e-mail data with unicode symbols
  var mailOptions = {
    to: "support@paranoidferret.com", // list of receivers
    subject: "Pulse Contact", // Subject line
    text: message // plaintext body
  };

  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error) {
      console.log(error);
    }
    if(response) {
      console.log(response);
    }
    smtpTransport.close(); // shut down the connection pool, no more messages
  });

  res.render('contact', {
    page : 'contact',
    action : 'thanks',
    title : 'Pulse Engine : Contact',
    description : 'Contact page for the Pulse game engine.'
  });
});

app.get('/downloads', function(req, res) {
  res.render('downloads', {
    page : 'downloads',
    title : 'Pulse Engine : Downloads',
    description : 'Release downloads for the Pulse game engine.'
  });
});

app.get('/release-notes', function(req, res) {
  res.render('release-notes', {
    page : '',
    title : 'Pulse Engine : Downloads',
    description : 'Release downloads for the Pulse game engine.'
  });
});

app.get('/license', function(req, res) {
  res.render('license', {
    page : '',
    title : 'Pulse Engine : License',
    description : 'License for the Pulse game engine.'
  });
});

app.listen(8080);

console.log('Express server started on port %s', app.address().port);