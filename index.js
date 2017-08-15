const express = require('express');
const url = require('url');
const querystring = require('querystring');

const app = express();
app.set('x-powered-by', false);

app.get('/mailto', get_mailto);

let port = Buffer.from('mailto:').reduce((a,b)=>a+b,0) & 2**15-1 | 2**10;

let server = app.listen(port, '0.0.0.0', function() {
  console.log('Listening on', server.address());
});

function get_mailto (req, res) {
  let old_url = url.parse(req.url);
  let new_url = url.parse('mailto:');
  new_url.search = old_url.search;
  res.redirect(303, url.format(new_url));
}

