const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err)=>{
      if(err)
        console.log('Unable to append Log');
    });
    next();
});

app.use((req, res, next)=>{
  res.render('maintenance.hbs');

});

app.use(express.static(__dirname+'/public'));
app.set('view engiene', 'hbs');
app.get('/', (req, res)=>{
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to my website',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req,res) =>{
  res.send({
    error:"Unable to handle request"
  });
});

app.listen(3000);
