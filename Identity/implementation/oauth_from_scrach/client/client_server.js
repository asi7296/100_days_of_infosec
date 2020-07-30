const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const request = require('request');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const auth_server_authorize_endpoint = 'http://13.127.98.56:9000/auth';
const auth_server_token_endpoint = 'http://13.127.98.56:9000/token';
const client_id = 'client_1';
const client_secret = 'this_is_client_1_secret';
const redirect_uri = 'http://13.127.98.56:8443/oauth_callback';

var state_cache = [];

var app = express();
app.use(bodyparser.urlencoded({extended: true}));

app.get('/', (req, res)=> {
        res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.post('/authme', (req, res) => {
        var state = crypto.randomBytes(10).toString('hex');
        params = `?response_type=code&client_id=${client_id}&scope=${req.body.selected_scope}&state=${state}&redirect_uri=${redirect_uri}`;
        state_cache.push(state);
        res.redirect( auth_server_authorize_endpoint + params  );
});

app.get('/oauth_callback', (req, res) => {
        if (!state_cache.includes(req.query.state)) {
                res.send('State has changed, either the flow took too long or CSRF');
        }
        else {
                token_request_form = {
                        grant_type: 'authorization_code',
                        code: req.query.code,
                        redirect_uri: redirect_uri,
                        client_id: client_id,
                        client_secret: client_secret
                }
                
                request.post({url: auth_server_token_endpoint, form: token_request_form}, (err, httpResponse, httprespbody) => {
                        var auth_server_pub_key = fs.readFileSync('auth_server_pub.pem');
                        var decoded_token = jwt.verify(httprespbody, auth_server_pub_key, (err, decoded) => {
                                if (err) {
                                        res.send(err);
                                }
                                else {
                                        res.send(decoded);
                                        state_cache = state_cache.filter(item => item !== req.body.code)
                                }
                        });
                });
        }
});

app.listen(8443, () => {
        console.log('client listening on 8443. You as a resource owner visit this');
});
